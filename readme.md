# vcat

[![npm package](https://nodei.co/npm/vcat.png?mini=true)](https://nodei.co/npm/vcat/)

A simple concatenation command line tool built with Node.js streams.  
Basically, it is a JavaScript version of Unix's `cat` utility program.

### Install

You might want to install `vcat` as a development dependency:
```bash
$ npm install vcat --save-dev
```
Or just install it globally:
```bash
$ npm install -g vcat
```

### Usage

To use `vcat`, you need to pass input files with the `-s` or `--source` option, then pass an output path with the `-o` or `--output` option.

#### Examples

The basic use case, reading files and concatenating to a new file:
```bash
$ vcat -s src/*.js -o bundle.js
```

If an option is not passed, `vcat` will use the standard input/output, meaning basic piping is possible:
```bash
$ vcat -s src/*.js | grep 'Hello World'
```
```bash
$ (date; echo "Hello World") | vcat -o output.txt
```
```bash
$ vcat -s src/*.js | transpilerProgram
```

#### License

This software is licensed under [MIT](license).
