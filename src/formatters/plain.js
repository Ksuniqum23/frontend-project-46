const resultResponse = (pathToKey, beforeValue, afterValue, status) => {
  let result = '';
  let answer = '';
  let vNew = beforeValue;
  let v2new = afterValue;
  if (typeof beforeValue === 'string') {
    vNew = `'${beforeValue}'`;
  }
  if (beforeValue && typeof beforeValue === 'object') {
    vNew = '[complex value]';
  }
  if (typeof afterValue === 'string') {
    v2new = `'${afterValue}'`;
  }
  if (afterValue && typeof afterValue === 'object') {
    v2new = '[complex value]';
  }

  switch (status) {
    case 'equal':
      return '';

    case 'remove':
      answer = 'was removed';
      break;

    case 'add':
      answer = `was added with value: ${vNew}`;
      break;

    case 'different':
      answer = `was updated. From ${vNew} to ${v2new}`;
      break;

    default:
      console.log('error');
  }
  result += 'Property ';
  result += `'${pathToKey}' `;
  result += `${answer}\n`;
  return result;
};

const goToKeys = (obj, path = '') => {
  let result = '';
  const keys = Object.keys(obj);
  keys.forEach((key) => {
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
