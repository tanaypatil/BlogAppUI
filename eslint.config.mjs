import js from '@eslint/js';
import vue from 'eslint-plugin-vue';
import parserVue from 'vue-eslint-parser';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';

export default {
  ignores: ['node_modules/**', 'dist/**'],
  plugins: {
    '@typescript-eslint': tseslint,
    vue: vue,
    prettier,
  },
  languageOptions: {
    parser: parserVue,
    parserOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    globals: {
      ...js.configs.recommended.languageOptions?.globals,
      console: 'readonly',
      window: 'readonly',
      document: 'readonly',
      localStorage: 'readonly',
      sessionStorage: 'readonly',
      navigator: 'readonly',
      fetch: 'readonly',
      setTimeout: 'readonly',
      clearTimeout: 'readonly',
      setInterval: 'readonly',
      clearInterval: 'readonly',
      FormData: 'readonly',
      Element: 'readonly',
      File: 'readonly',
      FileReader: 'readonly',
      ProgressiveEvent: 'readonly',
      ProgressEvent: 'readonly'
    },
  },
  rules: {
    ...js.configs.recommended.rules,
    ...vue.configs['flat/recommended'].rules,
    'prettier/prettier': 'error',
    'vue/multi-word-component-names': 'off',
    'vue/no-unused-vars': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
  },
  settings: {
    vue: {
      version: '3.0',
    },
  },
  files: ['**/*.js', '**/*.ts', '**/*.vue'],
};
