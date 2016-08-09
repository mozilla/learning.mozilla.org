var React = require('react');
var ReactDOM = require('react-dom');
var ReactDOMServer = require('react-dom/server');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var RoutingContext = ReactRouter.RoutingContext;
var match = ReactRouter.match;

var ga = require('react-ga');

var routeData = require('./routes.jsx');
var locales = require('../dist/locales.json');

var urls = routeData.URLS;
var redirects = routeData.REDIRECTS;
var routes = routeData.routes;

var Page = require('../components/page.jsx');

var ReactIntl = require('react-intl');
var IntlProvider = ReactIntl.IntlProvider;
var addLocaleData = ReactIntl.addLocaleData;
var locales = require('../dist/locales.json');
var currentLocale;

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

function createElement(Component, props) {
  var locale = props.routes[0].path;
  var messages = locales[locale];
  // make sure you pass all the props in!
  return (
    <IntlProvider locale={locale} messages={messages}>
      <Component {...props} />
    </IntlProvider>
  );
}

/**
 * Static function for generating the site as static html files
 */
function generateStatic(url, next) {
  if (url in redirects) {
    return this.generateStaticRedirect(url, redirects[url], next);
  }

  match({ routes: routes, location: url }, function(error, redirectLocation, renderProps) {
    if (error) {
      return next(new Error("Error on route '" + url +  "'"));
    }

    if (!renderProps) {
      return next(new Error("No render properties for '"+url+"'"));
    }



    var Component = renderProps.routes.slice(-1)[0].component;
    var title = Page.titleForHandler(Component);
    var html = ReactDOMServer.renderToString(<RoutingContext createElement={createElement} {...renderProps} />);

    next(null, html, { title: title });
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
  /* L10N comment
    What we are trying to do here is to check if what's coming in
    `navigator.language` is supported in our locales list, and if it is
    we will be using the value there otherwise we will default to
    what was assigned above.
  */
  currentLocale = window.location.pathname.split('/')[1];
  messages = locales[currentLocale] || messages;
  // Load React's data for the current locale, but if it's not available for that specific country, load the general language data
  addLocaleData(window.ReactIntlLocaleData[currentLocale] || window.ReactIntlLocaleData[currentLocale.split('-')[0]]);
  /* END */

  ReactDOM.render(
    <IntlProvider locale={currentLocale} messages={messages}>
      <Router history={history}>{routes}</Router>
    </IntlProvider>, el);
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
