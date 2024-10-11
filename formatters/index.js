import stylish from './stylish.js';
import plain from './plain.js';
import createJsonFile from './json.js';

const doFormatting = (file, formatType) => {
  if (formatType === 'stylish') {
    return stylish(file);
  }
  if (formatType === 'plain') {
    return plain(file);
  }
  if (formatType === 'json') {
    return createJsonFile(file);
  }
  return 'error';
};

export default doFormatting;
