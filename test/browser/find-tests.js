var fs = require('fs');

var testFiles = fs.readdirSync(__dirname).filter(function(filename) {
  return /\.test\.jsx?$/.test(filename);
});

module.exports = testFiles.map(function(filename) {
  return "require('./" + filename + "');";
}).join('\n');
