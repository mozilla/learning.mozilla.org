var path = require('path');
var _ = require('underscore');
var Minimatch = require('minimatch').Minimatch;
var replaceExt = require('replace-ext');
var through = require('through2');
var lwip = require('lwip');
var gutil = require('gulp-util');
var SVGO = require('svgo');

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
        file.path = replaceExt(file.path, '.' + targetFormat);
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

function optimizeSvg(svgo, file, cb) {
  var data = file.contents.toString('utf8');
  svgo.optimize(data, function(result) {
    if (result.error) {
      return cb(new Error(
        'error optimizing SVG ' +
        file.relative + ' (' + result.error + ')'
      ));
    }
    file.contents = new Buffer(result.data, 'utf8');
    cb(null, file);
  });
}

module.exports = function(options) {
  var svgo = new SVGO();
  var matchers = Object.keys(options).map(function(pattern) {
    return {
      pattern: pattern,
      convertOptions: options[pattern],
      minimatch: new Minimatch(pattern),
      matches: 0
    };
  });

  return through.obj(function(file, enc, cb) {
    var next = function(err, file) {
      if (err) {
        return cb(err);
      }
      if (/\.svg$/i.test(file.path)) {
        return optimizeSvg(svgo, file, cb);
      }
      cb(null, file);
    };
    var matcher = _.find(matchers, function(matcher) {
      return matcher.minimatch.match(file.relative);
    });
    if (!matcher) {
      return next(null, file);
    }
    if (file.isStream()) {
      return cb(new Error('Unable to process stream-based files'));
    }
    matcher.matches++;
    return convert(matcher.convertOptions, file, next);
  }).on('end', function() {
    var unconverted = matchers.filter(function(matcher) {
      return (matcher.matches === 0);
    });
    if (unconverted.length) {
      this.emit('unconverted-patterns', _.pluck(unconverted, 'pattern'));
    }
  });
};
