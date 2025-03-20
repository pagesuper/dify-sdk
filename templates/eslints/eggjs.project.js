module.exports = {
  root: true,
  parserOptions: {
    project: '../tsconfigs/eggjs.json',
  },
  extends: [
    'eslint-config-egg/typescript',
    'eslint:recommended',
    'standard',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  rules: require('./rules/recommended'),
};
