// This is a workaround for https://github.com/eslint/eslint/issues/3458
require('@rushstack/eslint-config/patch/modern-module-resolution');

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ['./.eslintrc.base.js', 'plugin:vue/essential'],
  plugins: ['vue'],
  rules: {
    'vue/no-multiple-template-root': 'off',
  },
};
