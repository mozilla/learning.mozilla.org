var indexStaticWatcher = require('../lib/index-static-watcher').create();

var indexStatic;

exports.get = function() {
  if (!indexStatic) {
    throw new Error("indexStatic has not yet been built.");
  }
  return indexStatic;
};

exports.build = function(done) {
  this.timeout(10000);
  indexStaticWatcher.build(function(err, newIndexStatic) {
    if (err) return done(err);

    indexStatic = newIndexStatic;
    done();
  });
};
