const goToKeys = (obj, path = '') => {
  let result = '';
  const keys = Object.keys(obj);
  for (const key of keys) {
    const pathToKey = [];
    pathToKey.push(path);
    pathToKey.push(key);
    let pathToKeyStr = pathToKey.join('.').trim();
    if (pathToKeyStr[0] === '.') {
      pathToKeyStr = pathToKeyStr.slice(1);
    }
    if (obj[key].status === 'difObject') {
      result += goToKeys(obj[key].v, pathToKeyStr);
    } else {
      result += resultResponce(pathToKeyStr, obj[key].v, obj[key].v2, obj[key].status);
    }
  }
  return result;
};

const resultResponce = (pathToKey, v, v2, status) => {
  let result = '';
  let answer = '';

  if (typeof v === 'string') {
    v = `'${v}'`;
  }
  if (v && typeof v === 'object') {
    v = '[complex value]';
  }
  if (v2 && typeof v2 === 'string') {
    v2 = `'${v2}'`;
  }
  if (v2 && typeof v2 === 'object') {
    v2 = '[complex value]';
  }

  switch (status) {
    case 'equal':
      return '';

    case 'remove':
      answer = 'was removed';
      break;

    case 'add':
      answer = `was added with value: ${v}`;
      break;

    case 'different':
      answer = `was updated. From ${v} to ${v2}`;
      break;
  }
  result += 'Property ';
  result += `'${pathToKey}' `;
  result += `${answer}\n`;
  return result;
};

const plain = (resultObj) => goToKeys(resultObj);

export default plain;
