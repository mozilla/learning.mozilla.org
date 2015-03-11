var React = require('react');

var HeroUnit = require('./hero-unit.jsx');
var Map = require('./map.jsx');

function placeholderPage(options) {
  return React.createClass({
    statics: {
      pageClassName: options.pageClassName
    },
    render: function() {
      return (
        <div>
          <HeroUnit image="/img/hero-unit.jpg">
            <h1>Placeholder: {options.title}</h1>
          </HeroUnit>
          <h2>This is a placeholder page for &ldquo;{options.title}&rdquo;.</h2>
          {options.githubIssue
           ? <p>Discussion about this page can be found on GitHub at <a
               href={"https://github.com/mozilla/teach.webmaker.org/issues/" +
                     options.githubIssue}>
                 <code style={{
                   color: '#1F93D0',
                   backgroundColor: '#f0f0f0'
                 }}>mozilla/teach.webmaker.org#{options.githubIssue}</code>
               </a>.
             </p>
           : null}
          {options.pageClassName == 'clubs'
            ? <Map accessToken={
                process.env.MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoiYWxpY29kaW5nIiwiYSI6Il90WlNFdE0ifQ.QGGdXGA_2QH-6ujyZE2oSg'
              } mapId={
                process.env.MAPBOX_MAP_ID || 'alicoding.ldmhe4f3'
              }/> : null}
        </div>
      );
    }
  })
}

module.exports = placeholderPage;
