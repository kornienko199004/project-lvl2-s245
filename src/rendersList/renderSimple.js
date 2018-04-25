import _ from 'lodash';

const transformValue = (v) => {
  if (!(v instanceof Object)) {
    return v;
  }
  return `{\n${Object.keys(v).reduce((acc, key) => `${acc} ${key}: ${v[key]}\n`, '')} }`;
};

const renderSimpleAst = (ast) => {
  const result = ast.reduce((acc, {
    name, newValue, oldValue, type, children,
  }) => {
    if (children.length > 0) {
      return [...acc, `${name}: {\n${renderSimpleAst(children).join('\n')}\n}`];
    }
    const transformedValue = transformValue(newValue);
    const transformedOldValue = transformValue(oldValue);

    const strList = {
      changed: [...acc, [`+${name}: ${transformedOldValue}`, `-${name}: ${transformedValue}`]],
      added: [...acc, `+${name}: ${transformedValue}`],
      removed: [...acc, `-${name}: ${transformedValue}`],
      unchanged: [...acc, ` ${name}: ${transformedOldValue}`],
    };
    return strList[type];
  }, []);
  return _.flatten(result);
};

export default renderSimpleAst;
