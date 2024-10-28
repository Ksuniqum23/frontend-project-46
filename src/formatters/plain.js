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

const goToArr = (arr, path = '') => arr
  .filter((item) => item.status !== 'equal')
  .map((obj) => {
    const pathToKey = [path, obj.key];
    const pathToKeyStr = pathToKey.join('.').trim().replace(/^\./, '');

    if (obj.status === 'difObject') {
      return goToArr(obj.children, pathToKeyStr);
    }
    const value1 = obj.beforeValue;
    const value2 = obj.afterValue;
    return resultResponse(pathToKeyStr, value1, value2, obj.status);
  })
  .join('');

const plain = (resultAst) => goToArr(resultAst).replace(/\n$/, '');

export default plain;
