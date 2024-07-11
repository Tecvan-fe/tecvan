module.exports = {
  root: true,
  extends: ['standard'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2021,
  },
  rules: { semi: 0, 'comma-dangle': 0 },
};
