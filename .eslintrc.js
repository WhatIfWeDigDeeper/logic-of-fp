module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'jest',
    'lodash-fp',
    'fp'
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
    "@typescript-eslint/no-unused-vars": 0,
    "fp/no-arguments": "warn",
    "fp/no-class": "warn",
    "fp/no-delete": "warn",
    "fp/no-events": "warn",
    "fp/no-get-set": "warn",
    "fp/no-let": "warn",
    "fp/no-loops": "warn",
    "fp/no-mutating-assign": "warn",
    "fp/no-mutating-methods": "warn",
    "fp/no-mutation": "warn",
    "fp/no-nil": "warn",
    "fp/no-proxy": "warn",
    "fp/no-rest-parameters": "warn",
    "fp/no-this": "warn",
    "fp/no-throw": "warn",
    "fp/no-unused-expression": "warn",
    "fp/no-valueof-field": "warn"
  },
  env: {
    "jest/globals": true,
    "node": true
  }
};