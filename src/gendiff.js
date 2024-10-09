import path from 'path';
import * as fs from 'fs';
import _ from 'lodash';
import parser from './parser.js';
import stylish from "./formatters.js";

const getFullPath = (filePath) => path.resolve(process.cwd(), filePath);
const extractFormat = (filePath) => path.extname(filePath).slice(1);
const getData = (filePath) => parser(fs.readFileSync(filePath, 'utf-8'), extractFormat(filePath));

const letStatus = (value1 = undefined, value2 = undefined) => {
  let result = '';
  if (value1 !== undefined) {
    value1= value1 + '';
  }
  if (value2 !== undefined) {
    value2= value2 + '';
  }

  if (value1 === value2) {
    result = 'equal';
  }
  if (value1 && value2 && (value1 !== value2)) {
    result = 'different';
  }
  if (value1 && value2 === undefined) {
    result = 'remove';
  }
  if (value1 === undefined && value2) {
    result = 'add';
  }
  return result;
}

const resultObjDif = (obj1, obj2 = undefined) => {
  let obj1keys = [];
  let obj2keys = [];
  if (obj1 !== null && obj1 !== undefined && Object.keys(obj1).length > 0) {
    obj1keys = Object.keys(obj1);
  }
  if (obj2 !== null && obj2 !== undefined && Object.keys(obj2).length > 0) {
    obj2keys = Object.keys(obj2);
  }

  const resultKeys = _.union(obj1keys, obj2keys).sort();

  const resultObj = resultKeys.reduce((acc, key) => {

    let value1;
    let value2;
    if (obj1 && obj1[key] !== undefined) {
      value1 = obj1[key];
    }
    if (obj2 && obj2[key] !== undefined)  {
      value2 = obj2[key];
    }

    if (_.isEqual(value1, value2)) {
      acc[key] = {
        status: 'equal',
        v1: value1,
      }
    }
    if (typeof value1 !== "object") {
      acc[key] = {
        status: letStatus(value1, value2),
        v1: value1,
        v2: value2
      }
    }
    if (typeof value1 === "object") {
      acc[key] = {
        status: 'object',
        v1: resultObjDif(value1, value2),
      }
    }
    return acc;
  }, {});
  return resultObj;
}


const genDiff = (filePath1, filePath2) => {
  const fullPath1 = getFullPath(filePath1);
  const fullPath2 = getFullPath(filePath2);
  const data1 = getData(fullPath1);
  const data2 = getData(fullPath2);
  const diffFile = resultObjDif(data1, data2);
  const formatting = stylish(diffFile);
  // console.log(JSON.stringify(diffFile, null, 2));
  console.log(formatting);
  return formatting;
};
export default genDiff;
