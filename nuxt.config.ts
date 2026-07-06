import { fileURLToPath } from 'node:url';
import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },

    // Pinia: app state lives in app/stores (auto-imported as use*Store).
    modules: ['@pinia/nuxt'],

    // Tailwind v4: Vite plugin + single entry stylesheet (theme tokens live there).
    css: ['~/assets/css/main.css'],
    vite: {
        plugins: [tailwindcss()]
    },

    // SPA architecture: no server rendering, cart id persistence uses localStorage.
    ssr: false,

    // Matches VITE_APP_PORT used by docker-compose.yml and cypress.config.ts baseUrl.
    devServer: {
        port: Number(process.env.VITE_APP_PORT) || 8080
    },

    // api/ holds the orval-generated client (see orval.config.ts) — kept outside app/ since it's generated, not authored.
    // Longest alias first: '@api' would otherwise shadow '@api/schemas' (order-based matching).
    // Absolute paths: Vite resolves relative alias targets against the importer, not the root.
    alias: {
        '@api/schemas': fileURLToPath(new URL('api/schemas.zod.ts', import.meta.url)),
        '@api': fileURLToPath(new URL('api/index.ts', import.meta.url))
    },

    runtimeConfig: {
        public: {
            apiBaseUrl: 'http://localhost:3000',
            axiosTimeout: 10_000,
            // Shopify Storefront API — override via NUXT_PUBLIC_SHOPIFY_* env vars.
            shopifyEndpoint: 'https://callmewine-stage-uk.myshopify.com/api/2026-04/graphql.json',
            shopifyToken: '',
            shopifyProductGid: ''
        }
    }
});
