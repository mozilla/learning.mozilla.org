var path = require('path');
var should = require('should');

var IndexFileStream = require('../lib/build/gulp-index-file-stream');

describe('gulp-index-file-stream', function() {
  var indexStatic = {
    URLS: ['/', '/foo/'],
    generate: function(url, options, cb) {
      options.should.eql({meta: {}});
      process.nextTick(function() {
        cb(null, 'i am ' + url);
      });
    }
  };

  it('should propagate errors', function(done) {
    var stream = new IndexFileStream({
      URLS: ['/'],
      generate: function(url, options, cb) {
        process.nextTick(function() {
          cb(new Error('oof'));
        });
      }
    });
    stream.on('data', function() {});
    stream.on('error', function(err) {
      err.message.should.eql('oof');
      done();
    });
  });

  it('should emit Vinyl file objects', function(done) {
    var stream = new IndexFileStream(indexStatic);
    var files = [];
    stream.on('data', function(file) {
      files.push({
        path: '/' + path.relative(file.base, file.path)
          .split(path.sep).join('/'),
        contents: file.contents.toString('utf8')
      });
    });
    stream.on('end', function() {
      files.should.eql([{
        path: '/index.html',
        contents: 'i am /'
      }, {
        path: '/foo/index.html',
        contents: 'i am /foo/'
      }]);
      done();
    });
  });
});
