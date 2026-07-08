import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';

// Localized cart slugs, single source for the i18n custom routes and the client-only route rules.
const CART_SLUGS = { it: '/carrello', es: '/carrito', fr: '/panier' };

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },

    // Pinia: app state lives in app/stores (auto-imported as use*Store).
    modules: ['@pinia/nuxt', '@nuxtjs/i18n'],

    // Locale files live in i18n/locales (module convention) and are lazy-loaded per language.
    // Default locale keeps unprefixed URLs (/cart); others get a prefix plus a translated
    // slug (/it/carrello) and hreflang meta. The locale's `language` tag also feeds the
    // Shopify @inContext variables (see useShopifyContext).
    // The visitor's browser language picks the boot locale once, then a cookie remembers the choice.
    i18n: {
        // Absolute origin for hreflang/og:locale alternate links (SSR SEO tags);
        // override per environment via NUXT_PUBLIC_I18N_BASE_URL.
        baseUrl: process.env.NUXT_PUBLIC_I18N_BASE_URL || 'http://localhost:8080',
        locales: [
            { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
            { code: 'it', language: 'it-IT', name: 'Italiano', file: 'it.json' },
            { code: 'es', language: 'es-ES', name: 'Español', file: 'es.json' },
            { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json' }
        ],
        defaultLocale: 'en',
        strategy: 'prefix_except_default',
        customRoutes: 'config',
        pages: {
            cart: CART_SLUGS
        },
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: 'i18n_locale',
            redirectOn: 'root'
        }
    },

    // Tailwind v4: Vite plugin + single entry stylesheet (theme tokens live there).
    css: ['~/assets/css/main.css'],
    vite: {
        plugins: [tailwindcss()],
        // Pre-bundle deps Vite otherwise discovers lazily at runtime (triggering a page
        // reload mid-session): Apollo client and the generated zod schemas.
        optimizeDeps: {
            include: ['@apollo/client', 'zod']
        }
    },

    // Hybrid rendering. The PDP is server-rendered so the hreflang/lang meta and the
    // localized catalog content actually reach crawlers; the cart is private per-user
    // state (localStorage cart id) with no SEO value, so it stays client-only in every
    // locale. No SWR/prerender on the PDP: locale detection redirects on / per visitor
    // (cookie + Accept-Language), so cached HTML would leak one visitor's locale to the next.
    ssr: true,
    routeRules: Object.fromEntries(
        ['/cart', ...Object.entries(CART_SLUGS).map(([locale, slug]) => `/${locale}${slug}`)].map(
            (path) => [path, { ssr: false }]
        )
    ),

    // Matches APP_PORT used by docker-compose.yml and cypress.config.ts baseUrl.
    devServer: {
        port: Number(process.env.APP_PORT) || 8080
    },

    // contracts/ holds the contract layer, one folder per protocol (authored spec/documents + generated/),
    // kept outside app/ — orval contract types + zod (see orval.config.ts) under contracts/rest/,
    // graphql-codegen Shopify transport (see codegen.ts) under contracts/graphql/.
    // Longest aliases first: '@api' would otherwise shadow the others (order-based matching).
    // Absolute paths: Vite resolves relative alias targets against the importer, not the root.
    alias: {
        '@api/graphql': fileURLToPath(
            new URL('contracts/graphql/generated/graphql.ts', import.meta.url)
        ),
        '@api/schemas': fileURLToPath(
            new URL('contracts/rest/generated/schemas.zod.ts', import.meta.url)
        ),
        '@api': fileURLToPath(new URL('contracts/rest/generated/types/index.ts', import.meta.url))
    },

    runtimeConfig: {
        public: {
            // Shopify Storefront API — override via NUXT_PUBLIC_SHOPIFY_* env vars.
            shopifyEndpoint: 'https://callmewine-stage-uk.myshopify.com/api/2026-04/graphql.json',
            shopifyToken: '',
            shopifyProductGid: ''
        }
    }
});
