module.exports = concatStreams;

function concatStreams(readables, writable) {
  var promises = readables.map(asyncRead);
  var results = Promise.all(promises);

  results.then((buffers) => {
    var data = Buffer.concat(buffers);

    writable.write(data);
  });
}

function asyncRead(stream) {
  return new Promise((resolve) => {
    var buffers = [];

    stream.on('data', (chunk) => buffers.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(buffers)));
  });
}
