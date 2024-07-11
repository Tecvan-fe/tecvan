#!/usr/bin/env bash

set -ex

# Switch cwd to the project folder
cd $(dirname "$0")

source ../../scripts/deploy_base.sh

NODE_ENV=production rushx build -o .

if [ $? -eq 0 ]; then
  # TODO: this line is so tricky, should be process by vite
  cp ./src/favicon.ico ./.vitepress/dist
  npx vercel deploy --prod --token=$VERCEL_TOKEN --cwd=./.vitepress/dist
else
  exit $?
fi

