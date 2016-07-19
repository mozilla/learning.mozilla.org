var should = require('should');
var areIntlLocalesSupported = require('intl-locales-supported');

var localesMyAppSupports = [
    /* list locales here */
];

if (global.Intl) {
    // Determine if the built-in `Intl` has the locale data we need.
    if (!areIntlLocalesSupported(localesMyAppSupports)) {
        // `Intl` exists, but it doesn't have the data we need, so load the
        // polyfill and patch the constructors we need with the polyfill's.
        var IntlPolyfill    = require('intl');
        Intl.NumberFormat   = IntlPolyfill.NumberFormat;
        Intl.DateTimeFormat = IntlPolyfill.DateTimeFormat;
    }
} else {
    // No `Intl`, so use and load the polyfill.
    global.Intl = require('intl');
}
var indexStatic = require('./index-static-singleton');

describe('index-static', function() {
  beforeEach(indexStatic.build);

  it('should work w/o meta options', function(done) {
    indexStatic.get().generate('/', {
      // no options passed
    }, function(err, url, title, html) {
      should(err).equal(null);
      done();
    });
  });

  it('should include meta options', function(done) {
    indexStatic.get().generate('/', {
      meta: { foo: 'bar' }
    }, function(err, url, title, html) {
      should(err).equal(null);
      html.should.match(/meta name="foo" content="bar"/);
      done();
    });
  });

  it('should include page title', function(done) {
    indexStatic.get().generate('/', {
      title: 'hello there'
    }, function(err, url, title, html) {
      should(err).equal(null);
      html.should.match(/\<title\>hello there\<\/title\>/);
      done();
    });
  });
});