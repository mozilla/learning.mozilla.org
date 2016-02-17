var path = require('path');
var _ = require('underscore');
var Minimatch = require('minimatch').Minimatch;
var through = require('through2');
var gutil = require('gulp-util');
var SVGO = require('svgo');
var File = require('vinyl');

function convert(options, file, cb) {
  // removed lwip conversion
  cb(null, file);
}

function optimizeSvg(svgo, file, cb) {
  var data = file.contents.toString('utf8');

  // If the SVG was exported from Illustrator with the
  // "Preserve Illustrator Editing Capabilities" checkbox checked,
  // it will be very large and use a bunch of proprietary Adobe named
  // character entities that begin with "&ns_". If we pass this on to svgo,
  // it will be confused by the entities and throw horribly confusing
  // errors, so instead we'll detect for the condition here and bail early
  // with an informative help message.
  //
  // For more information, see:
  //
  // https://github.com/mozilla/teach.mozilla.org/pull/1052#issuecomment-113582058

  if (data.indexOf('&ns_') !== -1) {
    return process.nextTick(function() {
      cb(new Error('SVG was exported with "Preserve ' +
                   'Illustrator Editing Capabilities" checked: ' +
                   file.relative));
    });
  }


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
