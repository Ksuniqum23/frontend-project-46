const printObj = (obj, iter = 1) => {
  const replacer = '    ';
  const beforeSymbol = replacer.repeat(iter);
  let result = '';
  Object.entries(obj || {}).forEach(([key, value]) => {
    if (value === null || typeof value !== 'object') {
      result += `${beforeSymbol}${key}: ${value}\n`;
    } else {
      result += `${beforeSymbol}${key}: {\n`;
      const newIter = iter + 1;
      result += printObj(value, newIter);
      result += `${beforeSymbol}}\n`;
    }
  });
  return result;
};

const stylishIter = (key, value, iter = 1) => {
  const replacer = '    ';
  const beforeSymbol = replacer.repeat(iter);
  const shortBeforeSymbol = beforeSymbol.slice(0, -2);
  const { status } = value;
  const valueIsNoObject = (value) => value === null || typeof value !== 'object';

  if (status === 'equal') {
    return valueIsNoObject(value.beforeValue)
      ? `${beforeSymbol}${key}: ${value.beforeValue}\n`
      : `${beforeSymbol}${key}: {\n${printObj(value.beforeValue, iter + 1)}${beforeSymbol}}\n`;
  } if (status === 'remove') {
    return valueIsNoObject(value.beforeValue)
      ? `${shortBeforeSymbol}- ${key}: ${value.beforeValue}\n`
      : `${shortBeforeSymbol}- ${key}: {\n${printObj(value.beforeValue, iter + 1)}${beforeSymbol}}\n`;
  } if (status === 'add') {
    return valueIsNoObject(value.beforeValue)
      ? `${shortBeforeSymbol}+ ${key}: ${value.beforeValue}\n`
      : `${shortBeforeSymbol}+ ${key}: {\n${printObj(value.beforeValue, iter + 1)}${beforeSymbol}}\n`;
  } if (status === 'different') {
    const getPrefix = (key, sign) => `${shortBeforeSymbol}${sign} ${key}: `;
    const before = valueIsNoObject(value.beforeValue)
      ? `${getPrefix(key, '-')}${value.beforeValue}\n`
      : `${getPrefix(key, '-')}{\n${printObj(value.beforeValue, iter + 1)}${beforeSymbol}}\n`;
    const after = valueIsNoObject(value.afterValue)
      ? `${getPrefix(key, '+')}${value.afterValue}\n`
      : `${getPrefix(key, '+')}{\n${printObj(value.afterValue, iter + 1)}${beforeSymbol}}\n`;
    return `${before}${after}`;
  } if (status === 'difObject') {
    return `${beforeSymbol}${key}: {\n${gotoKeys(value.children, iter + 1)}${beforeSymbol}}\n`;
  }
  return 'error';
};

const gotoKeys = (obj, iter = 1) => {
  const keys = Object.keys(obj);
  return keys.reduce(
    (acc, key) => {
      const value = obj[key];
      return acc + stylishIter(key, value, iter);
    },
    '',
  );
};

const stylish = (resultObj) => `{\n${gotoKeys(resultObj)}}`;

export default stylish;
