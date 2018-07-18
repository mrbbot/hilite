const prism = require("prismjs");
const languages = require("./languages");
// noinspection JSUnresolvedFunction
require("prismjs/components/")(languages.map(language => language.name));
const files = require("./files");

async function highlight(globs, progressCallback) {
  progressCallback("glob", 0, "");
  const matched = await files(globs);
  progressCallback("glob", 0.2, "");
  // noinspection JSUnresolvedFunction
  return matched
    .map((file, i, arr) => {
      // noinspection JSUnresolvedFunction
      const result = {
        ...file,
        language: (
          languages.find(language => language.extension === file.extension) ||
          {}
        ).name
      };

      progressCallback("find-lang", 0.2 + (i / arr.length) * 0.2, file.name);

      return result;
    })
    .map((file, i, arr) => {
      // noinspection JSUnresolvedFunction, JSUnresolvedVariable
      const result = {
        ...file,
        highlighted: file.language
          ? prism.highlight(
              file.content,
              prism.languages[file.language],
              file.language
            )
          : file.content
      };

      progressCallback("highlight", 0.4 + (i / arr.length) * 0.2, file.name);

      return result;
    })
    .map(
      file =>
        `<h1>${file.name}</h1><pre class="language-${
          file.language
        }"><code class="language-${file.language}">${
          file.highlighted
        }</code></pre>`
    )
    .join("");
}

module.exports = highlight;
