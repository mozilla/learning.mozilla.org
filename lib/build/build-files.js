var path = require('path');

module.exports = function(outputDir, outputFilename) {
  return function(onSuccess, onError, err, stats) {
    onError = onError || function() {};
    if (err) {
      console.log('Fatal error while compiling ' + outputFilename, err);
      return onError();
    }
    var jsonStats = stats.toJson();
    var hasErrors = jsonStats.errors.length > 0;
    if (hasErrors) {
      console.log(stats.toString({ colors: true }));
    }
    if (jsonStats.warnings.length > 0) {
      console.log(stats.toString({ colors: true }));
    }
    if (hasErrors) {
      onError();
    } else {
      var filename = path.join(outputDir, outputFilename);

      // webpack's hot-loading infrastructure is actually
      // a bit overkill for our needs; since anything
      // that's changed during development is in our
      // single bundle file, and since our static site
      // building process is stateless, we can just
      // delete our bundle from the require cache and
      // re-require it.

      delete require.cache[filename];

      indexStatic = require(filename);
      onSuccess(indexStatic);
    }
  };
};
