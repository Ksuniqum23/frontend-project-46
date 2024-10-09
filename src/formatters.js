const printObject = (obj, replacer, iter) => {
    // console.log(obj);
    iter += 1;
    let beforeSymbol = replacer.repeat(iter);
    const keys = Object.keys(obj);
    let result = keys.reduce((acc, key) => {
        const value = obj[key];
        if (typeof value === "object") {
            acc += `${beforeSymbol}${key}: {\n`;
            acc += printObject(value, replacer, iter);
            acc += `${beforeSymbol}}\n`;
        } else {
            `${beforeSymbol}${key}: ${value}\n`;
        }
        return acc;
        },
        '');
    return result;
}

const stylishIter = (key, value1, value2, status, iter = 1) => {
    let replacer = '    ';
    let beforeSymbol = replacer.repeat(iter);
    let result = '';

    switch (status) {
        // case undefined:
        //     result += printObject(value1, replacer, iter);
        //     break;
        case 'object':
            result += `${beforeSymbol}${key}: {\n`;
            iter += 1;
            result += gotoKeys(value1, iter);
            result += '\n'
            result += `${beforeSymbol}}\n`;
            break;
        case 'equal':
            if (typeof value1 === "object") {
                result += `${beforeSymbol}${key}: ${value1}\n`;
                iter += 1;
                result += printObject(value1, replacer, iter);
            } else {
                result += `${beforeSymbol}${key}: ${value1}\n`;
            }
            break;
        case 'different':
            beforeSymbol = beforeSymbol.slice(0, -2);
            result += `${beforeSymbol}- ${key}: ${value1}\n`;
            result += `${beforeSymbol}+ ${key}: ${value2}\n`;
            break;
        case 'add':
            if (typeof value2 === "object") {
                result += `${beforeSymbol}${key}: \n`;
                result += printObject(value2, replacer, iter);
            } else {
                result += `${beforeSymbol}${key}: ${value2}\n`;
            }
            // beforeSymbol = beforeSymbol.slice(0, -2);
            // result += `${beforeSymbol}+ ${key}: ${value2}\n`;
            break;
        case 'remove':
            if (typeof value1 === "object") {
                result += `${beforeSymbol}${key}: \n`;
                result += printObject(value1, replacer, iter);
            } else {
                result += `${beforeSymbol}${key}: ${value1}\n`;
            }
            // beforeSymbol = beforeSymbol.slice(0, -2);
            // result += `${beforeSymbol}- ${key}: ${value1}\n`;
            break;
        // case 'stringify':
        //     result += `${beforeSymbol}${key}: ${value1}  !!case 'stringify'\n`;
        //     break;
        default:
            // console.log('error');
            break;
    }
    return result;
}

const gotoKeys = (obj, iter = 1) => {
    const keys = Object.keys(obj);
    // console.log('ALL KEYS:   ', keys);
    // if (obj1.status === undefined) {
    //     const status = 'stringify';
    // }
    let result = keys.reduce((acc, key) => {
            const status = obj[key].status;
            const v1 = obj[key].v1;
            const v2 = obj[key].v2;
            acc += stylishIter(key, v1, v2, status, iter);
            return acc;
        },
        '');
    return result;
}


const stylish = (resultObj) => {
    let result = '{\n';
    result += gotoKeys(resultObj);
    result += '}'
    return result;
}

export default stylish;