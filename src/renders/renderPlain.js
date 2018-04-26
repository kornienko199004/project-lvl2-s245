const transformValue = (v) => {
  if (!(v instanceof Object)) {
    return `'${v}'`;
  }
  return 'complex value';
};

const renderPlainAst = (ast) => {
  const renderIter = (data, path = '') =>
    data.map(({
      name, newValue, oldValue, type, children = [],
    }) => {
      if (type === 'unchanged') {
        return '';
      }
      const transformedValue = transformValue(newValue);
      const transformedOldValue = transformValue(oldValue);

      const strList = {
        root: renderIter(children, `${path}${name}.`).join('\n'),
        changed: `Property '${path}${name}' was updated. From ${transformedValue} to ${transformedOldValue}`,
        added: `Property '${path}${name}' was added with value: ${transformedValue}`,
        removed: `Property '${path}${name}' was removed`,
      };
      return strList[type];
    })
      .filter(e => e !== '');
  return `${renderIter(ast).join('\n')}`;
};

export default renderPlainAst;
