var React = require('react');

var Map = require('./map.jsx');
var PlaceholderPage = require('./placeholder-page.jsx');

var ClubsPage = React.createClass({
  statics: {
    pageClassName: 'clubs'
  },
  render: function() {
    return (
      <PlaceholderPage title="Clubs" githubIssue={44}>
        <Map accessToken={
          process.env.MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoiYWxpY29kaW5nIiwiYSI6Il90WlNFdE0ifQ.QGGdXGA_2QH-6ujyZE2oSg'
        } mapId={
          process.env.MAPBOX_MAP_ID || 'alicoding.ldmhe4f3'
        }/>
      </PlaceholderPage>
    );
  }
});

module.exports = ClubsPage;
