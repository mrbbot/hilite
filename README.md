# Hiliter
Highlights code in bulk, and then exports an HTML and a PDF file.

## Installation
Install it globally using npm or Yarn.

```bash
npm i -g hiliter

yarn global add hiliter
```

## Usage
To highlight all files in the `src` directory, and output `index.html` and `index.pdf` in the current directory run the
following command:

```bash
hiliter src
```

You can specify as many locations to highlight so if you also wanted to highlight files in the `dist` directory:

```bash
hiliter src dist
```

You can also specify globs to match:
```bash
hiliter src/**/*.js
```

If you want to change the output file names, you can use the `--output` (`-o`) flag. For example, the following command
will output to `code.html` and `code.pdf` instead of the normal `index`:

```bash
hiliter src -o code
```

Additionally, if you're just looking for HTML output, you can disable the PDF export with the `--pdf` (`-p`) flag:

```bash
hiliter src -p false
```

This will only generate an `index.html` file.

## Customisation

### Prism Theme
Hiliter uses [Prism](https://prismjs.com/) for code highlighting, so if you don't like the default theme, you can easily change it using the `--theme` (`-t`) flag to either one of the
presets, or your own custom one.

If you wanted to change the output to use the *funky* theme:

```bash
hiliter src -t funky
```

Other available presets are:
- default *(this is the actual default prism theme, Hiliter uses its own simplified version normally)*
- dark
- okaidia
- twilight
- coy
- solarized-light
- tomorrow-night

If you had a custom theme stored in `theme.css`, you could use it with the following command:

```bash
hiliter src -t theme.css
```

### Margin
Finally, you can also change the amount of margin in the PDF export using the `--margin` (`-m`) flag.

```bash
hiliter src -m 1in
```

You must include the [unit](https://www.w3schools.com/cssref/css_units.asp) in your value.