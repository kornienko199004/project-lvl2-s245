import { renderSimpleAst, renderPlainAst } from './rendersList';

const renderList = {
  simple: renderSimpleAst,
  plain: renderPlainAst,
};
export default format => (ast) => {
  const render = renderList[format];
  return render(ast);
};
