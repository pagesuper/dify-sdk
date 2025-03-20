/**
 * almighty eslint推荐for uni-app
 */
module.exports = {
  root: true,
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    ecmaVersion: 2020,
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },

  globals: {
    uni: true,
  },

  env: {
    node: true,
    browser: true,
    jest: true,
  },

  plugins: ['import', 'jest', 'node', 'prettier', 'promise', 'standard', 'vue', 'html'],

  extends: [
    'eslint:recommended',
    'standard',
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/strongly-recommended',
    'plugin:vue-scoped-css/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/vue',
    'prettier/standard',
  ],

  rules: {
    ...require('./rules/vue'),
  },
};
