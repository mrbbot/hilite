// noinspection JSUnresolvedFunction
module.exports = require("./languages").reduce((languages, language) => {
  language.extension = language.extensions;
  delete language.extensions;
  if (!language.extension) language.extension = language.name;
  if (Array.isArray(language.extension)) {
    language = language.extension.map(extension => ({
      name: language.name,
      extension: extension
    }));
  }
  return languages.concat(language);
}, []);
