// import fs from 'fs';
// import createJsonFile from "../formatters/json.js";
//
// describe('createJsonFile', () => {
//     const testObject = { name: "Иван", age: 30 };
//     const fileName = 'output.json';
//
//     afterEach(() => {
//         // Удаляем файл после каждого теста
//         if (fs.existsSync(fileName)) {
//             fs.unlinkSync(fileName);
//         }
//     });
//
//     test('должен создать JSON-файл с правильным содержимым', (done) => {
//         createJsonFile(testObject, fileName);
//
//         // Проверяем через некоторое время после записи файла
//         setTimeout(() => {
//             expect(fs.existsSync(fileName)).toBe(true); // Проверяем, что файл создан
//
//             const data = fs.readFileSync(fileName, 'utf8'); // Читаем содержимое файла
//             expect(JSON.parse(data)).toEqual(testObject); // Проверяем содержимое
//
//             done(); // Завершаем тест
//         }, 100);
//     });
// });
