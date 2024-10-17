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
      return 'error';
  }
};

const resultResponse = (pathToKey, beforeValue, afterValue, status) => `Property '${pathToKey}' ${getAnswer(status, beforeValue, afterValue)}\n`;

const plain = (obj, path = '') => {
  const result = [];
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    if (obj[key].status !== 'equal') {
      const pathToKey = [path, key];
      const pathToKeyStr = pathToKey.join('.').trim().replace(/^\./, '');

      if (obj[key].status !== 'difObject') {
        const value1 = obj[key].beforeValue;
        const value2 = obj[key].afterValue;
        result.push(resultResponse(pathToKeyStr, value1, value2, obj[key].status));
      } else {
        result.push(plain(obj[key].children, pathToKeyStr));
      }
    }
  });
  return result.join('');
};

export default plain;
