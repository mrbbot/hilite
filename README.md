# Hilite
Highlights code in bulk, and then exports an HTML and a PDF file.

## Installation
Install it globally using npm or Yarn.

```bash
npm i -g @mrbbot/hilite

yarn global add @mrbbot/hilite
```

## Usage
To highlight all files in the `src` directory, and output `index.html` and `index.pdf` in the current directory run the
following command:

```bash
hilite src
```

You can specify as many locations to highlight so if you also wanted to highlight files in the `dist` directory:

```bash
hilite src dist
```

You can also specify globs to match:
```bash
hilite src/**/*.js
```

If you want to change the output file names, you can use the `--output` (`-o`) flag. For example, the following command
will output to `code.html` and `code.pdf` instead of the normal `index`:

```bash
hilite src -o code
```

Additionally, if you're just looking for HTML output, you can disable the PDF export with the `--pdf` (`-p`) flag:

```bash
hilite src -p false
```

This will only generate an `index.html` file.

## Customisation

### Prism Theme
Hilite uses [Prism](https://prismjs.com/) for code highlighting, so if you don't like the default theme, you can easily change it using the `--theme` (`-t`) flag to either one of the
presets, or your own custom one.

If you wanted to change the output to use the *funky* theme:

```bash
hilite src -t funky
```

Other available presets are:
- default *(this is the actual default prism theme, Hilite uses its own simplified version normally)*
- dark
- okaidia
- twilight
- coy
- solarized-light
- tomorrow-night

If you had a custom theme stored in `theme.css`, you could use it with the following command:

```bash
hilite src -t theme.css
```

### Heading Level
You can change the level of the code filename headings with the `--level` (`-l`) flag. For instance to use `<h2>` tags
instead of the default `<h1>`s:

```bash
hilite src -l 2
```

### Margin
Finally, you can also change the amount of margin in the PDF export using the `--margin` (`-m`) flag.

```bash
hilite src -m 1in
```

You must include the [unit](https://www.w3schools.com/cssref/css_units.asp) in your value.