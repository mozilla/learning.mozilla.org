var React = require('react');
var ReactDOM = require('react-dom');
var ReactDOMServer = require('react-dom/server');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var RoutingContext = ReactRouter.RoutingContext;
var match = ReactRouter.match;

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
  match({ routes:routes, location: fromURL }, function(error, redirectLocation, renderProps) {
    if (error) {
      return next(new Error("Error in redirect from '" + fromURL +  "' to '" + toURL +  "'"));
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

  match({ routes:routes, location: url }, function(error, redirectLocation, renderProps) {
    if (error) {
      return next(new Error("Error on route '" + url +  "'"));
    }

    if (!renderProps) {
      return next(new Error("No render properties for '"+url+"'"));
    }

    var routes = renderProps.routes;
    var Component = routes.slice(-1)[0].component;
    var title = Page.titleForHandler(Component);
    var html = ReactDOMServer.renderToString(<RoutingContext {...renderProps} />);

    next(false, html, { title: title });
  });
}

/**
 * Static wrapper function for GA events
 */
function run(location, el) {
  var createBrowserHistory = require('history/lib/createBrowserHistory');
  var history = createBrowserHistory();

  // emit a GA page view event on location changes
  history.listen(function(location) {
    ga.pageview(location.pathname);
  });

  ReactDOM.render(<Router history={history}>{routes}</Router>, el);
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
