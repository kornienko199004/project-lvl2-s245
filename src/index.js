import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParser from './parser';

export default (first, second) => {
  const file1 = fs.readFileSync(first, 'utf-8');
  const file2 = fs.readFileSync(second, 'utf-8');
  const extName1 = path.extname(first);
  const extName2 = path.extname(second);
  const parserer1 = getParser(extName1);
  const parserer2 = getParser(extName2);

  const obj1 = parserer1(file1);
  const obj2 = parserer2(file2);

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
