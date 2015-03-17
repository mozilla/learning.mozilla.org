var React = require('react');
var mapboxId = process.env.MAPBOX_MAP_ID || 'alicoding.ldmhe4f3';
var Map = React.createClass({

  propTypes: {
    accessToken: React.PropTypes.string.isRequired,
    className: React.PropTypes.string.isRequired
  },
  componentDidMount: function() {
    var that = this;
    require('mapbox.js'); // this will automatically attach to Window object.
    require('leaflet.markercluster');
    L.mapbox.accessToken = this.props.accessToken;
    // TODO: The ID in the featureLayer should be change to our internal
    // GeoJSON once we have the server side database setup.
    var mb = L.mapbox.featureLayer('examples.map-h61e8o8e');
    that.map = L.mapbox.map(this.getDOMNode())
      .setView([40.73, -74.011], 13)
      .addLayer(L.mapbox.tileLayer(mapboxId));
    var markers = new L.MarkerClusterGroup({
      iconCreateFunction: function(cluster) {
        return L.mapbox.marker.icon({
          'marker-symbol': cluster.getChildCount(),
          'marker-color': '#422'
        });
      }
    });
    mb.on('ready', function () {
      var geoJson = mb.getGeoJSON();
      var geoJsonLayer = L.geoJson(geoJson);
      markers.addLayer(geoJsonLayer);
      that.map.on('layeradd', function(e) {
        var marker = e.layer,
          feature = marker.feature;
        // we have to check if this is a feature or marker-cluster
        if (feature) {
          marker.setIcon(L.icon({
          "iconUrl": "/img/map-marker.svg",
          "iconSize": [33, 33],
          "iconAnchor": [15, 15]
        }));
        }

      });
      that.map.addLayer(markers);

    });

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
