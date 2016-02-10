var React = require('react');
var ReactDOM = require('react-dom');
var ReactDOMServer = require('react-dom/server');
var Router = require('react-router');

var ga = require('react-ga');

var routeData = require('./routes.jsx');

var urls = routeData.URLS;
var redirects = routeData.REDIRECTS;
var routes = routeData.routes;

var Page = require('../components/page.jsx');

/**
 * content for redirect pages
 */
function generateRedirectContent(toURL) {
  return (
    <p>The URL of this page has changed to <a href={toURL}>{toURL}</a>.</p>
  );
}

/**
 * Static function for resolving redirects for site content
 */
function generateStaticRedirect(fromURL, toURL, next) {
  var router = Router.create({ routes: routes, location: fromURL });
  process.nextTick(function() {
    if (!router.match(toURL)) {
      return next(new Error("Redirect 'to' route does not exist: " + toURL));
    }
    var redirectHTML = generateRedirectContent(toURL);
    var html = ReactDOMServer.renderToStaticMarkup(redirectHTML);
    next(null, html, { title: "Redirect to " + toURL });
  });
}

/**
 * Static function for generating the site as static html files
 */
function generateStatic(url, next) {
  if (url in redirects) {
    return this.generateStaticRedirect(url, redirects[url], next);
  }
  var router = Router.create({ routes: routes, location: url });
  router.run(function(Handler, route) {
    var routeHandler = route.routes[1].handler,
        title = null,
        html = null,
        err = null;
    try {
      title = Page.titleForHandler(routeHandler);
      html = ReactDOMServer.renderToString(<Handler/>);
    } catch (e) {
      err = e;
    }
    next(err, html, { title: title });
  });
}

/**
 * Static wrapper function for GA events
 */
function run(location, el) {
  Router.run(routes, location, function(Handler, state) {
    ga.pageview(state.pathname);
    ReactDOM.render(<Handler/>, el);
  });
}

/**
 * Module return is an object with some of the internval values and
 * functions for generating the static site files.
 */
module.exports = {
  URLS: urls,
  REDIRECTS: redirects,
  routes: routes,
  generateStaticRedirect: generateStaticRedirect,
  generateStatic: generateStatic,
  run: run
};
