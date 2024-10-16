import * as fs from 'fs';

const createJsonFile = (obj) => {
  const jsonString = JSON.stringify(obj, null, 2);
  const fileName = 'output.json';
  console.log(jsonString);
  fs.writeFileSync(fileName, jsonString);
  return jsonString;
};

export default createJsonFile;
