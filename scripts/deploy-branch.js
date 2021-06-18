#!/usr/bin/env node
'use strict';
require('shelljs/global');
var path = require('path');
var ghpages = require('gh-pages');

set('-e');
set('-v');

exec('git rev-parse --abbrev-ref HEAD', (err, stdout, stderr) => {
    if (err) {
      // handle your error
    }
    var branchPath = path.join('.tmp', 'preview', stdout, '/');
    mkdir('-p', branchPath);

    exec('dotnet build src/OpenApiGenerator/OpenApiGenerator.csproj');
    exec('dotnet run -p src/OpenApiGenerator/OpenApiGenerator.csproj');

    cp('-R', 'output/*', branchPath);
    rm('-rf', 'output')

    cp('-R', 'web/*', branchPath);

    exec(`gh-pages -d .tmp`, (err, stdout, stderr) => {
    // ...
    });
  });
  

