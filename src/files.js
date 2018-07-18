const globby = require("globby");
const asyncro = require("asyncro");
const fs = require("fs");
const promisify = require("./promisify");

const readFile = promisify(fs.readFile, { encoding: "utf8" });

module.exports = async globs =>
  await asyncro.map(await globby(globs), async file => ({
    name: file,
    extension: file.substring(file.lastIndexOf(".") + 1),
    content: await readFile(file)
  }));
