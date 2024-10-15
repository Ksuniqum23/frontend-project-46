import path from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import gendiff from '../index.js';
import createJsonFile from "../formatters/json.js";

// Получаю путь к текущему файлу
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('test1 genDiff  json files', () => {
  const path1file = path.join(__dirname, '..', '__fixtures__', 'file1.json');
  const path2file = path.join(__dirname, '..', '__fixtures__', 'file2.json');
  const pathResultfile = path.join(__dirname, '..', '__fixtures__', 'file1_2_result.txt');
  const response = gendiff(path1file, path2file);
  expect(response.trim()).toBe(fs.readFileSync(pathResultfile, 'utf8').trim());
});

test('test2 genDiff yml files', () => {
  const path1file = path.join(__dirname, '..', '__fixtures__', 'file1.yml');
  const path2file = path.join(__dirname, '..', '__fixtures__', 'file2.yml');
  const pathResultfile = path.join(__dirname, '..', '__fixtures__', 'file1_2_result.txt');
  const response = gendiff(path1file, path2file);
  expect(response.trim()).toBe(fs.readFileSync(pathResultfile, 'utf8').trim());
});

test('test3 genDiff json deep', () => {
  const path1file = path.join(__dirname, '..', '__fixtures__', 'file3_1.json');
  const path2file = path.join(__dirname, '..', '__fixtures__', 'file3_2.json');
  const pathResultfile = path.join(__dirname, '..', '__fixtures__', 'file3_12_result.txt');
  const response = gendiff(path1file, path2file);
  expect(response.trim()).toBe(fs.readFileSync(pathResultfile, 'utf8').trim());
});

test('test4 genDiff yml deep', () => {
  const path1file = path.join(__dirname, '..', '__fixtures__', 'file3_1.yml');
  const path2file = path.join(__dirname, '..', '__fixtures__', 'file3_2.yml');
  const pathResultfile = path.join(__dirname, '..', '__fixtures__', 'file3_12_result.txt');
  const response = gendiff(path1file, path2file);
  expect(response.trim()).toBe(fs.readFileSync(pathResultfile, 'utf8').trim());
});

test('test5 genDiff json deep PLAIN formatter', () => {
  const path1file = path.join(__dirname, '..', '__fixtures__', 'file3_1.json');
  const path2file = path.join(__dirname, '..', '__fixtures__', 'file3_2.json');
  const pathResultfile = path.join(__dirname, '..', '__fixtures__', 'file3_12_plain_result.txt');
  const response = gendiff(path1file, path2file, 'plain');
  expect(response.trim()).toBe(fs.readFileSync(pathResultfile, 'utf8').trim());
});

test('test6 format error', () => {
  const path1file = path.join(__dirname, '..', '__fixtures__', 'file3_1.json');
  const path2file = path.join(__dirname, '..', '__fixtures__', 'file3_2.json');
  const response = gendiff(path1file, path2file, 'qwe123');
  expect(response.trim()).toBe('error');
});

// test('test7 JSON file', (done) => {
//   const path1file = path.join(__dirname, '..', '__fixtures__', 'file1.json');
//   const path2file = path.join(__dirname, '..', '__fixtures__', 'file2.json');
//   const pathResultfile = path.join(__dirname, '..', '__fixtures__', 'file1_2_result.txt');
//   const outputFilePath = path.join(__dirname, '..', '__fixtures__', 'output.json');
//   const response = gendiff(path1file, path2file, 'json');
//
//   setTimeout(() => {
//     expect(fs.existsSync(outputFilePath)).toBe(true);
//     const data = fs.readFileSync(outputFilePath, 'utf8');
//     const expectedData = fs.readFileSync(pathResultfile, 'utf8');
//     expect(JSON.parse(data)).toEqual(JSON.parse(expectedData));
//     done();
//   }, 100);
// }, 20000);
// const fs = require('fs').promises;
test('test 7 json async', () => {
  const path1file = path.join(__dirname, '..', '__fixtures__', 'file1.json');
  const path2file = path.join(__dirname, '..', '__fixtures__', 'file2.json');
  // const pathResultfile = path.join(__dirname, '..', '__fixtures__', 'file1_2_result.txt');
  const outputFilePath = path.join(__dirname, '..', 'output.json');

  gendiff(path1file, path2file, 'json');
  // await fs.promises.access(outputFilePath);
  const data = fs.readFileSync(outputFilePath, 'utf-8');
  // const expectData = fs.readFileSync(pathResultfile, 'utf-8');
  expect(data).toBeTruthy();
});
