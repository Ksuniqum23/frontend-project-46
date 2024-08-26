#!/usr/bin/env node
// import sum from "../index.js";
//
// // console.log(sum(1, 4));

import { Command } from 'commander';
import gendiff from '../index.js'; // подключила библиотеку для работы с консолью, через консоль запускать файл

const program = new Command(); // новый инстанс коммандера

program.action((path1, path2) => {
  console.log(gendiff(path1, path2, program.opts().format));
});
