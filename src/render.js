const transformValue = (v) => {
  const output = v instanceof Object ? `{\n${Object.keys(v).reduce((acc, key) => `${acc} ${key}: ${v[key]}\n`, '')} }` : v;
  return output;
};

const renderAst = ast =>
  ast.map(({
    name, value, oldValue, type, children,
  }) => {
    if (children) {
      return `${name}: {\n${renderAst(children).join('\n')}\n}`;
    }
    const transformedValue = transformValue(value);
    const transformedOldValue = transformValue(oldValue);

    const strList = {
      changed: `+${name}: ${transformedOldValue}\n-${name}: ${transformedValue}`,
      added: `+${name}: ${transformedValue}`,
      removed: `-${name}: ${transformedValue}`,
      unchanged: ` ${name}: ${transformedValue}`,
    };
    return strList[type];
  });

export default renderAst;
