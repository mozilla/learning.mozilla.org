require('colors');
require('node-jsx').install({extension: '.jsx'});

var wd = require('wd');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var argv = require('minimist')(process.argv.slice(2));
var express = require('express')

// Get all urls
var urls = require('../../lib/routes.jsx').URLS;
urls.push('/test/');

var app = express();
app.use(express.static('./dist'));

// Check username
if (!process.env.SAUCE_USERNAME || !process.env.SAUCE_ACCESS_KEY) {
  console.log('\nERROR: Hey! you need to add SAUCE_USERNAME and SAUCE_ACCESS_KEY to your environment to run these tests.\n'.red);
  process.exit(1);
}

chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

// browser capabilities
var DESIREDS = require('./desiredBrowsers');

// http configuration, not needed for simple runs
wd.configureHttp( {
  timeout: 200000,
  retryDelay: 15000,
  retries: 5
});

// building desired capability
var browserKey = argv.browser || 'chrome';
var desired = DESIREDS[browserKey];
desired.name = 'Teach integrated tests: ' + browserKey;
desired.tags = ['webmaker'];

var port;

describe('Basic cross-browser tests (' + desired.browserName + ')', function() {
  this.timeout(100000);
  var browser;
  var allPassed = true;

  before(function(done) {
    var username = process.env.SAUCE_USERNAME;
    var accessKey = process.env.SAUCE_ACCESS_KEY;
    server = app.listen(0, function () {
      port = server.address().port;
      console.log('Server listening to', port);
      browser = wd.promiseChainRemote('ondemand.saucelabs.com', 80, username, accessKey);
      if(argv.verbose){
        // optional logging
        browser.on('status', function(info) {
          console.log(info.cyan);
        });
        browser.on('command', function(meth, path, data) {
          console.log(' > ' + meth.yellow, path.grey, data || '');
        });
      }

      browser.on('error', function (error) {
        console.log(error);
      });

      browser
        .init(desired)
        .nodeify(done);
    });

  });

  afterEach(function(done) {
    allPassed = allPassed && (this.currentTest.state === 'passed');
    done();
  });

  after(function(done) {
    browser
      .quit()
      .sauceJobStatus(allPassed)
      .nodeify(done);
    server.close();
  });

  function goTo(link) {
    return function (done) {
      var errors = [];
      var url = 'http://localhost:' + port + link;
      if (browserKey === 'chrome') {
        browser
          .get(url)
          .log('browser')
          .then(function(logs) {
            logs.forEach(function (log) {
              console.log(log.message.red);
              if (log.level === 'WARNING' && log.message.match('react')) {
                errors.push(log.message);
              }
            });
          })
          .nodeify(function (wdError) {
            var err;
            if (wdError) {
              err = wdError;
            } else if (errors.length) {
              err = new Error('There were some react warnings found on this page.');
            }
            done(err);
          });
        } else {
          browser
            .get(url)
            .nodeify(done);
        }
    };
  }

  urls.forEach(function (url) {
    it(browserKey + ': ' + url, goTo(url));
  });

});
