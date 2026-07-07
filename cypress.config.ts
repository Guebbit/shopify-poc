import { defineConfig } from 'cypress';

const port = process.env.APP_PORT ?? '8080';

export default defineConfig({
    e2e: {
        baseUrl: `http://localhost:${port}`,
        specPattern: 'cypress/e2e/**/*.cy.ts',
        supportFile: 'cypress/support/e2e.ts'
    }
});
