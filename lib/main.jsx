var React = require('react');
var Router = require('react-router');
var ga = require('react-ga');
var developerHelp = require('./build/developer-help');

var config = require('./build/config');
var routes = require('./routes.jsx');

var GA_ACCOUNT = process.env.GA_ACCOUNT || 'UA-49796218-20';
var GA_DEBUG = process.env.GA_DEBUG || 'off';

function startRunningSite() {
  var pageHolder = document.getElementById('page-holder');

  if (config.ENABLE_PUSHSTATE) {
    routes.run(Router.HistoryLocation, pageHolder);
  } else {
    routes.run(Router.RefreshLocation, pageHolder);
  }
}

if (config.IN_STATIC_SITE) {
  ga.initialize(GA_ACCOUNT, { debug: GA_DEBUG === 'on' });
  if (window.ENABLE_JS) {
    startRunningSite();
  } else {
    ga.pageview(window.location.pathname);
    ga.event({
      category: 'JavaScript',
      action: 'JS Disabled',
      nonInteraction: true
    });
  }
}

if (process.env.NODE_ENV !== 'production') {
  developerHelp();
}
