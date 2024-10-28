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

const stylishIter = (obj, childContent, iter = 1) => {
  const replacer = '    ';
  const beforeSymbol = replacer.repeat(iter);
  const shortBeforeSymbol = beforeSymbol.slice(0, -2);
  const { status } = obj;
  const { key } = obj;

  const renderValue = (prefix, value, sign = '') => {
    if (value === null || typeof value !== 'object') {
      return `${prefix}${sign}${key}: ${value}\n`;
    }
    return `${prefix}${sign}${key}: {\n${printObj(value, iter + 1)}${beforeSymbol}}\n`;
  };

  if (status === 'equal') {
    return renderValue(beforeSymbol, obj.beforeValue);
  } if (status === 'remove') {
    return renderValue(shortBeforeSymbol, obj.beforeValue, '- ');
  } if (status === 'add') {
    return renderValue(shortBeforeSymbol, obj.beforeValue, '+ ');
  } if (status === 'different') {
    const before = renderValue(shortBeforeSymbol, obj.beforeValue, '- ');
    const after = renderValue(shortBeforeSymbol, obj.afterValue, '+ ');
    return `${before}${after}`;
  } if (status === 'difObject') {
    return `${beforeSymbol}${key}: {\n${childContent}${beforeSymbol}}\n`;
  }
  return 'error';
};

const gotoArr = (arr, iter = 1) => arr.reduce(
  (acc, obj) => {
    const childContent = obj.children ? gotoArr(obj.children, iter + 1) : '';
    return acc + stylishIter(obj, childContent, iter);
  },
  '',
);

const stylish = (resultAst) => `{\n${gotoArr(resultAst)}}`;

export default stylish;
