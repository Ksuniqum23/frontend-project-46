const stylishIter = (key, value1, value2, status, iter = 1) => {
    let replacer = '    ';
    let beforeSymbol = replacer.repeat(iter);
    let result = '';

    switch (status) {
        // case undefined:
        //     result += `${beforeSymbol}${key}: { !!!!!undefined\n`;
        //     iter += 1;
        //     result += JSON.stringify(value1, null, 2);
        //     result += '\n'
        //     result += `${beforeSymbol}}\n`;
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
                result += gotoKeys(value1, iter);
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
                iter += 1;
                console.log('we are in v2 = object, v2= ', value2);
                result += gotoKeys(value2, iter);
            } else {
                result += `${beforeSymbol}${key}: ${value2}\n`;
            }
            // beforeSymbol = beforeSymbol.slice(0, -2);
            // result += `${beforeSymbol}+ ${key}: ${value2}\n`;
            break;
        case 'remove':
            if (typeof value1 === "object") {
                result += `${beforeSymbol}${key}: \n`;
                iter += 1;
                result += gotoKeys(value1, iter);
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
            console.log('error');
            break;
    }
    return result;
}

const gotoKeys = (obj, iter = 1) => {
    const keys = Object.keys(obj);
    console.log('ALL KEYS:   ', keys);
    // if (obj1.status === undefined) {
    //     const status = 'stringify';
    // }
    let result = keys.reduce((acc, key) => {
        let status;
        if (obj[key].status !== undefined) {
            status = obj[key].status;
            const v1 = obj[key].v1;
            const v2 = obj[key].v2;
            acc += stylishIter(key, v1, v2, status, iter);
        } else {
            console.log('else!!! \n');
            acc += JSON.stringify(obj[key], null, 2);
            console.log('else >>>> \n');
        }

        // console.log('DATA: ', key, v1, v2, status, iter);

        return acc;
    }, '');
    return result;
}


const stylish = (resultObj) => {
    let result = '{\n';
    result += gotoKeys(resultObj);
    result += '}'
    return result;
}

export default stylish;