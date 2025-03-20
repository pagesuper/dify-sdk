/**
 * almighty eslint推荐
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

  env: {
    node: true,
    browser: true,
    jest: true,
  },

  extends: ['eslint:recommended', 'standard', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],

  plugins: ['import', 'jest', 'node', 'promise', 'prettier', 'standard', 'html'],

  rules: require('./rules/recommended'),
};
