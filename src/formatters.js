const stylishIter = (key, value1, value2, status, iter = 1) => {
    let replacer = '    ';
    let beforeSymbol = replacer.repeat(iter);
    let result = '';

    switch (status) {
        case 'object':
            result += `${beforeSymbol}${key}: {\n`;
            iter += 1;
            result += gotoKeys(value1, iter);
            result += `${beforeSymbol}}\n`;
            break;
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
    return result;
}

const gotoKeys = (obj, iter = 1) => {
    const keys = Object.keys(obj);
    let result = keys.reduce((acc, key) => {
        const status = obj[key].status;
        const v1 = obj[key].v1;
        const v2 = obj[key].v2;
        if (status === 'object') {
            acc += stylishIter(key, v1, v2, status, iter);
        }
        if (status !== 'object') {
            acc += stylishIter(key, v1, v2, status, iter);
        }
        return acc;
    }, '');
    return result;
}

// const stylishObj = (resultObj, iter = 1) => {
//     const keys = Object.keys(resultObj);
//     let result = '{\n';
//     result += keys.reduce((acc, key) => {
//         const status = resultObj[key].status;
//         const v1 = resultObj[key].v1;
//         const v2 = resultObj[key].v2;
//         if (status === 'object') {
//             acc += stylishIter(key, v1, v2, status, iter);
//             iter += 1;
//             acc +=
//         if (status !== 'object') {
//             acc += stylishIter(key, v1, v2, status, iter);
//         } else {
//             iter += 1;
//             acc += stylish(v1, iter);
//         }
//         return acc;
//     }, '');
//     return result;
// }

const stylish = (resultObj) => {
    let result = '{\n';
    result += gotoKeys(resultObj);
    result += '}'
    return result;
}


    // for (let key of keys) {
    //     if (status === 'object') {
    //         iter += 1;
    //         result += stylish(resultObj[key])
    //     }
    //     if ( status !== 'object') {
    //         const v1 = resultObj[key][v1];
    //         const v2 = resultObj[key][v2];
    //         const status = resultObj[key][status];
    //         result = stylishIter(key, v1, v2, status, iter);
    //     }
    // }
// }

export default stylish;