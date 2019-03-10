const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const juice = require("juice");
const _template = require("lodash/template");
const languages = require("./languages");
// noinspection JSUnresolvedFunction
require("prismjs/components/")(languages.map(language => language.name));
const promisify = require("./promisify");

const readFile = promisify(fs.readFile, { encoding: "utf8" });
const writeFile = promisify(fs.writeFile, { encoding: "utf8" });

const templatePath = path.join(__dirname, "template");

async function generateHTML(highlighted, theme, progressCallback) {
  progressCallback("html", 0.6, "load template");

  const outputTemplate = _template(
    await readFile(path.join(templatePath, "template.html"))
  );

  progressCallback("html", 0.7, "load prism theme");

  let prismThemePath = path.join(templatePath, "prism", `${theme}.css`);
  if (!fs.existsSync(prismThemePath)) prismThemePath = path.resolve(theme);

  const prismTheme = await readFile(prismThemePath);
  const htmlWithTheme = `<style>${prismTheme}</style>${highlighted}`;
  const htmlWithInlinedTheme = juice(htmlWithTheme);

  progressCallback("html", 0.8, "generate html");

  return outputTemplate({
    highlighted: htmlWithInlinedTheme
  });
}

async function save(html, outputName, margin, pdf, progressCallback) {
  progressCallback("export-html", 0.8, "");

  const outputFile = path.resolve(`${outputName}.html`);

  await writeFile(outputFile, html);

  if (pdf) {
    progressCallback("export-pdf", 0.85, "launch browser");

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    progressCallback("export-pdf", 0.9, "load page");

    await page.goto(`file:///${outputFile}`, {
      waitUntil: "load"
    });

    progressCallback("export-pdf", 0.95, "save pdf");

    await page.pdf({
      path: `${outputName}.pdf`,
      format: "A4",
      margin: {
        top: margin,
        left: margin,
        bottom: margin,
        right: margin
      }
    });

    progressCallback("export-pdf", 0.95, "close browser");

    await browser.close();

    progressCallback("export-pdf", 1, "");
  } else {
    progressCallback("export", 1, "");
  }
}

module.exports = {
  generateHTML,
  save
};
