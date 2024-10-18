import _ from 'lodash';

const checkProp = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

const resultObjDif = (obj1, obj2) => {
  const getKeys = (obj) => (obj && Object.keys(obj).length > 0 ? Object.keys(obj) : []);

  const obj1keys = getKeys(obj1);
  const obj2keys = getKeys(obj2);

  // eslint-disable-next-line fp/no-mutating-methods
  const resultKeys = _.union(obj1keys, obj2keys).sort();

  return resultKeys.reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.isEqual(value1, value2)) {
      return {
        ...acc,
        [key]: {
          status: 'equal',
          beforeValue: value1,
        },
      };
    }

    const hasKeyInObj1 = checkProp(obj1, key);
    const hasKeyInObj2 = checkProp(obj2, key);

    if (hasKeyInObj1 && !hasKeyInObj2) {
      return {
        ...acc,
        [key]: {
          status: 'remove',
          beforeValue: value1,
        },
      };
    }

    if (!hasKeyInObj1 && hasKeyInObj2) {
      return {
        ...acc,
        [key]: {
          status: 'add',
          beforeValue: value2,
        },
      };
    }

    if (hasKeyInObj1 && hasKeyInObj2 && (value1 !== value2)) {
      if (typeof value1 === 'object' && typeof value2 === 'object') {
        return {
          ...acc,
          [key]: {
            status: 'difObject',
            children: resultObjDif(value1, value2),
          },
        };
      }
      return {
        ...acc,
        [key]: {
          status: 'different',
          beforeValue: value1,
          afterValue: value2,
        },
      };
    }
    return acc;
  }, {});
};

export default resultObjDif;
