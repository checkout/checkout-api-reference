#!/usr/bin/env node
'use strict';
require('shelljs/global');
var path = require('path');

set('-e');
set('-v');

var branch = process.env.TRAVIS_BRANCH && process.env.TRAVIS_BRANCH.toLowerCase();
if (branch && branch !== 'gh-pages') {
  var branchPath = path.join('.tmp', 'preview', branch, '/');
  mkdir('-p', branchPath);

  exec('dotnet build src/OpenApiGenerator/OpenApiGenerator.csproj');
  exec('dotnet run -p src/OpenApiGenerator/OpenApiGenerator.csproj');

  cp('-R', 'output/*', branchPath);
  rm('-rf', 'output')

  cp('-R', 'web/*', branchPath);
  exec('deploy-to-gh-pages --update .tmp');
}
