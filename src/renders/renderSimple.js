import _ from 'lodash';

const transformValue = (v) => {
  if (!(v instanceof Object)) {
    return v;
  }
  return `{\n${Object.keys(v).reduce((acc, key) => `${acc} ${key}: ${v[key]}\n`, '')} }`;
};

const renderSimpleAst = (ast) => {
  const result = ast.map(({
    name, newValue, oldValue, type, children,
  }) => {
    if (type === 'root') {
      return `${name}: {\n${renderSimpleAst(children).join('\n')}\n}`;
    }
    const transformedValue = transformValue(newValue);
    const transformedOldValue = transformValue(oldValue);

    const strList = {
      changed: [`+${name}: ${transformedOldValue}`, `-${name}: ${transformedValue}`],
      added: `+${name}: ${transformedValue}`,
      removed: `-${name}: ${transformedValue}`,
      unchanged: ` ${name}: ${transformedOldValue}`,
    };
    return strList[type];
  });
  return _.flatten(result);
};

export default renderSimpleAst;
