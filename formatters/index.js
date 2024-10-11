import stylish from './stylish.js';
import plain from './plain.js';

const doFormatting = (file, formatType) => {
  if (formatType === 'stylish') {
    return stylish(file);
  } if (formatType === 'plain') {
    return plain(file);
  }
  return 'error';
};

export default doFormatting;
