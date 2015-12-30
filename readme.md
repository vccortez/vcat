# vcat

[![npm package](https://nodei.co/npm/vcat.png?mini=true)](https://nodei.co/npm/vcat/)

A simple concatenation command line tool built with Node.js streams.

## Install

```bash
$ npm install -g vcat
```

## Usage

Select the files to concatenate using `-s` or `--source` and an output file using `-o` or `--output`:

```bash
$ vcat -s src/*.js -o dist/bundle.js
```
`vcat` will then join all the js files inside `src/` and save their contents to a `bundle.js` file inside `dist/`.
If any of these parameters are missing, `vcat` will use the standard input/output.
