const stylishIter = (key, value1, value2 = ``, status, iter = 1) => {
    let replacer = '   ';
    let beforeSymbol = replacer.repeat(iter);
    let result = '';
    console.log('key:  ', key);
    console.log('res....... ', value1, value2, status, iter)
    switch (status) {
        case 'equal':
            result += `${beforeSymbol}${key}: ${value1}\n`;
            break;
        case 'different':
            beforeSymbol = beforeSymbol.slice(0, -2);
            result += `${beforeSymbol}- ${key}: ${value1}\n`;
            result += `${beforeSymbol}+ ${key}: ${value2}\n`;
            break;
        case 'add':
            beforeSymbol = beforeSymbol.slice(0, -2);
            result += `${beforeSymbol}+ ${key}: ${value2}\n`;
            break;
        case 'remove':
            beforeSymbol = beforeSymbol.slice(0, -2);
            result += `${beforeSymbol}- ${key}: ${value1}\n`;
            break;
        default:
            console.log('error');
            break;
    }
    result += '}';
    return result;
}

const stylish = (arr, iter = 1) => {
    console.log('arr: \n', arr);
    let result = '{\n';
    for (let item of arr) {
        const [key, value1, value2, status] = item;
        if (!Array.isArray(value1) && !Array.isArray(value2)) {
            result += stylishIter(key, value1, value2, status, iter);
        } else {
            iter += 1;
            result += stylishIter(key, value1, value2, status, iter);
        }
    }
}

export default stylish;