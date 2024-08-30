#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../index.js';

const program = new Command();

const justDoIt = (file1, file2) => {
  genDiff(file1, file2);
};

program
// .command('1 <file1> <file2>')
// .name('gendiff')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .option('-f, --format <type>', 'output format', "stylish")
  .action(justDoIt);
// .parse(process.argv);
// .action((path1, path2) => {
//     try {
//         genDiff(path1, path2);
//     } catch (err) {
//         console.error(`Ошибка: ${err.message}`);
//     }
// });

// Парсинг аргументов командной строки
program.parse(process.argv);

// https://youtu.be/_Oe4B6OKPvY?si=OYQ3DR3aU-kDF4Af&t=3142
// https://www.perplexity.ai/search/dlia-chego-nuzhen-etot-proekt-seONF3MiRD6C1hGWvAzwtg
