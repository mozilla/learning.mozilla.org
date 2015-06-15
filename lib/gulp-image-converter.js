var path = require('path');
var _ = require('underscore');
var through = require('through2');
var lwip = require('lwip');
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

        // Note that vinyl 0.5 supports file.extname for manipulations
        // like this, but we're not yet using 0.5 at the time
        // of writing this, so we'll need to replace the extension
        // ourselves.
        file.path = require('replace-ext')(file.path, '.' + targetFormat);
        file.contents = buffer;

        gutil.log(
          'converted ' +
          gutil.colors.cyan(path.basename(file.relative)) + ' (' +
          (Math.floor(buffer.length / 1024)) + 'k)'
        );
        cb(null, file);
      }
    );
  });
}

module.exports = function(options) {
  var fileMap = options.files;
  var convertedFiles = [];

  return through.obj(function(file, enc, cb) {
    var posixRelative = file.relative.replace(/\\/g, '/');
    var convertOptions = fileMap[posixRelative];
    if (!convertOptions) {
      return cb(null, file);
    }
    if (file.isStream()) {
      return cb(new Error('Unable to process stream-based files'));
    }
    convertedFiles.push(posixRelative);
    return convert(convertOptions, file, cb);
  }).on('end', function() {
    var difference = _.difference(Object.keys(fileMap), convertedFiles);
    if (difference.length) {
      this.emit('error', new Error('Unconverted files: ' +
                                   difference.join(', ')));
    }
  });
};
