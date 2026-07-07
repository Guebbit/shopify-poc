---
name: verify
description: Build, launch and drive this Nuxt SPA to verify changes at the browser surface
---

# Verify shopify-poc changes

SPA (`ssr: false`), Nuxt 4, dev server on port 8080 (`APP_PORT`, see `nuxt.config.ts` devServer).

## Launch

```bash
npm run dev          # background; up when curl -sf http://localhost:8080/ succeeds (~10s)
```

No `.env` → Shopify Storefront calls fail; pages render their localized error/empty states, which is fine for UI/i18n verification but blocks cart/PDP data flows.

## Drive (headless browser)

curl only gets the SPA shell — JS must execute. Use system chromium via
playwright-core (no browser download) installed in the scratchpad, e.g.:

```js
import { chromium } from 'playwright-core';
const browser = await chromium.launch({ executablePath: '/usr/bin/chromium' });
const ctx = await browser.newContext({ locale: 'it-IT' }); // locale drives i18n detection
```

## Flows worth driving

- `/` (PDP) and `/cart`; locale-prefixed variants `/it/...`, `/fr/...` (default `en` is unprefixed — strategy `prefix_except_default`)
- Language switcher: `header select`, `selectOption('it')` → URL prefix, translations, `i18n_locale` cookie all change
- Locale detection: context `locale` option + fresh context; cookie beats browser language on revisit
- `<html lang>` must be non-null after hydration (set via `useLocaleHead` in `app.vue`)

## Gotchas

- HMR picks up edits while the dev server runs — no restart needed, but wait ~3s
- Unsupported locale prefix (`/de/cart`) correctly renders the 404 page with HTTP 200 (SPA shell)
