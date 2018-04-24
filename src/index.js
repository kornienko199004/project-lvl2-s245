import fs from 'fs';
import path from 'path';
import getParser from './parser';
import render from './render';
import parseAst from './parserAst';

export default (first, second) => {
  const file1 = fs.readFileSync(first, 'utf-8');
  const file2 = fs.readFileSync(second, 'utf-8');
  const extName1 = path.extname(first);
  const extName2 = path.extname(second);
  const parse1 = getParser(extName1);
  const parse2 = getParser(extName2);

  const obj1 = parse1(file1);
  const obj2 = parse2(file2);
  return `{\n${render(parseAst(obj1, obj2)).join('\n')}\n}`;
};
