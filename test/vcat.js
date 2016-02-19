'use strict';

var fs = require('fs');
var path = require('path');
var child = require('child_process');

var should = require('should');

describe('vcat', function() {
  var g = {
    executable: path.join(__dirname, '..', 'bin/vcat'),
    input: [{
      path: 'test/fixtures/hello.txt',
      content: null
    }, {
      path: 'test/fixtures/world.txt',
      content: null
    }],
    output: 'test/fixtures/output.txt'
  };

  before(() => {
    for (let i = 0, l = g.input.length; i < l; ++i) {
      let file = g.input[i].path;
      g.input[i].content = fs.readFileSync(file, 'utf8');
    }
  });

  it('should send concatenation of two files to another file', (done) => {
    var vcat = child.spawn(
      g.executable, ['-s', g.input[0].path, g.input[1].path, '-o', g.output]
    );

    vcat.on('close', (code) => {
      var output = fs.readFileSync(g.output, 'utf8');

      (code).should.be.equal(0);
      (output).should.be.equal(g.input[0].content + g.input[1].content);
      done();
    });
  });

  it('should send concatenation of two files to stdout', (done) => {
    var vcat = child.spawn(
      g.executable, ['-s', g.input[0].path, g.input[1].path]
    );

    var chunks = '';

    vcat.stdout.on('data', (chunk) => {
      chunks += chunk.toString();
    });

    vcat.on('close', (code) => {
      (code).should.be.equal(0);
      (chunks).should.be.equal(g.input[0].content + g.input[1].content);
      done();
    });
  });

  after(() => {
    fs.unlinkSync(g.output);
  });

  it('should send concatenation of stdin to stdout', (done) => {
    var vcat = child.spawn(g.executable);

    var echos = child.exec('(echo Hello; echo World)');

    echos.stdout.pipe(vcat.stdin);

    var stringData = '';

    vcat.stdout.on('data', (data) => {
      stringData += data.toString();
    });

    vcat.on('close', code => {
      (code).should.be.equal(0);
      (stringData).should.be.equal('Hello\nWorld\n');
      done();
    });

  });
});
