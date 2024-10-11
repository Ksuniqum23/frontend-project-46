import * as fs from 'fs';

const createJsonFile = (obj) => {
  // Преобразуем объект в строку JSON с отступами
  const jsonString = JSON.stringify(obj, null, 2); // Второй аргумент null, третий 2 — для отступов
  const fileName = 'output.json';
  // Записываем строку JSON в файл
  fs.writeFile(fileName, jsonString, (err) => {
    if (err) {
      console.error('Ошибка записи файла:', err);
    } else {
      console.log('Файл успешно создан:', fileName);
    }
  });
};

export default createJsonFile;
// // Пример использования
// const sampleObject = {
//     name: "Иван",
//     age: 30,
//     married: true,
//     children: ["Маша", "Игорь"],
// };
//
// // Создание файла output.json
// createJsonFile(sampleObject, 'output.json');
