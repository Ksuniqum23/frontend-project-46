const stringify = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  return value;
};

// eslint-disable-next-line fp/no-nil
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

const goToKeys = (obj, path = '') => Object.keys(obj)
  .filter((key) => obj[key].status !== 'equal')
  .map((key) => {
    const pathToKey = [path, key];
    const pathToKeyStr = pathToKey.join('.').trim().replace(/^\./, '');

    if (obj[key].status === 'difObject') {
      return goToKeys(obj[key].children, pathToKeyStr);
    }
    const value1 = obj[key].beforeValue;
    const value2 = obj[key].afterValue;
    return resultResponse(pathToKeyStr, value1, value2, obj[key].status);
  })
  .join('');

const plain = (resultObj) => goToKeys(resultObj).replace(/\n$/, '');
export default plain;
