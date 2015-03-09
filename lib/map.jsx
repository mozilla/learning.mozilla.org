var React = require('react');

var SingletonMapComponent = React.createClass({

    propTypes: {
      accessToken: React.PropTypes.string.isRequired,
      mapId: React.PropTypes.string.isRequired,
    },
    componentDidMount: function () {
      require('mapbox.js');
      // Create a map in the div #map
      this.map = L.mapbox.map('map', this.props.mapId, {accessToken: this.props.accessToken});
    },
    componentWillUnmount: function() {
      this.map.remove();
    },
    // Called on initialization and after each change to the components
    // props or state
    render: function () {
      return (
        <div id="map"></div>
      )
    }
  });

module.exports = SingletonMapComponent;
