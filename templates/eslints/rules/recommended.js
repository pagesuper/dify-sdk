module.exports = {
  semi: ['error', 'always'],
  'arrow-parens': ['error', 'always'],
  'comma-dangle': ['error', 'always-multiline'],
  'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 1, maxEOF: 1 }],
  'no-undef': 'off',
  'no-use-before-define': 'off',
  '@typescript-eslint/interface-name-prefix': 'off',
  '@typescript-eslint/explicit-function-return-type': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-empty-function': 'off',
  '@typescript-eslint/explicit-module-boundary-types': 'off',
  '@typescript-eslint/no-namespace': 'off',
  '@typescript-eslint/ban-types': 'off',
  'space-before-function-paren': 'off',
  '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  '@typescript-eslint/no-this-alias': [
    'error',
    {
      // Allow `const { props, state } = this`; false by default
      allowDestructuring: true,
      // Allow `const self = this`; `[]` by default
      allowedNames: ['self'],
    },
  ],
};
