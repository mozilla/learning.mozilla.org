/**
 * This is the server library entry point, packed
 * by ./config/webpack/webpack.server.config.js
 *
 * It exposes the generation function that can turn
 * generate static HTML for any route that maps to
 * an app page in our code.
 *
 * The resulting bundle is used in ./app.js for
 * static markup generation that looks like the
 * page requested, which then also makes sure to
 * load the client bundle so that the app can 
 * run everything client-side from there on.
 */

var _  = require('underscore');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var ReactIntl = require('react-intl');

var generator = require('../page-generator.jsx');

var Pontoon = require('../../components/pontoon.jsx');
var OptimizelySubdomain = require('../../components/optimizely-subdomain.jsx');
var Optimizely = require('../../components/optimizely.jsx');

// env vars and the like
var config = require('../../config/config');

// FIXME: this really needs to come from somewhere, not be a magic variable
var CSS_FILENAME = "styles.css";

/**
 * Generate a full HTML5 page with doctype, by injecting
 * its React page code into a standardized HTML skeleton. 
 */
function generateWithPageHTML(url, options, pageHTML) {
  options = _.defaults(options || {}, {
    meta: {}
  });
  
  var locale = options.locale || 'en-US';
  var langCode = locale.split('-')[0];

  var content = (
    <html className="no-js" lang="en">
      <head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta property="og:description" content="We want more people to see themselves as citizens of the web. The Mozilla Learning Network offers programs and a global community dedicated to helping people learn the most important skills of our age: the ability to read, write and participate in the digital world."/>
        <meta property="og:image" content={config.ORIGIN + "/img/pages/home/hero-unit.jpg"}/>
        {Object.keys(options.meta).map(function(name, i) {
          return <meta key={i} name={name} content={options.meta[name]}/>;
        })}
        <link rel="icon" href="/img/favicon.ico" type="image/x-icon"/>
        <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,700,600italic,700italic,800,800italic"/>
        <link rel="stylesheet" href="/vendor/bootstrap/css/bootstrap.min.css"/>
        <link rel="stylesheet" href="/vendor/font-awesome/css/font-awesome.min.css"/>
        <link rel="stylesheet" href="/vendor/mozilla-tabzilla/css/tabzilla.css" />
        <link rel="stylesheet" href="/vendor/mofo-ui/mofo-ui.css" />
        <link rel="stylesheet" href={'/' + CSS_FILENAME}/>
        <script src={"/vendor/react-intl/locale-data/" + langCode + ".js"}/>
        <OptimizelySubdomain />
        <Optimizely />
        <title>{options.title}</title>
      </head>
      <body>
        <div id="tabzilla"><a href="https://www.mozilla.org/">Mozilla</a></div>
        <div id="page-holder" dangerouslySetInnerHTML={{
          __html: pageHTML
        }}/>
        <script src="/commons.bundle.js"></script>
        <script src="/client.bundle.js"></script>
        <Pontoon/>
      </body>
    </html>
  );

  var htmlString = ReactDOMServer.renderToStaticMarkup(content);
  return '<!DOCTYPE html>' + htmlString;
}


module.exports = {
  CSS_FILENAME: CSS_FILENAME,
  URLS: generator.URLS,
  REDIRECTS: generator.REDIRECTS,
  routes: generator.routes,

  /**
   * generate static page HTML for a specific app route URL
   */
  generate: function generate(url, options, cb) {
    var locale = options.locale || 'en-US';
    generator.generateStatic(url, locale, function(err, html, metadata) {
      var pageHTML;

      if (err) return cb(err);
      try {
        options = _.extend({ title: metadata.title }, options);
        pageHTML = generateWithPageHTML(url, options, html);
      } catch(e) {
        err = e;
      }
      cb(err, url, metadata.title, pageHTML);
    });
  }
};
