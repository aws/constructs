#!/bin/bash
set -euo pipefail
scriptdir=$(cd $(dirname $0) && pwd)
version="$(node -p "require('${scriptdir}/../version.json').version")"
echo ${version} > dist/go/constructs/version
