import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import perfectionist from 'eslint-plugin-perfectionist';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import unicorn from 'eslint-plugin-unicorn';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores([
    'dist/**',
    'coverage/**',
    'storybook-static/**',
    'node_modules/**',
    '**/*.d.ts',
  ]),

  // Base JS recommended
  js.configs.recommended,

  // TypeScript: strictest tier with type-checking
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  // React
  {
    ...react.configs.flat.recommended,
    settings: { react: { version: '19.2' } },
  },
  react.configs.flat['jsx-runtime'],

  // Project-wide config
  {
    files: ['**/*.{ts,tsx,js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      import: importPlugin,
      unicorn,
      perfectionist,
    },
    settings: {
      'import/resolver': {
        typescript: { alwaysTryTypes: true },
        node: true,
      },
    },
    rules: {
      // react-hooks (flat preset uses object spread)
      ...reactHooks.configs['recommended-latest'].rules,

      // jsx-a11y strict
      ...jsxA11y.flatConfigs.strict.rules,

      // import hygiene
      'import/first': 'error',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
      'import/no-cycle': ['error', { maxDepth: 10 }],
      'import/no-self-import': 'error',
      'import/no-useless-path-segments': 'error',

      // unicorn — opinionated, but sensible
      'unicorn/filename-case': [
        'error',
        {
          cases: { camelCase: true, pascalCase: true },
          ignore: ['^README\\.md$', '^LICENSE$'],
        },
      ],
      'unicorn/prevent-abbreviations': 'off',
      'unicorn/no-null': 'off',
      'unicorn/no-array-reduce': 'off',
      'unicorn/no-array-for-each': 'off',

      // perfectionist — sort imports/keys for consistency
      'perfectionist/sort-imports': [
        'warn',
        {
          type: 'natural',
          order: 'asc',
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling', 'index'],
            'object',
            'type',
          ],
          newlinesBetween: 'always',
        },
      ],
      'perfectionist/sort-named-imports': ['warn', { type: 'natural' }],

      // TypeScript additions on top of strict-type-checked
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // React-specific
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
      'react/self-closing-comp': 'error',
      'react/jsx-boolean-value': ['error', 'never'],
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never' },
      ],
    },
  },

  // Storybook + tests: relax a few rules
  {
    files: [
      '**/*.stories.{ts,tsx}',
      '**/*.test.{ts,tsx}',
      '.storybook/**/*.{ts,tsx}',
      'vitest.setup.ts',
      'src/test-utils/**/*.{ts,tsx}',
    ],
    rules: {
      'import/no-default-export': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      'react/display-name': 'off',
    },
  },

  // Config files: relax type-aware rules (they consume third-party plugin
  // shapes that ESLint reasonably can't verify).
  {
    files: ['*.config.{ts,mjs,js}', 'eslint.config.mjs', 'prettier.config.mjs'],
    rules: {
      '@typescript-eslint/no-deprecated': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
    },
  },

  // Disable formatting rules that conflict with Prettier (last)
  prettierConfig,
]);
