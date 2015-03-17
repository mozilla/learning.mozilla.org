var React = require('react');
var mapboxId = process.env.MAPBOX_MAP_ID || 'alicoding.ldmhe4f3';
var accessToken = process.env.MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoiYWxpY29kaW5nIiwiYSI6Il90WlNFdE0ifQ.QGGdXGA_2QH-6ujyZE2oSg';
var teachAPI = require('../lib/teach-api');

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
    var that = this;
    require('mapbox.js'); // this will automatically attach to Window object.
    require('leaflet.markercluster');
    L.mapbox.accessToken = accessToken;
    teachAPI.getAllData(function(err, data) {
      if(err) {
        console.log(err)
        return;
      }
      var geoJSON = geoJSONit(data);
      that.map = L.mapbox.map(that.getDOMNode())
        .setView([40.73, -50.011], 3)
        .addLayer(L.mapbox.tileLayer(mapboxId));
      var markers = new L.MarkerClusterGroup({
        iconCreateFunction: function(cluster) {
          return L.mapbox.marker.icon({
            'marker-symbol': cluster.getChildCount(),
            'marker-color': '#422'
          });
        }
      });
      var geoJsonLayer = L.geoJson(geoJSON);
      markers.addLayer(geoJsonLayer);
      that.map.on('layeradd', function(e) {
        var marker = e.layer,
          feature = marker.feature;

        // we have to check if this is a feature or marker-cluster
        if (feature) {
          var title = feature.properties.title,
          desc = feature.properties.title,
          location = feature.properties.location;
          marker.setIcon(L.icon({
            "iconUrl": "/img/map-marker.svg",
            "iconSize": [33, 33],
            "iconAnchor": [15, 15]
          }));
          marker.bindPopup(
            "<b>" + title + "<br></b><i>" + location + "</i><br/><br/><p>" + desc + "</p>"
          );
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
