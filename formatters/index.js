import stylish from "./stylish.js";
import plain from "./plain.js";

const doFormatting = (file, formatType) => {
    if (formatType === 'stylish') {
        return stylish(file);
    } else if (formatType === 'plain') {
        return plain(file);
    } else {
        return 'error';
    }
}

export default doFormatting;