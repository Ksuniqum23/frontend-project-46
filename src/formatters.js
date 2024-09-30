const stylishIter = (key, value1, value2 = ``, resultDiff, iter = 1) => {
    let replacer = '   ';
    let beforeSymbol = replacer.repeat(iter);
    let result = '';
    switch (resultDiff) {
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

const stylish = (obj1, obj2) => {
    let result = '{\n';
}

export default stylishIter;