import path from 'path';
import * as fs from 'fs';
import _ from 'lodash';
import parser from './parser.js';
import stylish from "./formatters.js";

const getFullPath = (filePath) => path.resolve(process.cwd(), filePath);
const extractFormat = (filePath) => path.extname(filePath).slice(1);
const getData = (filePath) => parser(fs.readFileSync(filePath, 'utf-8'), extractFormat(filePath));

// const formatters = {
//   stylish: stylish;
// }
// const deepDiff = (key, value, formatter) => {
//
// }
// const difference = (obj1, obj2) => {
//   const obj1keys = Object.keys(obj1);
//   const obj2keys = Object.keys(obj2);
//   const resultKeys = _.union(obj1keys, obj2keys).sort();
//   let result = '{\n';
//   for (let i = 0; i < resultKeys.length; i += 1) {
//     const key = resultKeys[i];
//     if (Object.hasOwn(obj1, key) === true && Object.hasOwn(obj2, key) === true) {
//       if (obj1[key] === obj2[key]) {
//         result += `    ${key}: ${obj1[key]}\n`;
//       } else {
//         result += `  - ${key}: ${obj1[key]}\n`;
//         result += `  + ${key}: ${obj2[key]}\n`;
//       }
//     }
//
//     if (Object.hasOwn(obj1, key) === true && Object.hasOwn(obj2, key) === false) {
//       result += `  - ${key}: ${obj1[key]}\n`;
//     }
//
//     if (Object.hasOwn(obj1, key) === false && Object.hasOwn(obj2, key) === true) {
//       result += `  + ${key}: ${obj2[key]}\n`;
//     }
//   }
//   result += '}';
//   return result;
// };
// const diff3 = (value1, value2) => {
//
// }

const letStatus = (value1, value2) => {
  let result = '';
  if (value1 === value2) {
    result = 'equal';
  }
  if (value1 !== value2) {
    result = 'different';
  }
  if (value1 && value2 === '') {
    result = 'remove';
  }
  if (!value1 && value2) {
    result = 'add';
  }
  return result;
}

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

  const resultObj = resultKeys.reduce((acc, key) => {

    let value1 = '';
    let value2 = '';
    if (obj1 && obj1[key] !== null && obj1[key] !== undefined) {
      value1 = obj1[key];
    }
    if (obj2 && obj2[key] !== null && obj2[key] !== undefined)  {
      value2 = obj2[key];
    }

    if (_.isEqual(value1, value2)) {
      acc[key] = {
        status: 'equal',
        v1: value1,
        v2: '',
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
        v2: ''
      }
    }
    return acc;
  }, {});
  return resultObj;
}

// const diff2 = (obj1, obj2) => {
//   let obj1keys = [];
//   let obj2keys = []
//   if (obj1 !== null && obj1 !== undefined && Object.keys(obj1).length > 0) {
//     obj1keys = Object.keys(obj1);
//   }
//   if (obj2 !== null && obj2 !== undefined && Object.keys(obj2).length > 0) {
//     obj2keys = Object.keys(obj2);
//   }
//
//   const resultKeys = _.union(obj1keys, obj2keys).sort();
//   let status;
//   const result = resultKeys.map((key) => {
//     if ( obj1 && obj2 && (typeof obj1[key] === "object" || typeof obj2[key] === "object" )) {
//       if (_.isEqual(obj1[key], obj2[key])) {
//         status = 'equal';
//       } else {
//         status = 'deep';
//         return [key, diff2(obj1[key], obj2[key]), diff2(obj1[key], obj2[key]), status];
//       }
//     } else {
//       if (obj1 && Object.hasOwn(obj1, key) && obj2 && Object.hasOwn(obj2, key)) {
//         if (obj1[key] === obj2[key]) {
//           status = 'equal';
//         } else {
//           status = 'different';
//         }
//       }
//       if (obj1 && Object.hasOwn(obj1, key)  && !obj2) {
//         status = 'remove';
//       }
//       if (!obj1 && obj2 && Object.hasOwn(obj2, key) === true) {
//         status = 'add';
//       }
//     }
//     let value1 = '';
//     let value2 = '';
//     if (obj1 && typeof obj1 === 'object' && key in obj1) {
//       value1 = obj1[key];
//     }
//     if (obj2 && typeof obj2 === 'object' && key in obj2) {
//       value2 = obj2[key];
//     }
//     return [key, value1, value2, status];
//   });
//   return result;
// }


// const difference = (obj1, obj2, iter = 1) => {
//
//   const obj1keys = Object.keys(obj1);
//   const obj2keys = Object.keys(obj2);
//   const resultKeys = _.union(obj1keys, obj2keys).sort();
//   let result;
//   let status;
//   for (let i = 0; i < resultKeys.length; i += 1) {
//     const key = resultKeys[i];
//     if (typeof obj1[key] === "object"  && obj1[key] !== null) {
//       iter += 1;
//       difference(obj1[key], obj2[key], iter);
//     } else {
//       if (Object.hasOwn(obj1, key) === true && Object.hasOwn(obj2, key) === true) {
//         if (obj1[key] === obj2[key]) {
//           status = 'equal';
//         } else {
//           status = 'different';
//         }
//       }
//       if (Object.hasOwn(obj1, key) === true && Object.hasOwn(obj2, key) === false) {
//         status = 'remove';
//       }
//       if (Object.hasOwn(obj1, key) === false && Object.hasOwn(obj2, key) === true) {
//         status = 'add';
//       }
//     }
//     result += stylishIter(key, obj1[key], obj2[key], status, iter);
//   }
//   result += '}';
//   return result;
// };

const genDiff = (filePath1, filePath2) => {
  const fullPath1 = getFullPath(filePath1);
  const fullPath2 = getFullPath(filePath2);
  const data1 = getData(fullPath1);
  const data2 = getData(fullPath2);
  const diffFile = resultObjDif(data1, data2);
  const formatting = stylish(diffFile);
  return formatting;
};
export default genDiff;
