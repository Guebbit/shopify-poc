import eslint from '@eslint/js';
import globals from 'globals';
import pluginUnicorn from 'eslint-plugin-unicorn';
import { globalIgnores } from 'eslint/config';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';
import pluginVitest from '@vitest/eslint-plugin';
import pluginCypress from 'eslint-plugin-cypress';
import pluginOxlint from 'eslint-plugin-oxlint';
import pluginVueI18n from '@intlify/eslint-plugin-vue-i18n';
import parserJsonc from 'jsonc-eslint-parser';

export default defineConfigWithVueTs(
    {
        files: ['**/*.{ts,mts,tsx,vue}']
    },

    /**
     * Excluded files
     */
    globalIgnores([
        'dist',
        'dist-ssr',
        'coverage',
        'docs',
        'contracts',
        'node_modules',
        '.nuxt',
        '.output',
        '.data',
        'eslint.config.ts'
    ]),

    /**
     * Base eslint
     */
    eslint.configs.recommended,

    /**
     * Vue + Typescript presets
     */
    pluginVue.configs['flat/essential'],
    vueTsConfigs.recommended,
    ...pluginOxlint.configs['flat/recommended'],

    /**
     * Unicorn plugin
     */
    pluginUnicorn.configs['flat/recommended'],

    /**
     * i18n key hygiene: missing/unused keys across i18n/locales/*.json are lint failures,
     * so the four vocabularies cannot drift apart silently.
     * Registered manually instead of the shipped recommended config, which would make
     * every JSON in the repo lintable and drag the typed TS rules onto them.
     */
    {
        plugins: { '@intlify/vue-i18n': pluginVueI18n },
        settings: {
            'vue-i18n': {
                localeDir: './i18n/locales/*.json',
                messageSyntaxVersion: '^11.0.0'
            }
        }
    },
    {
        files: ['**/*.{ts,mts,tsx,vue}'],
        rules: {
            // t('some.key') must exist in every locale file.
            '@intlify/vue-i18n/no-missing-keys': 'error'
        }
    },
    {
        files: ['i18n/locales/*.json'],
        languageOptions: { parser: parserJsonc },
        rules: {
            '@intlify/vue-i18n/no-unused-keys': ['error', { extensions: ['.ts', '.vue'] }],
            '@intlify/vue-i18n/no-html-messages': 'error',
            '@intlify/vue-i18n/valid-message-syntax': 'error'
        }
    },

    /**
     * Global parser + dedicated eslint tsconfig
     */
    {
        files: ['**/*.{ts,mts,tsx,vue}'],
        languageOptions: {
            parserOptions: {
                projectService: false,
                project: ['./tsconfig.eslint.json'],
                extraFileExtensions: ['.vue']
            }
        }
    },

    /**
     * All global rules
     * Scoped to code files: locale JSONs are lintable too (vue-i18n plugin above)
     * and typed TS rules would crash on them.
     */
    {
        files: ['**/*.{ts,mts,tsx,vue}'],
        languageOptions: {
            globals: {
                ...globals.browser
            },
            ecmaVersion: 'latest',
            sourceType: 'module'
        },

        rules: {
            'no-console': 'warn',
            'no-debugger': 'warn',
            'vue/script-indent': 'off',
            'vue/multi-word-component-names': 'off',
            'vue/require-default-prop': 'off',
            'vue/no-v-html': 'off',
            '@typescript-eslint/no-non-null-assertion': 'off',
            '@typescript-eslint/use-unknown-in-catch-callback-variable': 'off',
            'no-nested-ternary': 'off',
            'unicorn/no-nested-ternary': 'off',
            'unicorn/prefer-top-level-await': 'off',
            // Repo style: promise chaining preferred over async/await.
            'unicorn/prefer-await': 'off',
            // Repo style: const + arrow functions instead of `function` declarations.
            'func-style': ['error', 'expression'],
            'prefer-arrow-callback': 'error',

            '@typescript-eslint/restrict-plus-operands': [
                'error',
                {
                    allowNumberAndString: true
                }
            ],

            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: 'default',
                    format: ['camelCase', 'PascalCase'],
                    leadingUnderscore: 'allow',
                    trailingUnderscore: 'allow'
                },
                {
                    selector: 'variable',
                    format: ['camelCase', 'UPPER_CASE'],
                    leadingUnderscore: 'allow',
                    trailingUnderscore: 'allow'
                },
                {
                    selector: ['class', 'typeLike', 'typeParameter'],
                    format: ['PascalCase']
                },
                {
                    selector: ['function'],
                    format: ['camelCase'],
                    leadingUnderscore: 'allow'
                },
                {
                    selector: 'interface',
                    format: ['PascalCase'],
                    custom: {
                        regex: '^I[A-Z]',
                        match: true
                    }
                },
                {
                    selector: 'enum',
                    format: ['PascalCase'],
                    custom: {
                        regex: '^E[A-Z]',
                        match: true
                    }
                },
                {
                    selector: ['memberLike', 'enumMember'],
                    format: ['camelCase', 'PascalCase', 'UPPER_CASE', 'snake_case'],
                    leadingUnderscore: 'allow',
                    trailingUnderscore: 'allow'
                }
            ],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/HEAD/docs/rules/better-regex.md
            'unicorn/better-regex': 'warn',

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/HEAD/docs/rules/consistent-destructuring.md
            'unicorn/consistent-destructuring': 'warn',

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/HEAD/docs/rules/filename-case.md
            // Every file is camelCase except Vue components and tests (see below)
            'unicorn/filename-case': [
                'error',
                {
                    case: 'camelCase'
                }
            ],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/HEAD/docs/rules/catch-error-name.md
            'unicorn/catch-error-name': [
                'error',
                {
                    name: 'error'
                }
            ],

            // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/name-replacements.md
            'unicorn/name-replacements': [
                'error',
                {
                    replacements: {
                        i: false,
                        e: false,
                        len: false,
                        prop: false,
                        props: false,
                        prev: false,
                        opts: {
                            options: true
                        },
                        ref: {
                            reference: false
                        }
                    }
                }
            ]
        }
    },

    /**
     * Specific naming conventions for components (PascalCase)
     * WARNING: Slows down a lot
     */
    {
        files: ['**/*.vue', '**/*.tsx'],
        rules: {
            'unicorn/filename-case': [
                'error',
                {
                    case: 'pascalCase',
                    // `app` is Nuxt's fixed srcDir name, not an author choice.
                    ignore: [/^app$/]
                }
            ]
        }
    },

    /**
     * "Special" files names are better to be left untouched
     */
    {
        files: ['tests/**/*', '**/*.spec.ts', '**/*.test.ts', '**/*.d.ts'],
        rules: {
            'unicorn/filename-case': 'off',
            'unicorn/name-replacements': 'off'
        }
    },
    {
        // Root-level CommonJS config files (not part of any tsconfig project).
        files: ['*.cjs'],
        languageOptions: {
            globals: {
                ...globals.node
            }
        }
    },
    {
        // Config keys like '@api' aliases or codegen output paths are not authored identifiers;
        // loading .env at top level is how CLI config files work.
        files: ['nuxt.config.ts', 'codegen.ts'],
        rules: {
            '@typescript-eslint/naming-convention': 'off',
            'unicorn/no-top-level-side-effects': 'off'
        }
    },
    {
        files: ['**/*.d.ts'],
        rules: {
            '@typescript-eslint/naming-convention': 'off'
        }
    },

    /**
     * Tests specific eslint config
     * - Unit Tests (Vitest)
     *  - E2E Tests (Cypress)
     */
    {
        ...pluginVitest.configs.recommended,
        files: ['app/**/__tests__/*', 'tests/**/*', '**/*.{spec,test}.{ts,tsx}'],
        languageOptions: {
            parserOptions: {
                projectService: false,
                project: ['./tsconfig.vitest.json']
            }
        }
    },
    {
        ...pluginCypress.configs.recommended,
        files: [
            'cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}',
            'cypress/support/**/*.{js,ts,jsx,tsx}',
            'cypress.config.ts'
        ],
        languageOptions: {
            parserOptions: {
                projectService: false,
                project: ['./tsconfig.cypress.json']
            }
        }
    }
);
