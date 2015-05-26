var IN_STATIC_SITE = (typeof (window) !== 'undefined');
var GENERATING_STATIC_SITE = !IN_STATIC_SITE;
var ENABLE_PUSHSTATE = (IN_STATIC_SITE &&
                        window.history.pushState &&
                        window.history.replaceState);
var DEV_SERVER_PORT = 8008;
var ORIGIN;

if (IN_STATIC_SITE) {
  ORIGIN = window.location.protocol + '//' + window.location.host;
} else {
  ORIGIN = process.env.ORIGIN;

  if (!ORIGIN) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('ORIGIN must be defined in production.');
    } else {
      ORIGIN = 'http://localhost:' + DEV_SERVER_PORT;
    }
  }
}

exports.IN_STATIC_SITE = IN_STATIC_SITE;
exports.GENERATING_STATIC_SITE = GENERATING_STATIC_SITE;
exports.ENABLE_PUSHSTATE = ENABLE_PUSHSTATE;
exports.IN_TEST_SUITE = (typeof describe == 'function');
exports.DEV_SERVER_PORT = DEV_SERVER_PORT;
exports.TWITTER_HANDLE = '@MozTeach';
exports.TWITTER_LINK = 'https://twitter.com/MozTeach';
exports.ORIGIN = ORIGIN;
