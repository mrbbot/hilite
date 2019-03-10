#!/usr/bin/env node
const argv = require("yargs")
  .usage("Usage: $0 [globs]")
  .example("$0 src", "highlight files in the src directory")
  .example("$0 src dist", "highlight files in the src and dist directories")
  .example(
    "$0 src -o code",
    "highlight files in the src directory storing the result in code.html and code.pdf"
  )
  .example(
    "$0 src -t funky",
    "highlight files in the src directory using the funky prism theme"
  )
  .example(
    "$0 src -t theme.css",
    "highlight files in the src directory using the theme.css file in the working directory as the prism theme"
  )
  .example(
    "$0 src -m 1cm",
    "highlight files in the src directory using a 1cm margin for the pdf"
  )
  .example(
    "$0 src -l 2",
    "highlight files in the src directory with headers at the 2nd level"
  )
  .example(
    "$0 src -p false",
    "highlight files in the src directory without creating a pdf, only a html file"
  )
  .alias("v", "version")
  .alias("h", "help")
  .options({
    o: {
      alias: "output",
      describe: "output file name",
      type: "string",
      default: "index"
    },
    t: {
      alias: "theme",
      describe: "prism theme name or path",
      type: "string",
      default: "default-simple"
    },
    m: {
      alias: "margin",
      describe: "margin for output including (css) units",
      type: "string",
      default: "0.5cm"
    },
    l: {
      alias: "level",
      describe: "header level for file headers",
      type: "number",
      default: 1
    },
    p: {
      alias: "pdf",
      describe: "whether to generate a pdf",
      type: "boolean",
      default: true
    }
  }).argv;

const gauge = new (require("gauge"))();

const highlight = require("./highlight");
const { generateHTML, save } = require("./export");

const progressCallback = (section, completed, message) => {
  gauge.show(section, completed);
  gauge.pulse(message);
};

// noinspection JSUnresolvedFunction
highlight(argv._, argv.level, progressCallback)
  .then(highlighted => generateHTML(highlighted, argv.theme, progressCallback))
  .then(html =>
    save(html, argv.output, argv.margin, argv.pdf, progressCallback)
  );
