const printObj = (obj, iter = 1) => {
  const replacer = '    ';
  const beforeSymbol = replacer.repeat(iter);
  let result = '';
  Object.entries(obj).forEach(([key, value]) => {
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
  let result = '';

  const resultValue = `${value.v}`;
  const separator = ' '; // resultValue.length > 0 ? ' ' : '';
  let resultValue2;
  let separator2;
  let newIter;
  const { status } = value;

  switch (status) {
    case 'equal':
      if (value.v === null || typeof value.v !== 'object') {
        result += `${beforeSymbol}${key}:${separator}${resultValue}\n`;
      } else {
        result += `${beforeSymbol}${key}: {\n`;
        newIter = iter + 1;
        result += printObj(value.v, newIter);
        result += `${beforeSymbol}}\n`;
      }
      break;

    case 'remove':
      if (value.v === null || typeof value.v !== 'object') {
        result += `${shortBeforeSymbol}- ${key}:${separator}${resultValue}\n`;
      } else {
        result += `${shortBeforeSymbol}- ${key}: {\n`;
        newIter = iter + 1;
        result += printObj(value.v, newIter);
        result += `${beforeSymbol}}\n`;
      }
      break;

    case 'add':
      if (value.v === null || typeof value.v !== 'object') {
        result += `${shortBeforeSymbol}+ ${key}:${separator}${resultValue}\n`;
      } else {
        result += `${shortBeforeSymbol}+ ${key}: {\n`;
        newIter = iter + 1;
        result += printObj(value.v, newIter);
        result += `${beforeSymbol}}\n`;
      }
      break;

    case 'different':
      if (value.v === null || typeof value.v !== 'object') {
        result += `${shortBeforeSymbol}- ${key}:${separator}${resultValue}\n`;
      } else {
        result += `${shortBeforeSymbol}- ${key}: {\n`;
        newIter = iter + 1;
        result += printObj(value.v, newIter);
        result += `${beforeSymbol}}\n`;
      }

      resultValue2 = `${value.v2}`;
      separator2 = resultValue2.length > 0 ? ' ' : '';

      if (value.v2 === null || typeof value.v2 !== 'object') {
        result += `${shortBeforeSymbol}+ ${key}:${separator2}${resultValue2}\n`;
      } else {
        result += `${shortBeforeSymbol}+ ${key}: {\n`;
        newIter = iter + 1;
        result += printObj(value.v2, newIter);
        result += `${beforeSymbol}}\n`;
      }
      break;

    case 'difObject':
      result += `${beforeSymbol}${key}: {\n`;
      newIter = iter + 1;
      result += gotoKeys(value.v, newIter);
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
      return acc + stylishIter(key, value, iter);
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
