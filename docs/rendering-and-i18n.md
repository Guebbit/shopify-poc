# Hybrid rendering + i18n — cheat sheet

> **TL;DR:** the product page is SSR'd per locale for SEO; the cart is always
> client-only because it's private, per-visitor state with zero SEO value.

## The picture

```
              visitor hits /                     visitor hits /it/carrello
                    │                                      │
        detectBrowserLanguage                     strategy: prefix_except_default
      (cookie i18n_locale, else                    picks locale from the URL prefix
       Accept-Language) → redirect                          │
                    │                                      │
                    ▼                                      ▼
        ┌───────────────────────┐             ┌───────────────────────────┐
        │   PDP  (/, /it, …)    │             │  Cart (/cart, /it/carrello)│
        │   ssr: true (default) │             │   routeRules: ssr: false   │
        └───────────┬───────────┘             └─────────────┬─────────────┘
                    │                                        │
        rendered on the server:                    rendered client-only:
        <html lang>, hreflang alts,                 no SEO surface, cart id
        translated product content                  lives in localStorage
```

## Why the PDP is SSR'd

Crawlers don't run client JS reliably, and the whole point of localized routes
(`/it`, `/es`, `/fr`, unprefixed for `en`) is that search engines index each language
version with the right `<html lang>` and `hreflang` alternates. That markup has to be
in the initial HTML, so the PDP keeps Nuxt's default `ssr: true`
(`nuxt.config.ts:54`).

`scripts/containerSmokeTest.sh` asserts exactly this against the production image:
it curls `/it` and greps for `lang="it-IT"` and `hreflang="it-IT"` in the raw response
(no browser, no JS execution) — if that markup ever moved client-side, this smoke test
catches it before a real crawler would.

## Why the cart is never SSR'd

The cart is the opposite of SEO-relevant: it's one visitor's private basket, identified
by a cart GID kept in `localStorage` (see [Cart persistence](cart.md)). Two reasons it's
pinned to `ssr: false` via `routeRules` (`nuxt.config.ts:55-59`), not just "happens to
render client-side":

- **No content worth indexing.** Server-rendering it would spend a render for nothing.
- **Locale detection redirects on `/`.** If the cart page were cached/prerendered, one
  visitor's locale could leak into another visitor's cached HTML. Client-only sidesteps
  that entirely — there's nothing to cache.

`CART_SLUGS` (`nuxt.config.ts:5`) is the single source for both the i18n custom route
slugs (`/it/carrello`) *and* the route-rule keys, so the two can't drift apart — add a
locale there and both the URL and the SSR opt-out follow automatically.

## Locale → Shopify market mapping

Shopify's Storefront API doesn't know about `vue-i18n` locale codes; it wants
`@inContext(language: LanguageCode, country: CountryCode)` on every query/mutation.
`useShopifyContext` (`app/composables/useShopifyContext.ts`) bridges the two: it reads
the active locale's BCP 47 tag (e.g. `it-IT`, set via `language` in each entry of
`nuxt.config.ts`'s `i18n.locales`) and splits it into the two Shopify enums.

This computed value is spread into every Storefront query/mutation variables
(`useProduct.ts`, `stores/cart.ts`) so pricing, currency, and translated fields
(title, `altText`) all follow the visitor's active locale without each call site
re-deriving it.

Shopify silently falls back to the shop's default market when the derived country isn't
an enabled one — so this mapping is safe to use even for locales Shopify doesn't sell
into, it just won't get market-specific pricing for them.

## Locale list vs. store localization: two different supersets

- `nuxt.config.ts`'s `i18n.locales` is **the app's superset** — every locale this Nuxt
  build knows how to render UI strings for (from `i18n/locales/*.json`).
- `useStoreLocalization.ts` fetches **the store's superset** — the languages actually
  published on the connected Shopify Markets setup, via the `localization` GraphQL query.

The language switcher narrows to the *intersection*: no point offering a locale the app
can render but the catalog can't translate, or vice versa. See
[`app/composables/useStoreLocalization.ts`](../app/composables/useStoreLocalization.ts).

## One sentence to keep

**SSR earns its keep where a crawler is reading; client-only wins where only the
visitor themselves ever will.**
