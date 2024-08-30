import { Command } from 'commander';

import { readPackageJson } from './utils/read-packagejson';

const dynamicLoadAction = () => {};

const run = async () => {
  const program = new Command();
  const packageJson = await readPackageJson();
  program
    .name(packageJson.name)
    .version(packageJson.version)
    .description('Upload blogs to coze.');

  program
    .command('upload')
    .description('Upload blogs to coze.')
    .option('-p, --path <path>', 'Path to the blog directory.')
    .action((args: { path?: string }) => {});
};

run();
