import { defineVitestConfig } from '@nuxt/test-utils/config';

/*
 * Boots a Nuxt test environment (auto-imports, aliases like @api/@) so
 * unit tests can use composables/utils the same way app code does.
 */
export default defineVitestConfig({
    test: {
        environment: 'nuxt',
        include: ['tests/unit/**/*.{test,spec}.ts', 'app/**/__tests__/*.{test,spec}.ts'],
        exclude: ['cypress/**/*', 'node_modules/**']
    }
});
