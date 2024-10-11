import path from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import gendiff from '../index.js';
import createJsonFile from '../formatters/json.js';

test('test1 genDiff', () => {
  const response = gendiff('__fixtures__/Alice.json', '__fixtures__/Bob.json');

  expect(response).toBe('{\n'
        + '  - age: 30\n'
        + '  + age: 25\n'
        + '  - name: Alice\n'
        + '  + name: Bob\n'
        + '}');
});

// Получаю путь к текущему файлу
const __filename = fileURLToPath(import.meta.url); // import.meta.url это свойство, доступное в модулях ECMAScript (ES-модулях), которое содержит URL текущего модуля.
// fileURLToPath(url) принимает URL в качестве аргумента и возвращает путь файловой системы, соответствующий этому URL.
const __dirname = path.dirname(__filename); // Метод path.dirname() возвращает имя каталога path, аналогично dirname команде Unix.

test('test2 genDiff', () => {
  const path1file = path.join(__dirname, '..', '__fixtures__', 'file1.json');
  const path2file = path.join(__dirname, '..', '__fixtures__', 'file2.json');
  const pathResultfile = path.join(__dirname, '..', '__fixtures__', 'file1_2_result.txt');
  const response = gendiff(path1file, path2file);
  // console.log('Response:', response);
  // console.log('Expected:', fs.readFileSync(pathResultfile, 'utf8'));
  expect(response.trim()).toBe(fs.readFileSync(pathResultfile, 'utf8').trim());
});

test('test3 genDiff yml files', () => {
  const path1file = path.join(__dirname, '..', '__fixtures__', 'file1.yml');
  const path2file = path.join(__dirname, '..', '__fixtures__', 'file2.yml');
  const pathResultfile = path.join(__dirname, '..', '__fixtures__', 'file1_2_result.txt');
  const response = gendiff(path1file, path2file);
  // console.log('Response:', response);
  // console.log('Expected:', fs.readFileSync(pathResultfile, 'utf8'));
  expect(response.trim()).toBe(fs.readFileSync(pathResultfile, 'utf8').trim());
});

test('test4 genDiff json deep', () => {
  const path1file = path.join(__dirname, '..', '__fixtures__', 'file3_1.json');
  const path2file = path.join(__dirname, '..', '__fixtures__', 'file3_2.json');
  const pathResultfile = path.join(__dirname, '..', '__fixtures__', 'file3_12_result.txt');
  const response = gendiff(path1file, path2file);
  expect(response.trim()).toBe(fs.readFileSync(pathResultfile, 'utf8').trim());
});

test('test5 genDiff yml deep', () => {
  const path1file = path.join(__dirname, '..', '__fixtures__', 'file3_1.yml');
  const path2file = path.join(__dirname, '..', '__fixtures__', 'file3_2.yml');
  const pathResultfile = path.join(__dirname, '..', '__fixtures__', 'file3_12_result.txt');
  const response = gendiff(path1file, path2file);
  expect(response.trim()).toBe(fs.readFileSync(pathResultfile, 'utf8').trim());
});

test('test6 genDiff json deep PLAIN formatter', () => {
  const path1file = path.join(__dirname, '..', '__fixtures__', 'file3_1.json');
  const path2file = path.join(__dirname, '..', '__fixtures__', 'file3_2.json');
  const pathResultfile = path.join(__dirname, '..', '__fixtures__', 'file3_12_plain_result.txt');
  const response = gendiff(path1file, path2file, 'plain');
  expect(response.trim()).toBe(fs.readFileSync(pathResultfile, 'utf8').trim());
});

test(
  'test7 JSON file',
  (done) => {
    const testObject = { name: 'Иван', age: 30 };
    const fileName = 'output.json';
    createJsonFile(testObject);

    setTimeout(() => {
      expect(fs.existsSync(fileName)).toBe(true); // проверяем, что файл есть
      const data = fs.readFileSync(fileName, 'utf8'); // читаем
      expect(JSON.parse(data)).toEqual(testObject); // проверяем содержимое
      done();
    }, 100);
  },
);
