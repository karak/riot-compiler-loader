const { compile } = require("@riotjs/compiler");
const { getOptions } = require("loader-utils");

module.exports = function(source) {
  // parse the user query
  const query = getOptions(this) || {};

  // normalise the query object in case of question marks
  const opts = Object.keys(query).reduce(function(acc, key) {
    acc[key.replace("?", "")] = query[key];
    return acc;
  }, {});

  // cache this module
  if (this.cacheable) this.cacheable();

  // compile to generate entities
  const { code, map } = compile(source, opts);
  return { code, map };
};
