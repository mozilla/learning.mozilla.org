var _ = require('underscore');
var React = require('react');
var mapboxId = process.env.MAPBOX_MAP_ID || 'alicoding.ldmhe4f3';
var accessToken = process.env.MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoiYWxpY29kaW5nIiwiYSI6Il90WlNFdE0ifQ.QGGdXGA_2QH-6ujyZE2oSg';

function geoJSONit(data) {
  return data.map(function(i) {
    return {
      "geometry": {
        "coordinates": [i.longitude*1, i.latitude*1],
        "type": "Point"
      },
      "properties": {
        "description": i.description,
        "location": i.location,
        "title": i.name
      },
      "type": "Feature"
    }
  });
}

var Map = React.createClass({
  propTypes: {
    className: React.PropTypes.string.isRequired
  },
  componentDidMount: function() {
    require('mapbox.js'); // this will automatically attach to Window object.
    require('leaflet.markercluster');
    L.mapbox.accessToken = accessToken;
    this.map = L.mapbox.map(this.getDOMNode())
      .setView([40.73, -50.011], 5)
      .addLayer(L.mapbox.tileLayer(mapboxId));
    this.markers = new L.MarkerClusterGroup({
      iconCreateFunction: function(cluster) {
        return L.mapbox.marker.icon({
          'marker-symbol': cluster.getChildCount(),
          'marker-color': '#422'
        });
      }
    });

    this.map.fitBounds([[65, 0], [-65, 0]]);

    this.map.on('layeradd', function(e) {
      var marker = e.layer;
      var feature = marker.feature;

      // we have to check if this is a feature or marker-cluster.
      if (feature) {
        var title = feature.properties.title;
        var desc = feature.properties.title;
        var location = feature.properties.location;

        marker.setIcon(L.icon({
          "iconUrl": "/img/map-marker.svg",
          "iconSize": [33, 33],
          "iconAnchor": [15, 15]
        }));
        marker.bindPopup(
          "<b>" + _.escape(title) + "<br></b><i>" +
          _.escape(location) + "</i><br/><br/><p>" +
          _.escape(desc) + "</p>"
        );
      }
    });
    this.map.addLayer(this.markers);
    this.updateMap();
  },
  updateMap: function() {
    if (this.geoJsonLayer) {
      this.markers.removeLayer(this.geoJsonLayer);
    }
    this.geoJsonLayer = L.geoJson(geoJSONit(this.props.clubs));
    this.markers.addLayer(this.geoJsonLayer);
  },
  componentDidUpdate: function(prevProps, prevState) {
    if (this.props.clubs !== prevProps.clubs) {
      this.updateMap();
    }
  },
  componentWillUnmount: function() {
    if (this.map) {
      this.map.remove();
    }
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
