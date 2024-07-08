module.exports = {
  "**/*.{ts,md,js}": `eslint --fix --cache --no-error-on-unmatched-pattern`,
  "**/*.json": "prettier --write",
};
