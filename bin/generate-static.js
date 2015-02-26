var fs = require('fs');
var path = require('path');
var html = require('html');
var ncp = require('ncp');
var less = require('less');
var mkdirp = require('mkdirp');
var async = require('async');
var webpack = require('webpack');
var React = require('react');

require('node-jsx').install();

var webpackConfig = require('../webpack.config');
var index = require('../index-static.jsx');

var ROOT_DIR = path.join(__dirname, '..');
var DIST_DIR = path.join(ROOT_DIR, 'dist');

function copyDir(dirname, cb) {
  var dirParts = dirname.split('/');
  var sDir = path.join.apply(path, [ROOT_DIR].concat(dirParts));
  var dDir = path.join.apply(path, [DIST_DIR].concat(dirParts));

  console.log('Copying "' + dirname + '" directory.');
  mkdirp.sync(dDir);
  ncp(sDir, dDir, cb);
}

function copyDirs(dirnames, cb) {
  async.series(dirnames.map(function(dirname) {
    return copyDir.bind(null, dirname);
  }), cb);
}

function buildWithCss(css, cb) {
  var indexHTML;

  mkdirp.sync(DIST_DIR);
  fs.writeFileSync(path.join(DIST_DIR, index.CSS_FILENAME), css);

  console.log("Generating HTML.");
  indexHTML = index.generate();
  indexHTML = html.prettyPrint(indexHTML, {indent_size: 2});
  fs.writeFileSync(path.join(DIST_DIR, 'index.html'), indexHTML);
  copyDirs([
    'img',
    'vendor/bootstrap/css',
    'vendor/bootstrap/fonts'
  ], function(err) {
    if (err) return cb(err);

    var compiler = webpack(webpackConfig);

    console.log("Generating JS.");
    compiler.run(function(err, stats) {
      if (err) return cb(err);

      console.log('Done, static site is in "dist" directory.');
      cb(null);
    });
  });
}

function generateStaticSite(cb) {
  cb = cb || function() {};
  console.log("Generating CSS.");

  less.render('@import "styles.less";', {
    paths: [ROOT_DIR]
  }, function(err, output) {
    // Less' callback eats any exceptions thrown from this function
    // so we'll just start our callback in a separate stack.
    process.nextTick(function() {
      if (err) return cb(err);
      buildWithCss(output.css, cb);
    });
  });
}

module.exports = generateStaticSite;

if (!module.parent)
  generateStaticSite();
