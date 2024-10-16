import path from 'path';
import * as fs from 'fs';
import _ from 'lodash';
import parser from './parser.js';
import doFormatting from './formatters/index.js';

const getFullPath = (filePath) => path.resolve(process.cwd(), filePath);
const extractFormat = (filePath) => path.extname(filePath).slice(1);
const getData = (filePath) => parser(fs.readFileSync(filePath, 'utf-8'), extractFormat(filePath));

const resultObjDif = (obj1, obj2) => {
  let obj1keys = [];
  let obj2keys = [];
  if (obj1 !== null && obj1 !== undefined && Object.keys(obj1).length > 0) {
    obj1keys = Object.keys(obj1);
  }
  if (obj2 !== null && obj2 !== undefined && Object.keys(obj2).length > 0) {
    obj2keys = Object.keys(obj2);
  }
  const resultKeys = _.union(obj1keys, obj2keys).sort();

  const result = resultKeys.reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (_.isEqual(value1, value2)) {
      acc[key] = {
        status: 'equal',
        v: value1,
      };
    }
    if (obj1.hasOwnProperty(key) && !obj2.hasOwnProperty(key)) {
      acc[key] = {
        status: 'remove',
        v: value1,
      };
    }
    if (!obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
      acc[key] = {
        status: 'add',
        v: value2,
      };
    }
    if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key) && (value1 !== value2)) {
      if (typeof value1 === 'object' && typeof value2 === 'object') {
        acc[key] = {
          status: 'difObject',
          v: resultObjDif(value1, value2),
        };
      } else {
        acc[key] = {
          status: 'different',
          v: value1,
          v2: value2,
        };
      }
    }
    return acc;
  }, {});
  return result;
};

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const fullPath1 = getFullPath(filePath1);
  const fullPath2 = getFullPath(filePath2);
  const data1 = getData(fullPath1);
  const data2 = getData(fullPath2);
  const diffFile = resultObjDif(data1, data2);
  const formatting = doFormatting(diffFile, formatName);
  if (formatName !== 'json') {
    console.log(formatting);
  }
  return formatting;
};
export default genDiff;
