import gendiff from "../index.js";
import path from "path";
import {fileURLToPath} from "url";
import * as fs from "fs";

test('test1 genDiff', () => {

    const response = gendiff('__fixtures__/Alice.json', '__fixtures__/Bob.json');

    expect(response).toBe('{\n' +
        '  - age: 30\n' +
        '  + age: 25\n' +
        '  - name: Alice\n' +
        '  + name: Bob\n' +
        '}');
});

// Получаю путь к текущему файлу
const __filename = fileURLToPath(import.meta.url); // import.meta.url это свойство, доступное в модулях ECMAScript (ES-модулях), которое содержит URL текущего модуля.
//fileURLToPath(url) принимает URL в качестве аргумента и возвращает путь файловой системы, соответствующий этому URL.
const __dirname = path.dirname(__filename); //Метод path.dirname() возвращает имя каталога path, аналогично dirname команде Unix.

test('test2 genDiff', () => {
    let path1file;
    path1file = path.join(__dirname, '..', '__fixtures__', 'file1.json');
    let path2file;
    path2file = path.join(__dirname, '..', '__fixtures__', 'file2.json');
    let pathResultfile;
    pathResultfile = path.join(__dirname, '..', '__fixtures__', 'file1_2_result.txt');
    const response = gendiff(path1file, path2file);
    // console.log('Response:', response);
    // console.log('Expected:', fs.readFileSync(pathResultfile, 'utf8'));
    expect(response.trim()).toBe(fs.readFileSync(pathResultfile, 'utf8').trim());
});

test('test3 genDiff yml files', () => {
    let path1file;
    path1file = path.join(__dirname, '..', '__fixtures__', 'file1.yml');
    let path2file;
    path2file = path.join(__dirname, '..', '__fixtures__', 'file2.yml');
    let pathResultfile;
    pathResultfile = path.join(__dirname, '..', '__fixtures__', 'file1_2_result.txt');
    const response = gendiff(path1file, path2file);
    // console.log('Response:', response);
    // console.log('Expected:', fs.readFileSync(pathResultfile, 'utf8'));
    expect(response.trim()).toBe(fs.readFileSync(pathResultfile, 'utf8').trim());
});

test('test4 genDiff json deep', () => {
    let path1file;
    path1file = path.join(__dirname, '..', '__fixtures__', 'file3_1.json');
    let path2file;
    path2file = path.join(__dirname, '..', '__fixtures__', 'file3_2.json');
    let pathResultfile;
    pathResultfile = path.join(__dirname, '..', '__fixtures__', 'file3_12_result.txt');
    const response = gendiff(path1file, path2file);
    expect(response.trim()).toBe(fs.readFileSync(pathResultfile, 'utf8').trim());
});

test('test5 genDiff yml deep', () => {
    let path1file;
    path1file = path.join(__dirname, '..', '__fixtures__', 'file3_1.yml');
    let path2file;
    path2file = path.join(__dirname, '..', '__fixtures__', 'file3_2.yml');
    let pathResultfile;
    pathResultfile = path.join(__dirname, '..', '__fixtures__', 'file3_12_result.txt');
    const response = gendiff(path1file, path2file);
    expect(response.trim()).toBe(fs.readFileSync(pathResultfile, 'utf8').trim());
});

// test('test6 genDiff json deep PLAIN formatter', () => {
//     let path1file;
//     path1file = path.join(__dirname, '..', '__fixtures__', 'file3_1.json');
//     let path2file;
//     path2file = path.join(__dirname, '..', '__fixtures__', 'file3_2.json');
//     let pathResultfile;
//     pathResultfile = path.join(__dirname, '..', '__fixtures__', 'file3_12_plain_result.txt');
//     const response = gendiff(path1file, path2file, plain);
//     expect(response.trim()).toBe(fs.readFileSync(pathResultfile, 'utf8').trim());
// });