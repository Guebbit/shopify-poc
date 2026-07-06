// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },

    // Matches VITE_APP_PORT used by docker-compose.yml and cypress.config.ts baseUrl.
    devServer: {
        port: Number(process.env.VITE_APP_PORT) || 8080
    },

    // api/ holds the orval-generated client (see orval.config.ts) — kept outside app/ since it's generated, not authored.
    alias: {
        '@api': './api/index.ts',
        '@api/schemas': './api/schemas.zod.ts'
    },

    runtimeConfig: {
        public: {
            apiBaseUrl: 'http://localhost:3000',
            axiosTimeout: 10_000
        }
    }
});
