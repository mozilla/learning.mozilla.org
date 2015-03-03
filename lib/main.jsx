var React = require('react');

var config = require('./config');
var windowUtil = require('./window-util');
var pages = require('./pages.jsx');
var Ia = require('./ia.jsx');

function renderPage(url) {
  React.render(
    pages.reactElementForPage(url),
    document.getElementById('page-holder')
  );
}

function startRunningSite() {
  var url = document.querySelector('meta[name=url]').getAttribute('value');
  var baseEl = document.querySelector('base[href]');

  baseEl.setAttribute('href', windowUtil.getAbsoluteURL('/'));

  if (config.ENABLE_PUSHSTATE) {
    window.history.replaceState({
      url: url
    }, '', windowUtil.getAbsoluteURL(url));
    window.addEventListener('popstate', function(e) {
      if (e.state && e.state.url)
        renderPage(e.state.url);
    });
  }

  renderPage(url);
}

if (config.IN_STATIC_SITE) {
  startRunningSite();
  Ia.setRenderPageHandler(renderPage);
}
