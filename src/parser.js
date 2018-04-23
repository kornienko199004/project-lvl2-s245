import yaml from 'js-yaml';
import ini from 'ini';

const parserList = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default format => (data) => {
  const parse = parserList[format];
  return parse(data);
};
