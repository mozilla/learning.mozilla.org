module.exports = [
  '*.js',
  'lib/**/*.js',
  'test/**/*.js',
  // Google analytics contains code from GA's snippet, which
  // is intentionally uglified and obfuscated and crap.
  '!lib/googleanalytics.js',
  // TODO let's figure out how to let our linters handle the test suite: delete the line below when we're ready
  '!test/**/*.js'
];
