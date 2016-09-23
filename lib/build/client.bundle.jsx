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

if (GA_ACCOUNT) {
  ga.initialize(GA_ACCOUNT, { debug: GA_DEBUG === 'on' });
}

// Run the bundle, possibly after bootstrapping window.Intl
// if that has not been bootstrapped yet.
if (!window.Intl) {
  require.ensure(['intl'], function(require) {
    window.Intl = require('intl');
    startRunningSite();
  }, "IntlBundle");
} else {
  startRunningSite();
}


// Add in the developer ribbon when not in production mode.
if (process.env.NODE_ENV !== 'production') {
  developerHelp();
}
