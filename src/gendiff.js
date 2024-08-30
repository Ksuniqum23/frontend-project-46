import path from 'path';
import * as fs from 'fs';
import _ from 'lodash';
import parser from './parser.js';

const getFullPath = (filePath) => path.resolve(process.cwd(), filePath);
const extractFormat = (filePath) => path.extname(filePath).slice(1);
const getData = (filePath) => parser(fs.readFileSync(filePath, 'utf-8'), extractFormat(filePath));

const differents = (obj1, obj2) => {
  const obj1keys = Object.keys(obj1);
  const obj2keys = Object.keys(obj2);
  const resultKeys = _.union(obj1keys, obj2keys).sort();
  let result = "{\n";
  for (let i = 0; i < resultKeys.length; i += 1) {
    const key = resultKeys[i];
    if (Object.hasOwn(obj1, key) === true && Object.hasOwn(obj2, key) === true) {
      if (obj1[key] === obj2[key]) {
        result += `    ${key}: ${obj1[key]}\n`;
      } else {
        result += `  - ${key}: ${obj1[key]}\n`;
        result += `  + ${key}: ${obj2[key]}\n`;
      }
    }

    if (Object.hasOwn(obj1, key) === true && Object.hasOwn(obj2, key) === false) {
      result += `  - ${key}: ${obj1[key]}\n`;
    }

    if (Object.hasOwn(obj1, key) === false && Object.hasOwn(obj2, key) === true) {
      result += `  + ${key}: ${obj2[key]}\n`;
    }
  }
  result += `}`;
  return result;
};

const genDiff = (filePath1, filePath2) => {
  const fullPath1 = getFullPath(filePath1);
  const fullPath2 = getFullPath(filePath2);
  const data1 = getData(fullPath1);
  const data2 = getData(fullPath2);
  const diffFile = differents(data1, data2);
  console.log(diffFile);
};
export default genDiff;
