import _ from 'lodash';

const resultObjDif = (obj1, obj2) => {
  const getKeys = (obj) => (obj && Object.keys(obj).length > 0 ? Object.keys(obj) : []);

  const obj1keys = getKeys(obj1);
  const obj2keys = getKeys(obj2);

  const resultKeys = _.union(obj1keys, obj2keys).sort();

  const result = resultKeys.reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (_.isEqual(value1, value2)) {
      acc[key] = {
        status: 'equal',
        beforeValue: value1,
      };
    }
    if (obj1.hasOwnProperty(key) && !obj2.hasOwnProperty(key)) {
      acc[key] = {
        status: 'remove',
        beforeValue: value1,
      };
    }
    if (!obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
      acc[key] = {
        status: 'add',
        beforeValue: value2,
      };
    }
    if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key) && (value1 !== value2)) {
      if (typeof value1 === 'object' && typeof value2 === 'object') {
        acc[key] = {
          status: 'difObject',
          beforeValue: resultObjDif(value1, value2),
        };
      } else {
        acc[key] = {
          status: 'different',
          beforeValue: value1,
          afterValue: value2,
        };
      }
    }
    return acc;
  }, {});
  return result;
};

export default resultObjDif;
