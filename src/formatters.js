// import {value} from "lodash/seq.js";

// const printObject = (obj, replacer, iter) => {
//     // console.log(obj);
//     iter += 1;
//     let beforeSymbol = replacer.repeat(iter);
//     const keys = Object.keys(obj);
//     let result = keys.reduce((acc, key) => {
//         const value = obj[key];
//         if (typeof value === "object") {
//             acc += `${beforeSymbol}${key}: {\n`;
//             acc += printObject(value, replacer, iter);
//             acc += `${beforeSymbol}}\n`;
//         } else {
//             `${beforeSymbol}${key}: ${value}\n`;
//         }
//         return acc;
//         },
//         '');
//     return result;
// }

// !!!______OLD
// const stylishIter = (key, value1, value2, status, iter = 1) => {
//     let replacer = '    ';
//     let beforeSymbol = replacer.repeat(iter);
//     let result = '';
//
//     switch (status) {
//         // case undefined:
//         //     result += printObject(value1, replacer, iter);
//         //     break;
//         case 'object':
//             result += `${beforeSymbol}${key}: {\n`;
//             iter += 1;
//             result += gotoKeys(value1, iter);
//             result += '\n'
//             result += `${beforeSymbol}}\n`;
//             break;
//         case 'equal':
//             if (typeof value1 === "object") {
//                 result += `${beforeSymbol}${key}: ${value1}\n`;
//                 iter += 1;
//                 result += printObject(value1, replacer, iter);
//             } else {
//                 result += `${beforeSymbol}${key}: ${value1}\n`;
//             }
//             break;
//         case 'different':
//             beforeSymbol = beforeSymbol.slice(0, -2);
//             result += `${beforeSymbol}- ${key}: ${value1}\n`;
//             result += `${beforeSymbol}+ ${key}: ${value2}\n`;
//             break;
//         case 'add':
//             if (typeof value2 === "object") {
//                 result += `${beforeSymbol}${key}: \n`;
//                 result += printObject(value2, replacer, iter);
//             } else {
//                 result += `${beforeSymbol}${key}: ${value2}\n`;
//             }
//             // beforeSymbol = beforeSymbol.slice(0, -2);
//             // result += `${beforeSymbol}+ ${key}: ${value2}\n`;
//             break;
//         case 'remove':
//             if (typeof value1 === "object") {
//                 result += `${beforeSymbol}${key}: \n`;
//                 result += printObject(value1, replacer, iter);
//             } else {
//                 result += `${beforeSymbol}${key}: ${value1}\n`;
//             }
//             // beforeSymbol = beforeSymbol.slice(0, -2);
//             // result += `${beforeSymbol}- ${key}: ${value1}\n`;
//             break;
//         // case 'stringify':
//         //     result += `${beforeSymbol}${key}: ${value1}  !!case 'stringify'\n`;
//         //     break;
//         default:
//             // console.log('error');
//             break;
//     }
//     return result;
// }
const printObj = (obj, iter = 1) => {
  const replacer = '    ';
  const beforeSymbol = replacer.repeat(iter);
  let result = '';
  for (const [key, value] of Object.entries(obj)) {
    if (value === null || typeof value !== 'object') {
      result += `${beforeSymbol}${key}: ${`${value}`}\n`;
    } else {
      result += `${beforeSymbol}${key}: {\n`;
      iter += 1;
      result += printObj(value, iter);
      result += `${beforeSymbol}}\n`;
    }
  }
  return result;
};

const stylishIter = (key, value, iter = 1) => {
  const replacer = '    ';
  const beforeSymbol = replacer.repeat(iter);
  const shortBeforeSymbol = beforeSymbol.slice(0, -2);
  let result = '';

  const resultValue = `${value.v}`;
  const separator = resultValue.length > 0 ? ' ' : '';

  const { status } = value;
  switch (status) {
    case 'equal':
      if (value.v === null || typeof value.v !== 'object') {
        result += `${beforeSymbol}${key}:${separator}${resultValue}\n`;
      } else {
        result += `${beforeSymbol}${key}: {\n`;
        iter += 1;
        result += printObj(value.v, iter);
        result += `${beforeSymbol}}\n`;
      }
      break;
    case 'remove':
      if (value.v === null || typeof value.v !== 'object') {
        result += `${shortBeforeSymbol}- ${key}:${separator}${resultValue}\n`;
      } else {
        result += `${shortBeforeSymbol}- ${key}: {\n`;
        iter += 1;
        result += printObj(value.v, iter);
        result += `${beforeSymbol}}\n`;
      }
      break;

    case 'add':
      if (value.v === null || typeof value.v !== 'object') {
        result += `${shortBeforeSymbol}+ ${key}:${separator}${resultValue}\n`;
      } else {
        result += `${shortBeforeSymbol}+ ${key}: {\n`;
        iter += 1;
        result += printObj(value.v, iter);
        result += `${beforeSymbol}}\n`;
      }
      break;

    case 'different':
      if (value.v === null || typeof value.v !== 'object') {
        result += `${shortBeforeSymbol}- ${key}:${separator}${resultValue}\n`;
      } else {
        result += `${shortBeforeSymbol}- ${key}: {\n`;
        iter += 1;
        result += printObj(value.v, iter);
        result += `${beforeSymbol}}\n`;
      }

      const resultValue2 = `${value.v2}`;
      const separator2 = resultValue2.length > 0 ? ' ' : '';

      if (value.v2 === null || typeof value.v2 !== 'object') {
        result += `${shortBeforeSymbol}+ ${key}:${separator2}${resultValue2}\n`;
      } else {
        result += `${shortBeforeSymbol}+ ${key}: {\n`;
        iter += 1;
        result += printObj(value.v2, iter);
        result += `${beforeSymbol}}\n`;
      }
      break;

    case 'difObject':
      result += `${beforeSymbol}${key}: {\n`;
      iter += 1;
      result += gotoKeys(value.v, iter);
      result += `${beforeSymbol}}\n`;
      break;
    default:
      console.log('error');
      break;
  }
  return result;
};

const gotoKeys = (obj, iter = 1) => {
  const keys = Object.keys(obj);
  const result = keys.reduce(
    (acc, key) => {
      const value = obj[key];
      acc += stylishIter(key, value, iter);
      return acc;
    },
    '',
  );
  return result;
};

const stylish = (resultObj) => {
  let result = '{\n';
  result += gotoKeys(resultObj);
  result += '}';
  return result;
};

export default stylish;
