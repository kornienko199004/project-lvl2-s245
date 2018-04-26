import fs from 'fs';
import path from 'path';
import getParser from './parser';
import getRender from './renders';
import parseAst from './parserAst';

export default (first, second, format) => {
  const file1 = fs.readFileSync(first, 'utf-8');
  const file2 = fs.readFileSync(second, 'utf-8');
  const extName1 = path.extname(first);
  const extName2 = path.extname(second);
  const parse1 = getParser(extName1);
  const parse2 = getParser(extName2);
  const obj1 = parse1(file1);
  const obj2 = parse2(file2);
  const render = getRender(format);
  const renderOutput = render(parseAst(obj1, obj2));

  const visualPresentation = {
    simple: arg => `{\n${arg.join('\n')}\n}`,
    plain: arg => `${arg.join('\n')}`,
    json: arg => arg,
  };
  return visualPresentation[format](renderOutput);
};
