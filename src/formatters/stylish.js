const printObj = (obj, iter = 1) => {
  const replacer = '    ';
  const beforeSymbol = replacer.repeat(iter);

  return Object.entries(obj || {}).map(([key, value]) => {
    if (value === null || typeof value !== 'object') {
      return `${beforeSymbol}${key}: ${value}\n`;
    }
    return `${beforeSymbol}${key}: {\n${printObj(value, iter + 1)}${beforeSymbol}}\n`;
  }).join('');
};

const stylishIter = (key, value, iter = 1, childContent = '') => {
  const replacer = '    ';
  const beforeSymbol = replacer.repeat(iter);
  const shortBeforeSymbol = beforeSymbol.slice(0, -2);
  const { status } = value;
  const renderValue = (prefix, val, sign = '') => {
    if (val === null || typeof val !== 'object') {
      return `${prefix}${sign}${key}: ${val}\n`;
    }
    return `${prefix}${sign}${key}: {\n${printObj(val, iter + 1)}${beforeSymbol}}\n`;
  };
  if (status === 'equal') {
    return renderValue(beforeSymbol, value.beforeValue);
  } if (status === 'remove') {
    return renderValue(shortBeforeSymbol, value.beforeValue, '- ');
  } if (status === 'add') {
    return renderValue(shortBeforeSymbol, value.beforeValue, '+ ');
  } if (status === 'different') {
    const before = renderValue(shortBeforeSymbol, value.beforeValue, '- ');
    const after = renderValue(shortBeforeSymbol, value.afterValue, '+ ');
    return `${before}${after}`;
  } if (status === 'difObject') {
    return `${beforeSymbol}${key}: {\n${childContent}${beforeSymbol}}\n`;
  }
  return 'error';
};

const gotoKeys = (obj, iter = 1) => {
  if (!obj) {
    return '';
  }
  const keys = Object.keys(obj);
  return keys.reduce(
    (acc, key) => {
      const value = obj[key];
      const childContent = gotoKeys(value.children, iter + 1);
      return acc + stylishIter(key, value, iter, childContent);
    },
    '',
  );
};

const stylish = (resultObj) => {
  const result = `{\n${gotoKeys(resultObj)}}`;
  console.log(result);
  return result;
};

export default stylish;
