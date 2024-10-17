#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

const justDoIt = (file1, file2, formatName) => {
  const { format } = formatName;
  return genDiff(file1, file2, format);
};

program
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action(justDoIt);

program.parse(process.argv);
