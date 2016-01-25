var execSync = require('child_process').execSync;
var IndexFileStream = require('../../lib/build/gulp-index-file-stream');
var indexStaticWatcher = require('../../lib/build/index-static-watcher').create();
var PassThrough = require('stream').PassThrough;

function createIndexFileStream() {
  var stream = new PassThrough({ objectMode: true });
  var meta = {};

  try {
    meta['git-rev'] = execSync('git rev-parse HEAD', {
      cwd: __dirname,
      encoding: 'utf8'
    }).slice(0, 40);
  } catch (e) {}

  indexStaticWatcher.build(function(err, indexStatic) {
    if (err) {
      return stream.emit('error', err);
    }
    new IndexFileStream(indexStatic, {
      meta: meta
    }).on('error', function(err) {
      stream.emit('error', err);
    }).pipe(stream);
  });

  return stream;
}

module.exports = {
  IndexFileStream: IndexFileStream,
  indexStaticWatcher: indexStaticWatcher,
  createIndexFileStream: createIndexFileStream
};
