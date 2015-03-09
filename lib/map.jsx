var React = require('react');

var MapComponent = React.createClass({

    propTypes: {
      accessToken: React.PropTypes.string.isRequired,
      mapId: React.PropTypes.string.isRequired,
    },

    componentDidMount: function () {
      console.log('here1')
      // Provide your access token
      L.mapbox.accessToken = this.props.accessToken;

      // Create a map in the div #map
      var map = L.mapbox.map('map', this.props.mapId);
    },

    // Called on initialization and after each change to the components
    // props or state
    render: function () {
      return (
        <div id="map"></div>
      )
    }
  });

module.exports = MapComponent;
