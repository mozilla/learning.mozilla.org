var http = require('http');
var path = require('path');
var express = require('express');

var ROOT_DIR = path.normalize(path.join(__dirname, '..', '..', 'dist'));

exports.create = function create() {
  var app = express();
  var server = http.createServer(app);

  app.use(express.static(ROOT_DIR));

  return server;
};
