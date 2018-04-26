import _ from 'lodash';

const transformValue = (v) => {
  if (!(v instanceof Object)) {
    return v;
  }
  return `{\n${Object.keys(v).reduce((acc, key) => `${acc} ${key}: ${v[key]}\n`, '')} }`;
};

const renderSimpleAst = (ast) => {
  const renderIter = (data) => {
    const result = data.map(({
      name, newValue, oldValue, type, children = [],
    }) => {
      const transformedValue = transformValue(newValue);
      const transformedOldValue = transformValue(oldValue);
      const strList = {
        root: `${name}: {\n${renderIter(children).join('\n')}\n}`,
        changed: [`+${name}: ${transformedOldValue}`, `-${name}: ${transformedValue}`],
        added: `+${name}: ${transformedValue}`,
        removed: `-${name}: ${transformedValue}`,
        unchanged: ` ${name}: ${transformedOldValue}`,
      };
      return strList[type];
    });
    return _.flatten(result);
  };
  return `{\n${renderIter(ast).join('\n')}\n}`;
};

export default renderSimpleAst;
