# Cart: persistence, identity, and gift attributes

> **TL;DR:** the cart is a Shopify-hosted resource identified by a GID we keep in
> `localStorage`; the store never holds cart data as its own source of truth, only a
> pointer to Shopify's.

## Why a localStorage pointer, not app state

Shopify's Storefront Cart API already persists carts server-side (`cartCreate`,
`cartLinesAdd`, ...) and gives back a GID. The only thing that needs to survive a page
reload on *our* side is which cart GID belongs to this visitor — everything else (lines,
totals, pricing) is re-fetched from Shopify, never reconstructed locally.

`app/utils/cartIdStorage.ts` is the single seam for that: `readCartId` / `writeCartId` /
`clearCartId` are the only functions allowed to touch `localStorage` for this purpose.
Nothing in `stores/cart.ts` calls `localStorage` directly — if the medium ever needs to
change (e.g. a cookie, for a future SSR cart), it changes in one file.

## Lazy creation, not eager

`ensureCartId()` (`app/stores/cart.ts`) only calls Shopify's `cartCreate` the first time
something is actually added to the cart — there's no cart until the visitor needs one.
The new cart is created with `buyerIdentity` pinned to the current locale's market
(via `useShopifyContext`, see [rendering-and-i18n.md](rendering-and-i18n.md)), so pricing
and checkout language match what the visitor was browsing in when they added the item.

## Re-pinning on language switch

If a visitor already has a cart and then switches language, the cart was created (or
last updated) for the *old* market. `syncBuyerIdentity()` calls Shopify's
`cartBuyerIdentityUpdate` to re-pin the existing cart to the new locale's market, so line
pricing and the eventual checkout follow the switch instead of silently staying on the
old currency/language. It's a no-op when there's no cart yet — the next `cartCreate`
picks up the new locale on its own.

## Contract boundary: normalizeCart

Every Shopify cart response (a `CartFieldsFragment`, whatever shape Shopify's schema
happens to have) is passed through `normalizeCart()` before it touches app state. That
function maps Shopify's field names onto the OpenAPI `Cart` contract and validates the
result with `GetCartResponse.parse()` (the generated zod schema) — so a field rename or
type change upstream in Shopify's schema fails loudly, at the boundary, instead of
quietly reshaping the rest of the app. See [contracts.md](contracts.md) for why this
mapping is deliberately hand-maintained rather than generated.

`unwrapMutation()` is the other half of that boundary: every Storefront cart mutation can
return `userErrors` *instead of* a GraphQL error (Shopify's convention, not ours) — this
helper throws on either `userErrors` or a missing cart, so callers only ever deal with a
cart or a thrown error, never a partial/ambiguous payload.

## Gift attributes: encoded as plain cart line attributes

Shopify's Cart API has no first-class "gift wrap" concept — it has generic
`attributes: [{ key, value }]` on each line. `app/utils/giftAttributes.ts` owns the
encoding:

- `buildGiftAttributes(isGiftWrapped, giftMessage)` — returns `[]` when gift wrap is off
  (so plain lines carry no attributes at all, no `gift_wrap: "false"` noise), otherwise
  a `gift_wrap: "true"` attribute plus an optional `gift_message` (only stored together
  with gift wrap, trimmed, and only if non-empty).
- `parseGiftAttributes(attributes)` — the inverse, used to read a cart line back and
  reconstruct the UI state for the gift-wrap checkbox/message field.

Both directions live in the same file so the attribute keys (`gift_wrap`,
`gift_message`) exist in exactly one place — the encoding and decoding can't drift apart.

## One sentence to keep

**We don't store a cart — we store a pointer to one, and re-derive everything else from
Shopify on every read.**
