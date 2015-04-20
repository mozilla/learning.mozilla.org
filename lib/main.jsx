var React = require('react');
var Router = require('react-router');

var config = require('./config');
var routes = require('./routes.jsx');

function startRunningSite() {
  var pageHolder = document.getElementById('page-holder');

  if (config.ENABLE_PUSHSTATE) {
    routes.run(Router.HistoryLocation, pageHolder);
  } else {
    routes.run(Router.RefreshLocation, pageHolder);
  }
}

if (config.IN_STATIC_SITE && window.ENABLE_JS) {
  startRunningSite();
}

if (process.env.NODE_ENV !== 'production') {
  require('./developer-help')();
}
