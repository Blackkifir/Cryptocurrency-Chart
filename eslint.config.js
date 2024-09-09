import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      'airbnb',
      'airbnb-typescript',
      'plugin:import/typescript'
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      'no-alert': 'off',
      'no-console': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['state', 'res'] }],
      'jsx-a11y/label-has-for': 'off',
      'max-len': ['error', {
        'code': 120,
        'ignorePattern': '^import',
      }],
      'import/no-extraneous-dependencies': ['error', {'devDependencies': ['**/__tests__/**', '**/*.test.ts', '**/*.test.tsx']}],
      'require-explicit-generics/require-explicit-generics': [
        'error',
        ['builder.query', 'builder.mutation'],
      ],
      'simple-import-sort/imports': ['error', {
        'groups': [
          ['^\\u0000'],
          ['^react$', '^react-native$', '^react', '^@?\\w'],
          ['^\\.\\.(?!/?$)', '^\\.\\./?$', '^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ['^@?\\w.*\\u0000$', '^[^.].*\\u0000$', '^\\..*\\u0000$'],
          ['^.+assets.+\\..+$'],
          ['^.+\\.s?css$'],
        ],
      }],
      'import/order': 'off',
      'radix': 'off',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-leaked-render': 'error',
      'react/jsx-props-no-spreading': 'off',
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
    },
    overrides: [
      {
        'files': ['src/**/**/slice.ts'],
        'rules': {
          'no-param-reassign': ['error', { 'props': false }],
        },
      },
      {
        'files': ['**/*.stories.*'],
        'rules': {
          'import/no-anonymous-default-export': 'off',
        },
      },
    ],
  },
);