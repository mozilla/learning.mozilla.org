var html = require('html');
var React = require('react');

var Page = require('./main.jsx').Page;

module.exports = function renderStaticIndex(options) {
  return html.prettyPrint(React.renderToStaticMarkup(
    <html>
      <head>
        <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,700,600italic,700italic,800,800italic"/>
        <link rel="stylesheet" href="vendor/bootstrap/css/bootstrap.min.css"/>
        <link rel="stylesheet" href={options.stylesheetURL}/>
        <title>Mozilla Learning</title>
      </head>
      <body>
        <Page/>
      </body>
    </html>
  ), {indent_size: 2});
};
