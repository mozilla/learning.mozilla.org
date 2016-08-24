/**
 * This is the client-side bundle entry point,
 * packed by ./config/webpack/webpack.client.config.js
 *
 * It simply hooks into the app's codebase and
 * starts "everything" by calling the page-generator's
 * run() function, which in turns kicks off the React
 * app by loading up the <Router> element with our
 * app's routing information and then handing things
 * off to React.
 */

var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var ga = require('react-ga');
var GA_ACCOUNT = process.env.GA_ACCOUNT || '';
var GA_DEBUG = process.env.GA_DEBUG || 'off';

var generator = require('../page-generator.jsx');
var developerHelp = require('../developer-help');

var config = require('../../config/config');

function startRunningSite() {
  var history = config.ENABLE_PUSHSTATE ? Router.HistoryLocation : Router.RefreshLocation;
  var pageHolder = document.getElementById('page-holder');
  generator.run(history, pageHolder);
}

// flip the "using JS" switch and start to perform GA accordingly
if (config.IN_STATIC_SITE) {
  if (GA_ACCOUNT) {
    ga.initialize(GA_ACCOUNT, { debug: GA_DEBUG === 'on' });
  }

  // Start running the site client-side if JS is available
  if (window.ENABLE_JS) {
    if (!window.Intl) {
      require.ensure(['intl'], function(require) {
        window.Intl = require('intl');
        startRunningSite();
      }, "IntlBundle");
    } else {
      startRunningSite();
    }
  }

  else if (GA_ACCOUNT) {
    ga.pageview(window.location.pathname);
    ga.event({
      category: 'JavaScript',
      action: 'JS Disabled',
      nonInteraction: true
    });
  }
}

// Add in the developer ribbon when not in production mode.
if (process.env.NODE_ENV !== 'production') {
  developerHelp();
}
