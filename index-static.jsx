var React = require('react');

var main = require('./main.jsx');

function generate(url, options) {
  options = options || {};
  var reactElement = main.reactElementForPage(url || '/');
  var pageHTML = React.renderToString(reactElement);

  // Make sure any changes to this file are reflected in
  // index.html too.
  var content = (
    <html>
      <head>
        <meta charSet="utf-8"/>
        <meta name="url" value={url}/>
        {options.baseURL ? <base href={options.baseURL}/> : null}
        <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,700,600italic,700italic,800,800italic"/>
        <link rel="stylesheet" href="vendor/bootstrap/css/bootstrap.min.css"/>
        <link rel="stylesheet" href={exports.CSS_FILENAME}/>
        <title>Mozilla Learning</title>
      </head>
      <body>
        <div id="page-holder" dangerouslySetInnerHTML={{
          __html: pageHTML
        }}></div>
        <script src={exports.JS_FILENAME}></script>
      </body>
    </html>
  );

  return React.renderToStaticMarkup(content);
};

exports.generate = generate;
exports.CSS_FILENAME = "stylesheet.css";
exports.JS_FILENAME = "bundle.js";
exports.URLS = Object.keys(main.PAGES);

if (typeof(document) !== 'undefined')
  React.render(
    main.reactElementForPage(
      document.querySelector('meta[name=url]').getAttribute('value')
    ),
    document.getElementById('page-holder')
  );
