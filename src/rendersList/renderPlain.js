const transformValue = (v) => {
  if (!(v instanceof Object)) {
    return `'${v}'`;
  }
  return 'complex value';
};

const renderPlainAst = (ast, path = '') =>
  ast.reduce((acc, {
    name, newValue, oldValue, type, children,
  }) => {
    if (children.length > 0) {
      return [...acc, renderPlainAst(children, `${path}${name}.`).join('\n')];
    }
    const transformedValue = transformValue(newValue);
    const transformedOldValue = transformValue(oldValue);

    const strList = {
      changed: [...acc, `Property '${path}${name}' was updated. From ${transformedValue} to ${transformedOldValue}`],
      added: [...acc, `Property '${path}${name}' was added with value: ${transformedValue}`],
      removed: [...acc, `Property '${path}${name}' was removed`],
      unchanged: acc,
    };
    return strList[type];
  }, []);

export default renderPlainAst;
