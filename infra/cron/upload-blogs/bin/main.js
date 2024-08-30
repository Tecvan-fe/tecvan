#!/usr/bin/env node

require('sucrase/register/ts');
const path = require('path');

require(path.resolve(__dirname, '../src/cli.ts'));
