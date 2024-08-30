import path from 'path';
import fs from 'fs/promises';

type PackageJson = {
  name: string;
  version: string;
} & Record<string, unknown>;

export const readPackageJson = async () => {
  const packageJsonFile = path.resolve(__dirname, '../../package.json');
  try {
    const content = await fs.readFile(packageJsonFile, { encoding: 'utf-8' });
    return JSON.parse(content) as PackageJson;
  } catch (e) {
    throw new Error(`read package.json error: ${e}`);
  }
};
