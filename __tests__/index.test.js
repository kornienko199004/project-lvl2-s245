import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const genDiffTest = (first, second, filename, format = 'simple') => {
  const currentPath = path.resolve('__tests__/__fixtures__');
  const rightAnswer = fs.readFileSync(`${currentPath}/${filename}`, 'utf-8');
  return expect(genDiff(`${currentPath}/${first}`, `${currentPath}/${second}`, format)).toEqual(rightAnswer);
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

it('Test genDiff with json Ast Plain', () => {
  genDiffTest('beforeAst.json', 'afterAst.json', 'gendiffAnswerPlain.txt', 'plain');
});

it('Test genDiff with yml Ast Plain', () => {
  genDiffTest('beforeAst.yml', 'afterAst.yml', 'gendiffAnswerPlain.txt', 'plain');
});

it('Test genDiff with ini Ast Plain', () => {
  genDiffTest('beforeAst.ini', 'afterAst.ini', 'gendiffAnswerPlain.txt', 'plain');
});

it('Test genDiff with json Ast JSON', () => {
  genDiffTest('beforeAst.json', 'afterAst.json', 'gendiffAnswerJson.txt', 'json');
});

it('Test genDiff with yml Ast JSON', () => {
  genDiffTest('beforeAst.yml', 'afterAst.yml', 'gendiffAnswerJson.txt', 'json');
});

it('Test genDiff with ini Ast JSON', () => {
  genDiffTest('beforeAst.ini', 'afterAst.ini', 'gendiffAnswerJson.txt', 'json');
});
