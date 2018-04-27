import _ from 'lodash';

const space = number => ' '.repeat(number);
const transformValue = v => (number) => {
  if (!(v instanceof Object)) {
    return v;
  }
  return `{\n${Object.keys(v).reduce((acc, key) => `${acc}${space(number + 4)}${key}: ${v[key]}\n`, '')}${space(number)}}`;
};
const renderSimpleAst = (ast) => {
  const renderIter = (data, num) => {
    const result = data.map(({
      name, newValue, oldValue, type, children = [],
    }) => {
      const transformedValue = transformValue(newValue)(num);
      const transformedOldValue = transformValue(oldValue)(num);
      const strList = {
        root: `${space(num)}${name}: {\n${renderIter(children, num + 4).join('\n')}\n${space(num)}}`,
        changed: [`${space(num - 2)}+ ${name}: ${transformedOldValue}`, `${space(num - 2)}- ${name}: ${transformedValue}`],
        added: `${space(num - 2)}+ ${name}: ${transformedValue}`,
        removed: `${space(num - 2)}- ${name}: ${transformedValue}`,
        unchanged: `${space(num - 2)}  ${name}: ${transformedOldValue}`,
      };
      return strList[type];
    });
    return _.flatten(result);
  };
  return `{\n${renderIter(ast, 4).join('\n')}\n}`;
};

export default renderSimpleAst;
