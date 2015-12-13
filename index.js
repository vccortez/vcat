module.exports = concatStreams;

function concatStreams(readables, writable) {
  var fn = function asyncRead(s) {
    return new Promise(function(res, rej) {
      var chunks = '';

      s.on('data', chunk => chunks += chunk);

      s.on('end', () => res(chunks));
    });
  };

  var promises = readables.map(fn);

  var results = Promise.all(promises);

  results.then(chunks => {
    var data = chunks.join('\n');

    writable.write(data);
  });
}
