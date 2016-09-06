/**
 * Security Headers
 */

var url = require('url');

var securityHeaders = {
  directives: {
    defaultSrc: [
      'www.youtube.com',
      'https://public.etherpad-mozilla.org'
    ],
    scriptSrc: [
      '\'self\'',
      '\'unsafe-inline\'',
      '\'unsafe-eval\'',
      'data:',
      'www.google-analytics.com',
      'cdn.optimizely.com',
      'https://www.google.com',
      'https://s.ytimg.com',
      'https://www.mozilla.org',
      'https://goggles.mofostaging.net',
      'https://goggles.mozilla.org'
    ],
    fontSrc: [
      '\'self\'',
      'fonts.googleapis.com',
      'fonts.gstatic.com'
    ],
    styleSrc: [
      '\'self\'',
      '\'unsafe-inline\'',
      'https://www.google.com',
      'fonts.googleapis.com',
      'https://api.tiles.mapbox.com',
      'https://s.ytimg.com'
    ],
    imgSrc: [
      '\'self\'',
      '\'unsafe-inline\'',
      'data:',
      '*'
    ],
    connectSrc: [
      '\'self\'',
      'https://www.google.com',
      '*.tiles.mapbox.com',
      '*.log.optimizely.com',
      '*.github.io',
      '*.mywebmaker.org',
      '*.makes.org',
      'bitly.mofoprod.net',
      process.env.TEACH_API_URL || 'https://teach-api-staging.herokuapp.com',
      url.parse(process.env.NEWSLETTER_MAILINGLIST_URL || 'https://basket-dev.allizom.org').hostname,
      'https://goggles.mofostaging.net',
      'https://goggles.mozilla.org'
    ]
  },
  reportOnly: false,
  browserSniff: false
};

if (process.env.ENABLE_PONTOON) {
  securityHeaders.directives.defaultSrc.push('https://pontoon.mozilla.org', 'https://mozilla-pontoon-staging.herokuapp.com');
  securityHeaders.directives.scriptSrc.push('https://pontoon.mozilla.org', 'https://mozilla-pontoon-staging.herokuapp.com');
  securityHeaders.directives.fontSrc.push('https://pontoon.mozilla.org', 'https://mozilla-pontoon-staging.herokuapp.com');
  securityHeaders.directives.styleSrc.push('https://pontoon.mozilla.org', 'https://mozilla-pontoon-staging.herokuapp.com');
  securityHeaders.directives.connectSrc.push('https://pontoon.mozilla.org', 'https://mozilla-pontoon-staging.herokuapp.com');
  securityHeaders.directives['frame-ancestors'] = ['https://pontoon.mozilla.org', 'https://mozilla-pontoon-staging.herokuapp.com'];
}

module.exports = securityHeaders;
