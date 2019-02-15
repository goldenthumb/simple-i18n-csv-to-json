#!/usr/bin/env node
const fs = require('fs-extra');
const path = require('path');
const program = require('commander');
const pkg = require('../package');
const toJson = require('../src');

program
  .version(pkg.version)
  .option('--allow-empty', 'use empty string')
  .arguments('<dir> [otherDirs]')
  .action(async (dir, otherDirs, { allowEmpty }) => {
    try {
      const messages = await toJson(path.resolve(process.cwd(), dir), { allowEmpty });
      await fs.outputFile(otherDirs || './output.json', JSON.stringify(messages));
      console.log('success');
    } catch (e) {
      console.log(e);
    }
  });

program.parse(process.argv);