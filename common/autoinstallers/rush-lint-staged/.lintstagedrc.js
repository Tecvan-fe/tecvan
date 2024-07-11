const { excludeIgnoredFiles } = require('./utils');
const micromatch = require('micromatch');

module.exports = {
  '**/*.{ts,tsx,js,jsx,mjs,vue}': async files => {
    const match = micromatch.not(files, [
      '**/common/_templates/!(_*)/**/(.)?*',
    ]);
    const filesToLint = await excludeIgnoredFiles(match);
    return [
      `eslint --fix --cache ${filesToLint} --no-error-on-unmatched-pattern`,
    ];
  },
  '**/*.{json,md}': 'prettier --write',
};
