#!/usr/bin/env node

var fs = require('fs');
var argv = require('yargs')
  .option('s', {
    alias: 'source',
    array: true,
    describe: 'source files to be concatenated',
    type: 'string'
  })
  .option('o', {
    alias: 'output',
    describe: 'destination of concatenated files',
    type: 'string'
  })
  .usage('$0 [-s <paths>] [-o <path>]')
  .example('\"$0 -s src/*.js -o dist/bundle.js\"', '- Will concatenate all js files of `src/` into `dist/bundle.js`')
  .example('\"$0 -s *.js\"', '- Will concatenate all js files and send to stdout')
  .help('h')
  .alias('h', 'help')
  .version(() => require('./package.json').version)
  .argv;

var readStreams, writeStream;

if (Array.isArray(argv.source) && argv.source.length > 0) {
  readStreams = argv.source.map(path => fs.createReadStream(path));
}

if (argv.output && argv.output.length > 0) {
  writeStream = fs.createWriteStream(argv.o);
}

if (!readStreams) {
  if (!writeStream) {
    process.stdin.pipe(process.stdout);
  } else {
    process.stdin.pipe(writeStream);
  }
} else {
  writeStream = writeStream || process.stdout;

  var fn = function asyncReadStream(s) {
    return new Promise(function(res, rej) {
      var data = '';
      s.on('data', chunk => data += chunk);

      s.on('end', () => res(data));
    });
  };

  var actions = readStreams.map(fn);

  var results = Promise.all(actions);

  results.then(datas => {
    var chunks = datas.join('\n');

    writeStream.write(chunks);
  });
}
