import _ from 'lodash';

const parseAst = (data1, data2) => {
  const ast = _.union(Object.keys(data1), Object.keys(data2)).reduce((acc, key) => {
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] instanceof Object && data2[key] instanceof Object) {
        return [...acc, {
          name: key, newValue: '', oldValue: '', type: 'root', children: parseAst(data1[key], data2[key]),
        }];
      } else if (data1[key] === data2[key]) {
        return [...acc, {
          name: key, newValue: '', oldValue: data1[key], type: 'unchanged',
        }];
      }
      return [...acc, {
        name: key, newValue: data1[key], oldValue: data2[key], type: 'changed',
      }];
    } else if (!_.has(data1, key)) {
      return [...acc, {
        name: key, newValue: data2[key], oldValue: '', type: 'added',
      }];
    }
    return [...acc, {
      name: key, newValue: data1[key], oldValue: '', type: 'removed',
    }];
  }, []);
  return ast;
};

export default parseAst;
