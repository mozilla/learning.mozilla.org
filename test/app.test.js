var jsdom = require("jsdom");
var request = require('superagent');
var should = require("should");

/**
 * App.js server tests
 */
describe('App.js server testing', function() {

  var app = require('../app');
  var server;
  var serveraddress = "http://localhost:" + app.PORT;
  var locale = "/en-US";

  before(function(done) {
    // fire up the server in a separate process!
    var spawn = require('child_process').spawn;

    server = spawn('node', ['app']);
    server.stdout.on('data', (data) => {
      data = data.toString();
      if (data.indexOf(app.READY_STRING) > -1) {
        // Once the server writes the ready string to stdout
        // we can start running our tests against it.
        done();
      }
    });
  });

  after(function(done) {
    // Kill the server process so we don't leak on exit.
    server.kill();
    done();
  });

  describe('Page requests', function() {
    it('should fetch the base en-US route with the correct title from /en-US/', function(done) {
      request
      .get(serveraddress + locale + '/')
      .end(function(_err, res){
        res.status.should.equal(200);

        var dom = jsdom.env(res.text, function (err, window) {
          if (err) {
            throw new Error(err);
          }

          var document = window.document;
          var title = document.title;

          title.should.be.type('string');
          title.should.equal('Mozilla Learning');
          done();
        });
      });
    });

    it('should have an /en-US/healthcheck route', function(done) {
      request
      .get(serveraddress + locale + '/healthcheck')
      .end(function(_err, res){
        res.status.should.equal(200);

        var dom = jsdom.env(res.text, function (err, window) {

          if (err) {
            throw new Error(err);
          }

          var document = window.document;
          var title = document.title;

          title.should.containEql('Site Health Check');
          done();
        });
      });
    });
  });

});
