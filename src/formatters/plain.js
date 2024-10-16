const resultResponce = (pathToKey, v, v2, status) => {
  let result = '';
  let answer = '';
  let vNew = v;
  let v2new = v2;
  if (typeof v === 'string') {
    vNew = `'${v}'`;
  }
  if (v && typeof v === 'object') {
    vNew = '[complex value]';
  }
  if (typeof v2 === 'string') {
    v2new = `'${v2}'`;
  }
  if (v2 && typeof v2 === 'object') {
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
      result += goToKeys(obj[key].v, pathToKeyStr);
    } else {
      result += resultResponce(pathToKeyStr, obj[key].v, obj[key].v2, obj[key].status);
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
