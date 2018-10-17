#!/usr/bin/env node
const fs = require('fs-extra');
const program = require('commander');
const pkg = require('../package');
const toJson = require('../src');

program
  .version(pkg.version)
  .arguments('<dir> [otherDirs]')
  .action(async (dir, otherDirs) => {
    try {
      const messages = await toJson(dir);
      await fs.outputFile(otherDirs || './output.json', JSON.stringify(messages));
      console.log('success');
    } catch (e) {
      console.log(e);
    }
  });

program.parse(process.argv);