require('colors');
var wd = require('wd');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var argv = require('minimist')(process.argv.slice(2));

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
  timeout: 100000,
  retryDelay: 15000,
  retries: 5
});

// building desired capability
var browserKey = argv.browser || 'chrome';
var desired = DESIREDS[browserKey];
desired.name = 'Teach integrated tests: ' + browserKey;
desired.tags = ['webmaker'];

describe('Basic cross-browser tests (' + desired.browserName + ')', function() {
  this.timeout(100000);
  var browser;
  var allPassed = true;

  before(function(done) {
    var username = process.env.SAUCE_USERNAME;
    var accessKey = process.env.SAUCE_ACCESS_KEY;
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

    browser.on('consoleMessage', function (info) {
      console.log(info);
    });

    browser
      .init(desired)
      .nodeify(done);
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
  });

  function goTo(link) {
    return function (done) {
      var errors = [];
      browser
        .get('http://localhost:8008' + link)
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
    };
  }

  it('should go to home', goTo('/'));
  it('should go to Activities', goTo('/activities/'));
  it('should go to Events', goTo('/events/'));
  it('should go to Teach Like Mozilla', goTo('/teach-like-mozilla/'));
  it('should go to Clubs', goTo('/mozilla-web-clubs/'));

});
