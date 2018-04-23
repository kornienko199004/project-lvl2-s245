import fs from 'fs';
import _ from 'lodash';

export default (first, second) => {
  const file1 = fs.readFileSync(first, 'utf-8');
  const file2 = fs.readFileSync(second, 'utf-8');

  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);

  const result = _.union(Object.keys(obj1), Object.keys(obj2))
    .map((key) => {
      let value;
      if (_.has(obj1, key) && _.has(obj2, key)) {
        value = obj1[key] === obj2[key] ? ` ${key}: ${obj1[key]} \n` : `+${key}: ${obj2[key]} \n-${key}: ${obj1[key]} \n`;
      } else if (!_.has(obj1, key) && _.has(obj2, key)) {
        value = `+${key}: ${obj2[key]} \n`;
      } else {
        value = `-${key}: ${obj1[key]} \n`;
      }
      return value;
    }).join('');
  return `{ \n${result} }`;
};
