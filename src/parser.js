import yaml from 'js-yaml';

const parserList = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
};

export default format => (data) => {
  const parse = parserList[format];
  return parse(data);
};
