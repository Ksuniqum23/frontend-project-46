import path from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import gendiff from '../src/index.js';

// Получаю путь к текущему файлу
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixtures = (files, result) => {
  const filePaths = {
    json: [
      path.join(__dirname, '..', '__fixtures__', 'file1.json'),
      path.join(__dirname, '..', '__fixtures__', 'file2.json'),
    ],
    yml: [
      path.join(__dirname, '..', '__fixtures__', 'file1.yml'),
      path.join(__dirname, '..', '__fixtures__', 'file2.yml'),
    ],
  };
  const resultPaths = {
    default: path.join(__dirname, '..', '__fixtures__', 'files_12_default_result.txt'),
    plain: path.join(__dirname, '..', '__fixtures__', 'files_12_plain_result.txt'),
  };
  const [file1Path, file2Path] = filePaths[files];
  const fileResultPath = resultPaths[result];

  return [file1Path, file2Path, fileResultPath];
};

test('test1 genDiff .json default formatter', () => {
  const [file1Path, file2Path, fileResultPath] = getFixtures('json', 'default');
  const response = gendiff(file1Path, file2Path);
  const fileContent = fs.readFileSync(fileResultPath, 'utf8');
  const trimmedResponse = response.split('\n').map((line) => line.trimEnd()).join('\n').trim();
  const trimmedFileContent = fileContent.split('\n').map((line) => line.trimEnd()).join('\n').trim();
  expect(trimmedResponse).toBe(trimmedFileContent);
});

test('test2 genDiff .yml default formatter', () => {
  const [file1Path, file2Path, fileResultPath] = getFixtures('yml', 'default');
  const response = gendiff(file1Path, file2Path);
  const fileContent = fs.readFileSync(fileResultPath, 'utf8');
  const trimmedResponse = response.split('\n').map((line) => line.trimEnd()).join('\n').trim();
  const trimmedFileContent = fileContent.split('\n').map((line) => line.trimEnd()).join('\n').trim();
  expect(trimmedResponse).toBe(trimmedFileContent);
});

test('test3 genDiff .json PLAIN formatter', () => {
  const [file1Path, file2Path, fileResultPath] = getFixtures('json', 'plain');
  const response = gendiff(file1Path, file2Path, 'plain');
  const fileContent = fs.readFileSync(fileResultPath, 'utf8');
  const trimmedResponse = response.split('\n').map((line) => line.trimEnd()).join('\n').trim();
  const trimmedFileContent = fileContent.split('\n').map((line) => line.trimEnd()).join('\n').trim();
  expect(trimmedResponse).toBe(trimmedFileContent);
});

test('test4 genDiff JSON formatter', () => {
  const [file1Path, file2Path] = getFixtures('json', 'default');
  const outputFilePath = path.join(__dirname, '..', 'output.json');
  gendiff(file1Path, file2Path, 'json');
  const data = fs.readFileSync(outputFilePath, 'utf-8');
  expect(data).toBeTruthy();
});

test('test5 format error', () => {
  const [file1Path, file2Path] = getFixtures('json', 'default');
  const response = gendiff(file1Path, file2Path, 'qwe123');
  expect(response.trim()).toBe('error');
});
