module.exports = {
  '**/*.{ts,js,md}': [
    `eslint --fix --cache --no-error-on-unmatched-pattern`,
    'prettier --write',
  ],
  '**/*.json': 'prettier --write',
};
