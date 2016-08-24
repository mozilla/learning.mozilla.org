var React = require('react');
var ReactDOM = require('react-dom');
var ReactDOMServer = require('react-dom/server');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var RoutingContext = ReactRouter.RoutingContext;
var match = ReactRouter.match;

var routeData = require('./routes.jsx');
var Page = require('../components/page.jsx');

var locales = require('../dist/locales.json');
var ReactIntl = require('react-intl');
var IntlProvider = ReactIntl.IntlProvider;
var addLocaleData = ReactIntl.addLocaleData;
var currentLocale;

var ga = require('react-ga');
var assign = require('object-assign');

// utility function: create element wrapped in React localisation
function createElement(Component, props) {
  var locale = this.locale;
  var messages =  assign({}, locales["en-US"], locales[locale]);
  // make sure you pass all the props in!
  return (
    <IntlProvider locale={locale} messages={messages}>
      <Component {...props} />
    </IntlProvider>
  );
}

/**
 * Module return is an object with some of the internval values and
 * functions for generating the static site files.
 */
module.exports = {
  URLS: routeData.URLS,
  REDIRECTS: routeData.REDIRECTS,
  routes: routeData.routes,


  /**
   * Static function for resolving redirects for site content
   */  
  generateStaticRedirect: function generateStaticRedirect(fromURL, toURL, next) {
    match({ routes: routeData.routes, location: fromURL }, function(error, redirectLocation, renderProps) {
      if (error) {
        return next(new Error("Error in redirect from '" + fromURL +  "' to '" + toURL +  "'"));
      }
      var redirectHTML = (<p>The URL of this page has changed to <a href={toURL}>{toURL}</a>.</p>);
      var html = ReactDOMServer.renderToStaticMarkup(redirectHTML);
      next(null, html, { title: "Redirect to " + toURL });
    });
  },


  /**
   * Static function for generating the site as static html files
   */
  generateStatic: function generateStatic(url, locale, next) {
    if (url in routeData.REDIRECTS) {
      return this.generateStaticRedirect(url, redirects[url], next);
    }

    match({ routes: routeData.routes, location: url }, function(error, redirectLocation, renderProps) {
      if (error) {
        return next(new Error("Error on route '" + url +  "'"));
      }

      if (!renderProps) {
        return next(new Error("No render properties for '"+url+"'"));
      }

      var Component = renderProps.routes.slice(-1)[0].component;
      var title = Page.titleForHandler(Component);
      var html = ReactDOMServer.renderToString(<RoutingContext locale={locale} createElement={createElement} {...renderProps} />);
      next(null, html, { title: title });
    });
  },


  /**
   * Static wrapper function for GA events
   */
  run: function run(location, el) {
    var createBrowserHistory = require('history/lib/createBrowserHistory');
    var history = createBrowserHistory();

    // emit a GA page view event on location changes
    history.listen(function(location) {
      ga.pageview(location.pathname);
    });

    // Get locale from URL, use it to pass messages in to IntlProvider,
    // but not before adding appropriate locale data
    // (see ./lib/build/server-library.jsx for how that gets in here)
    var currentLocale = window.location.pathname.split('/')[1];
    var messages = assign({}, locales["en-US"], locales[currentLocale]);
    
    // Keys are languages, not locales, so we just need the first part
    addLocaleData(window.ReactIntlLocaleData[currentLocale.split('-')[0]]);

    ReactDOM.render(
      <IntlProvider locale={currentLocale} messages={messages}>
        <Router history={history}>{routeData.routes}</Router>
      </IntlProvider>, el
    );
  }
};
