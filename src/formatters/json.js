import * as fs from 'fs';

const createJsonFile = (obj) => {
  // Преобразуем объект в строку JSON с отступами
  const jsonString = JSON.stringify(obj, null, 2); // Второй аргумент null, третий 2 — для отступов
  const fileName = 'output.json';
  // Записываем строку JSON в файл
  console.log(jsonString);
  fs.writeFileSync(fileName, jsonString);
  return jsonString;
};

export default createJsonFile;
