import _ from 'lodash';

const resultAst = (obj1, obj2) => {
  const resultKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  return resultKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (_.isEqual(value1, value2)) {
      return {
        key,
        status: 'equal',
        beforeValue: value1,
      };
    }
    const hasKeyInObj1 = _.has(obj1, key);
    const hasKeyInObj2 = _.has(obj2, key);

    if (hasKeyInObj1 && !hasKeyInObj2) {
      return {
        key,
        status: 'remove',
        beforeValue: value1,
      };
    }

    if (!hasKeyInObj1 && hasKeyInObj2) {
      return {
        key,
        status: 'add',
        beforeValue: value2,
      };
    }

    if (hasKeyInObj1 && hasKeyInObj2 && (value1 !== value2)) {
      if (typeof value1 === 'object' && typeof value2 === 'object') {
        return {
          key,
          status: 'difObject',
          children: resultAst(value1, value2),
        };
      }
      return {
        key,
        status: 'different',
        beforeValue: value1,
        afterValue: value2,
      };
    }
  });
};

export default resultAst;
