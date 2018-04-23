import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const genDiffTest = (first, second, filename) => {
  const currentPath = path.resolve('__tests__/__fixtures__');
  const rightAnswer = fs.readFileSync(`${currentPath}/${filename}`, 'utf-8');
  return expect(genDiff(`${currentPath}/${first}`, `${currentPath}/${second}`)).toEqual(rightAnswer);
};

it('Test genDiff with json', () => {
  genDiffTest('before.json', 'after.json', 'gendiffAnswer.txt');
});