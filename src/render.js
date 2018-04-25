import { renderSimpleAst, renderPlainAst } from './renders';

const renderList = {
  simple: renderSimpleAst,
  plain: renderPlainAst,
  json: JSON.stringify,
};
export default format => (ast) => {
  const render = renderList[format];
  return render(ast);
};
