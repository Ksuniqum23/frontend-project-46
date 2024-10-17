const stringify = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  return value;
};

const getAnswer = (status, beforeValue, afterValue) => {
  switch (status) {
    case 'equal':
      return '';

    case 'remove':
      return 'was removed';

    case 'add':
      return `was added with value: ${stringify(beforeValue)}`;

    case 'different':
      return `was updated. From ${stringify(beforeValue)} to ${stringify(afterValue)}`;

    default:
      console.log('error');
  }
};

const resultResponse = (pathToKey, beforeValue, afterValue, status) => `Property '${pathToKey}' ${getAnswer(status, beforeValue, afterValue)}\n`;

const goToKeys = (obj, path = '') => {
  let result = '';
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    if (obj[key].status !== 'equal') {
      const pathToKey = [path, key];
      let pathToKeyStr = pathToKey.join('.').trim();

      if (pathToKeyStr[0] === '.') {
        pathToKeyStr = pathToKeyStr.slice(1);
      }

      if (obj[key].status === 'difObject') {
        result += goToKeys(obj[key].children, pathToKeyStr);
      } else {
        result += resultResponse(pathToKeyStr, obj[key].beforeValue, obj[key].afterValue, obj[key].status);
      }
    }
  });
  return result;
};

const plain = (resultObj) => {
  let result = goToKeys(resultObj);
  if (result.endsWith('\n')) {
    result = result.slice(0, -1);
  }
  return result;
};

export default plain;
