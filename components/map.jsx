var React = require('react');

var Map = React.createClass({

  propTypes: {
    accessToken: React.PropTypes.string.isRequired,
    mapId: React.PropTypes.string.isRequired,
    className: React.PropTypes.string.isRequired
  },
  componentDidMount: function() {
    require('mapbox.js'); // this will automatically attach to Window object.
    this.map = L.mapbox.map(this.getDOMNode(), this.props.mapId, {
      accessToken: this.props.accessToken
    }).setView([43.597, -79.6139], 12);

    var MapLayer = L.mapbox.featureLayer(this.mapId, {accessToken: this.props.accessToken}).addTo(this.map);
    var geoJson = [{
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
        "icon": {
          "iconUrl": "/img/map-marker.svg",
          "iconSize": [33, 33], // size of the icon
          "iconAnchor": [15, 15] // point of the icon which will correspond to marker's location
        }
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
        "icon": {
          "iconUrl": "/img/map-marker.svg",
          "iconSize": [33, 33],
          "iconAnchor": [15, 15]
        }
      }
    }];
    // Set a custom icon on each marker based on feature properties.
    MapLayer.on('layeradd', function(e) {
        var marker = e.layer,
            feature = marker.feature;

        marker.setIcon(L.icon(feature.properties.icon));
    });

    // Add features to the map.
    MapLayer.setGeoJSON(geoJson);
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
