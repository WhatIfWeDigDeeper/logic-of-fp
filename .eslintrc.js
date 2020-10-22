module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'jest',
    'lodash-fp'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:lodash-fp/recommended'
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": 0
  },
  env: {
    "jest/globals": true,
    "node": true
  }
};