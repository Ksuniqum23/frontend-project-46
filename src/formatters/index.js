import buildStylish from './buildStylish.js';
import buildPlain from './buildPlain.js';
import buildJson from './buildJson.js';

const doFormatting = (ast, formatType) => {
  if (formatType === 'stylish') {
    return buildStylish(ast);
  }
  if (formatType === 'plain') {
    return buildPlain(ast);
  }
  if (formatType === 'json') {
    return buildJson(ast);
  }
  return 'error';
};

export default doFormatting;
