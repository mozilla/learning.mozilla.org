var _  = require('underscore');
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var fs = require('fs');
var Path = require('path');

var config = require('../../config/config');
var generator = require('../page-generate.jsx');
var OptimizelySubdomain = require('../../components/optimizely-subdomain.jsx');
var Optimizely = require('../../components/optimizely.jsx');
var ReactIntl = require('react-intl');
var Pontoon = require('../../components/pontoon.jsx');

// FIXME: this really needs to come from somewhere, not be a magic variable
var CSS_FILENAME = "styles.css";

// This isn't actually called in node, it's stringified and plopped in
// a script tag in the page header. It's basically an extremely simple
// stand-in for Modernizr, but if it becomes more complex we should think
// about actually migrating to that library.
//
// Modernizr code borrowed:
//
// * cors (needed to reach teach-api)
function featureDetect() {
  var safeMode = /[?&]safemode=on/i.test(window.location.search);
  var cors = 'XMLHttpRequest' in window && 'withCredentials' in new XMLHttpRequest();

  if (!safeMode && cors) {
    document.documentElement.setAttribute('class', '');
    window.ENABLE_JS = true;
  } else {
    window.ENABLE_JS = false;
  }
}

function generateWithPageHTML(url, options, pageHTML) {
  options = _.defaults(options || {}, {
    meta: {}
  });
  var locale = options.locale || 'en-US';
  var localeData = fs.readFileSync(Path.join('node_modules/react-intl/locale-data/' + locale.split('-')[0] + '.js'), 'utf8');

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
        <script dangerouslySetInnerHTML={{__html: localeData}}></script>
        <OptimizelySubdomain />
        <Optimizely />
        <script dangerouslySetInnerHTML={{
          __html: "(" + featureDetect.toString() + ")();"
        }}></script>
        <title>{options.title}</title>
      </head>
      <body>
        <div className="no-js-warning">
          Please <a href="https://browser-update.org/update.html">update your browser</a> or
          enable JavaScript to access this website{"'"}s full functionality.
        </div>
        <div id="tabzilla"><a href="https://www.mozilla.org/">Mozilla</a></div>
        <div id="page-holder" dangerouslySetInnerHTML={{
          __html: pageHTML
        }}></div>
        <script src="/commons.bundle.js"></script>
        <script src="/app.bundle.js"></script>
        <Pontoon/>
      </body>
    </html>
  );

  var htmlString = ReactDOMServer.renderToStaticMarkup(content);
  return '<!DOCTYPE html>' + htmlString;
}

function generate(url, options, cb) {
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
};

module.exports = {
  generate: generate,
  CSS_FILENAME: CSS_FILENAME,
  URLS: generator.URLS,
  REDIRECTS: generator.REDIRECTS,
  routes: generator.routes
};
