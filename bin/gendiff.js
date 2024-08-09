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

// program.action((path1, path2) => {
//   console.log(sum(path1, path2, program.opts().format));
// })

// https://www.perplexity.ai/search/dlia-chego-nuzhen-etot-proekt-seONF3MiRD6C1hGWvAzwtg
