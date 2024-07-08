const { includeIgnoreFile } = require("@eslint/compat");
const path = require("path");
const prettierrc = require("./.prettierrc");

const gitignorePath = path.resolve(__dirname, ".gitignore");

module.exports = {
  ignorePatterns: [...includeIgnoreFile(gitignorePath).ignores],
  extends: ["prettier"],
  plugins: ["prettier", "@typescript-eslint", "@babel"],
  rules: {
    "prettier/prettier": ["warn", prettierrc, { usePrettierrc: false }],
  },
  overrides: [
    {
      files: ["**/*.js", "**/*.mjs"],
      parser: "@babel/eslint-parser",
      parserOptions: {
        requireConfigFile: false,
        bebelOptions: {
          babelrc: false,
          configFile: false,
        },
      },
      settings: {
        "import/resolver": {
          node: {
            moduleDirectory: ["node_modules", "src"],
            extensions: [".js", ".jsx", ".ts", ".tsx"],
          },
        },
      },
    },
    {
      files: ["**/*.ts", "**/*.tsx"],
      parser: "@typescript-eslint/parser",
    },
    { files: ["**/*.md"], extends: ["plugin:markdown/recommended-legacy"] },
  ],
};
