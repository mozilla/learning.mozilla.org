var Readable = require('stream').Readable;
var path = require('path');
var util = require('util');
var File = require('vinyl');

// Because the index.html files in our site don't necessarily
// come from individual files, it's easiest for us to just
// create a stream that emits Vinyl File objects rather than
// using gulp.src().
function IndexFileStream(indexStatic, options) {
  options = options || {};

  Readable.call(this, {
    objectMode: true
  });
  this._options = options;
  this._baseDir = __dirname;
  this._indexStatic = indexStatic;
  this._urls = indexStatic.URLS.slice().reverse();
}

util.inherits(IndexFileStream, Readable);

IndexFileStream.prototype._read = function() {
  if (this._urls.length === 0) {
    return this.push(null);
  }
  var url = this._urls.pop();
  var indexFile = path.join(
    this._baseDir,
    path.join.apply(path, url.split('/')),
    'index.html'
  );

  this._indexStatic.generate(url, {
    meta: this._options.meta || {}
  }, function(err, url, title, html) {
    if (err) {
      return this.emit('error', err);
    }
    this.push(new File({
      cwd: this._baseDir,
      base: this._baseDir,
      path: indexFile,
      contents: new Buffer(html)
    }));
  }.bind(this));
};

module.exports = IndexFileStream;
