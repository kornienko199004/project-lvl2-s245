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

it('Test genDiff with yml', () => {
  genDiffTest('before.yml', 'after.yml', 'gendiffAnswer.txt');
});

it('Test genDiff with ini', () => {
  genDiffTest('before.ini', 'after.ini', 'gendiffAnswer.txt');
});

it('Test genDiff with json Ast', () => {
  genDiffTest('beforeAst.json', 'afterAst.json', 'gendiffAnswerAst.txt');
});

it('Test genDiff with yml Ast', () => {
  genDiffTest('beforeAst.yml', 'afterAst.yml', 'gendiffAnswerAst.txt');
});

it('Test genDiff with ini Ast', () => {
  genDiffTest('beforeAst.ini', 'afterAst.ini', 'gendiffAnswerAst.txt');
});
