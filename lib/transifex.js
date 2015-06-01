var Readable = require('stream').Readable;
var path = require('path');
var util = require('util');
var stableStringify = require('json-stable-stringify');
var request = require('superagent');
var File = require('vinyl');

function TransifexFileStream(options) {
  Readable.call(this, {
    objectMode: true
  });
  this._baseURL = 'http://www.transifex.com/api/2/project/' +
                  options.project + '/resource/' + options.resource;
  this._baseDir = __dirname;
  this._user = options.user;
  this._pass = options.pass;
  this._locales = null;
  this._options = options;
}

util.inherits(TransifexFileStream, Readable);

TransifexFileStream.prototype._fetchStats = function() {
  request
    .get(this._baseURL + '/stats/')
    .auth(this._user, this._pass)
    .end(function(err, res) {
      if (err) {
        return this.emit('error', err);
      }
      this._locales = Object.keys(res.body).filter(function(locale) {
        return res.body[locale].untranslated_entities === 0;
      }).sort();
      this._readNextLocale();
    }.bind(this));
};

TransifexFileStream.prototype._readNextLocale = function() {
  if (this._locales.length === 0) {
    return this.push(null);
  }
  var locale = this._locales.shift();
  request
    .get(this._baseURL + '/translation/' + locale + '/strings')
    .auth(this._user, this._pass)
    .end(function(err, res) {
      var strings = {};
      if (err) {
        return this.emit('error', err);
      }
      res.body.forEach(function(info) {
        strings[info.key] = info.translation || info.source_string;
      });
      this.push(new File({
        cwd: this._baseDir,
        base: this._baseDir,
        path: path.join(this._baseDir, locale + '.json'),
        contents: new Buffer(stableStringify(strings, {
          space: 2
        }))
      }));
    }.bind(this));
};

TransifexFileStream.prototype._read = function() {
  if (this._locales === null) {
    this._fetchStats();
  } else {
    this._readNextLocale();
  }
};

module.exports = TransifexFileStream;
