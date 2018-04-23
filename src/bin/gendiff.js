#!/usr/bin/env node
/* eslint-disable no-console */
import program from 'commander';

program
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.');
program.parse(process.argv);
