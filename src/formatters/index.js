import stylish from './stylish.js';
import plain from './plain.js';
import createJsonFile from './json.js';

const doFormatting = (ast, formatType) => {
  if (formatType === 'stylish') {
    return stylish(ast);
  }
  if (formatType === 'plain') {
    return plain(ast);
  }
  if (formatType === 'json') {
    return createJsonFile(ast);
  }
  return 'error';
};

export default doFormatting;
