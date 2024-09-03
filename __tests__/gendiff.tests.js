import gendiff from "../index.js";
import path from "path";
import {fileURLToPath} from "url";

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
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('test2 genDiff', () => {
    let path1file;
    path1file = path.join(__dirname, '..', '__fixtures__', 'file1.json');
    let path2file;
    path2file = path.join(__dirname, '..', '__fixtures__', 'file2.json');
    const response = gendiff(path1file, path2file);

    expect(response).toBe('{\n' +
        '  - follow: false\n' +
        '    host: hexlet.io\n' +
        '  - proxy: 123.234.53.22\n' +
        '  - timeout: 50\n' +
        '  + timeout: 20\n' +
        '  + verbose: true\n' +
        '}');
});