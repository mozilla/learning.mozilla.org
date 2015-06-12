var path = require('path');
var _ = require('underscore');
var through = require('through2');
var lwip = require('lwip');
var File = require('vinyl');
var gutil = require('gulp-util');

function convert(options, file, cb) {
  var format = path.extname(file.path).slice(1);
  var targetFormat = options.format || format;

  lwip.open(file.contents, format, function(err, image) {
    if (err) {
      return cb(err);
    }

    image.toBuffer(
      targetFormat,
      options.formatParams || {},
      function(err, buffer) {
        if (err) {
          return cb(err);
        }
        var newFile = new File({
          cwd: file.cwd,
          base: file.base,
          path: file.path.replace(format, targetFormat),
          contents: buffer
        });
        gutil.log(
          'converted ' +
          gutil.colors.cyan(path.basename(newFile.relative)) + ' (' +
          (Math.floor(buffer.length / 1024)) + 'k)'
        );
        cb(null, newFile);
      }
    );
  });
}

module.exports = function(options) {
  var fileMap = options.files;
  var convertedFiles = [];

  return through.obj(function(file, enc, cb) {
    var convertOptions = fileMap[file.relative];
    if (!convertOptions) {
      return cb(null, file);
    }
    if (file.isStream()) {
      return cb(new Error('Unable to process stream-based files'));
    }
    convertedFiles.push(file.relative);
    return convert(convertOptions, file, cb);
  }).on('end', function() {
    var difference = _.difference(Object.keys(fileMap), convertedFiles);
    if (difference.length) {
      this.emit('error', new Error('Unconverted files: ' +
                                   difference.join(', ')));
    }
  });
};
