var React = require('react');

var Map = React.createClass({

  propTypes: {
    accessToken: React.PropTypes.string.isRequired,
    mapId: React.PropTypes.string.isRequired,
    className: React.PropTypes.string.isRequired
  },
  componentDidMount: function() {
    require('mapbox.js'); // this will automatically attach to Window object.
    // Create a map in the div mapboxDiv element
    this.map = L.mapbox.map(this.getDOMNode(), this.props.mapId, {
      accessToken: this.props.accessToken
    }).setView([43.597, -79.6139], 12);

    L.mapbox.featureLayer([{
      // this feature is in the GeoJSON format: see geojson.org
      // for the full specification
      type: 'Feature',
      geometry: {
        type: 'Point',
        // coordinates here are in longitude, latitude order because
        // x, y is the standard for GeoJSON and many formats
        coordinates: [-79.6139,
          43.597
        ]
      },
      properties: {
        title: 'First Point',
        description: 'Party description?',
        // one can customize markers by adding simplestyle properties
        // https://www.mapbox.com/guides/an-open-platform/#simplestyle
        'marker-size': 'large',
        'marker-color': '#ff0000',
        'marker-symbol': 'circle'
      }
    }, {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-79.68793,
          43.562641
        ]
      },
      properties: {
        title: 'Second Point',
        description: 'Address I guess?',
        'marker-size': 'large',
        'marker-color': '#ff0000',
        'marker-symbol': 'circle'
      }
    }], {accessToken: this.props.accessToken}).addTo(this.map);
  },
  componentWillUnmount: function() {
    this.map.remove();
  },
  // Called on initialization and after each change to the components
  // props or state
  render: function() {
    return (
      <div className={this.props.className}></div>
    )
  }
});

module.exports = Map;
