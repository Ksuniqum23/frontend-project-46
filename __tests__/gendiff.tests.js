import path from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixture = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixtureFile = (filename) => fs.readFileSync(getFixture(filename), 'utf-8');

test('test1 genDiff .json default=stylish formatter', () => {
  const file1 = getFixture('file1.json');
  const file2 = getFixture('file2.json');
  const response = gendiff(file1, file2);
  const fileContent = readFixtureFile('files_12_stylish_result.txt');
  expect(response).toEqual(fileContent);
});

test('test2 genDiff .yml default=stylish formatter', () => {
  const file1 = getFixture('file1.yml');
  const file2 = getFixture('file2.yml');
  const response = gendiff(file1, file2);
  const fileContent = readFixtureFile('files_12_stylish_result.txt');
  expect(response).toBe(fileContent);
});

test('test3 genDiff .json PLAIN formatter', () => {
  const file1 = getFixture('file1.yml');
  const file2 = getFixture('file2.yml');
  const response = gendiff(file1, file2, 'plain');
  const fileContent = readFixtureFile('files_12_plain_result.txt');
  expect(response).toBe(fileContent);
});

test('test4 genDiff JSON formatter', () => {
  const file1 = getFixture('file1.yml');
  const file2 = getFixture('file2.yml');
  const response = gendiff(file1, file2, 'json');
  const expected = readFixtureFile('files_12_json_result.txt');
  expect(response).toBe(expected);
});

test('test5 format error', () => {
  const file1 = getFixture('file1.yml');
  const file2 = getFixture('file2.yml');
  const response = gendiff(file1, file2, 'qwe123');
  expect(response).toBe('error');
});
