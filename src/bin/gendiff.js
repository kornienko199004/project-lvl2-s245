#!/usr/bin/env node
/* eslint-disable no-console */
import program from 'commander';
import genDiff from '..';

program
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format', 'simple')
  .arguments('<firstConfig> <secondConfig>')
  .description('Compares two configuration files and shows a difference.')
  .action((first, second) => {
    console.log(genDiff(first, second, program.format));
  });
program.parse(process.argv);
