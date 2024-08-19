#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();

program
    .name('gendiff')
    .description('Compares two configuration files and shows a difference.')
    .version('1.0.0')
    .option('-h, --help', 'output usage information')
    .option('-f, --format <type>', 'output format');
program.parse(process.argv);

if (program.opts().help) {
    program.help();
}


import genDiff from "../index.js";

genDiff('__fixtures__/file1.json', '__fixtures__/file1.json');