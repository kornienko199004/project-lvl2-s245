import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import getParser from './parser';

export default (first, second) => {
  const file1 = fs.readFileSync(first, 'utf-8');
  const file2 = fs.readFileSync(second, 'utf-8');
  const extName1 = path.extname(first);
  const extName2 = path.extname(second);
  const parse1 = getParser(extName1);
  const parse2 = getParser(extName2);

  const obj1 = parse1(file1);
  const obj2 = parse2(file2);

  const result = _.union(Object.keys(obj1), Object.keys(obj2))
    .map((key) => {
      if (_.has(obj1, key) && _.has(obj2, key)) {
        return obj1[key] === obj2[key] ? ` ${key}: ${obj1[key]}` : [`+${key}: ${obj2[key]}`, `-${key}: ${obj1[key]}`];
      } else if (!_.has(obj1, key) && _.has(obj2, key)) {
        return `+${key}: ${obj2[key]}`;
      }
      return `-${key}: ${obj1[key]}`;
    });
  return `{\n${_.flatten(result).join('\n')}\n}`;
};
