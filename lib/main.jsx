var React = require('react');
var Router = require('react-router');

var config = require('./config');
var routes = require('./routes.jsx');

function startRunningSite() {
  var url = document.querySelector('meta[name=url]').getAttribute('value');
  var pageHolder = document.getElementById('page-holder');

  if (config.ENABLE_PUSHSTATE) {
    routes.run(Router.HistoryLocation, pageHolder);
  } else {
    if (!window.location.hash.slice(1))
      window.location.hash = '#' + url;
    routes.run(Router.HashLocation, pageHolder);
  }
}

if (config.IN_STATIC_SITE) {
  startRunningSite();
}
