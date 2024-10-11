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
