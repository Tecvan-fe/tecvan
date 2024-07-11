#!/usr/bin/env bash
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
ROOT_DIR=$(realpath "$SCRIPT_DIR/..")
echo $ROOT_DIR
RUSH_FILE="$ROOT_DIR/common/scripts/install-run-rush.js"


die() {
  echo $1
  exit 1
}


rushx() {
  node $RUSH_FILE "$@"
}

# Build current project.
# It will abort with errors if package.json is not found in the current directory.
#
# Usage:
# build_project
build_project()
{
  if [ ! -f package.json ]; then
    die "build_project: package.json not found"
  fi
  rushx build -t .
}


