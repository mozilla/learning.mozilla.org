var http = require('http');
var path = require('path');
var express = require('express');

var ROOT_DIR = path.normalize(path.join(__dirname, '..', '..'));

var app = express();

var server = http.createServer(app);

app.use(express.static(path.join(ROOT_DIR, 'dist')));

server.listen(0, function() {
  var baseURL = 'http://localhost:' + server.address().port;

  var mochaPhantomPath = path.join(
    ROOT_DIR, 'node_modules', 'mocha-phantomjs', 'bin',
    'mocha-phantomjs'
  );

  var mochaPhantom = require('child_process').spawn(process.execPath, [
    mochaPhantomPath,
    baseURL + '/test/'
  ], {
    stdio: [0, 1, 2]
  });

  mochaPhantom.on('close', function(code) {
    server.close();
    process.exit(code);
  });
});
