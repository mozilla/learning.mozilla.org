var urlParse = require('url').parse;
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
        "url": i.url,
        "owner": i.owner,
        "description": i.description,
        "website": i.website,
        "location": i.location,
        "title": i.name
      },
      "type": "Feature"
    }
  });
}

// Note that this class will always be rendered to static markup, so
// it can't have any dynamic functionality.
//
// Furthermore, because we aren't a "live" React element, events
// dispatched from the map will need to be processed when they bubble
// up to the parent map component.
var MarkerPopup = React.createClass({
  getWebsiteDomain: function() {
    return urlParse(this.props.website).hostname;
  },
  render: function() {
    var actions = null;

    if (this.props.isOwned) {
      actions = (
        <div>
          <button className="btn btn-default btn-xs"
           data-club-action="edit" data-club-url={this.props.url}>
            <span className="glyphicon glyphicon-pencil"></span> Edit
          </button>
          &nbsp;
          <button className="btn btn-default btn-xs"
           data-club-action="delete" data-club-url={this.props.url}
           data-club-name={this.props.title}>
            <span className="glyphicon glyphicon-trash"></span> Remove
          </button>
        </div>
      );
    }

    return (
      <div>
        <b>{this.props.title}<br/></b>
        <i>{this.props.location}</i>
        <br/>
        <br/>
        <p>{this.props.description}</p>
        <p><a href={this.props.website} target="_blank">
          {this.getWebsiteDomain()}
        </a></p>
        {actions}
      </div>
    );
  }
});

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
      var html;
      var marker = e.layer;
      var feature = marker.feature;

      // we have to check if this is a feature or marker-cluster.
      if (feature) {
        html = React.renderToStaticMarkup(React.createElement(MarkerPopup, {
          isOwned: feature.properties.owner == this.props.username,
          url: feature.properties.url,
          title: feature.properties.title,
          description: feature.properties.description,
          website: feature.properties.website,
          location: feature.properties.location
        }));

        marker.setIcon(L.icon({
          "iconUrl": "/img/map-marker.svg",
          "iconSize": [33, 33],
          "iconAnchor": [15, 15]
        }));
        marker.bindPopup(html);
      }
    }.bind(this));
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
    if (this.props.clubs !== prevProps.clubs ||
        this.props.username !== prevProps.username) {
      this.updateMap();
    }
  },
  componentWillUnmount: function() {
    if (this.map) {
      this.map.remove();
    }
  },
  handleClick: function(e) {
    var targetEl = e.target;
    var action = targetEl.getAttribute('data-club-action');
    var url = targetEl.getAttribute('data-club-url');

    if (!action) {
      return;
    }

    if (action == 'delete') {
      this.props.onDelete(url, targetEl.getAttribute('data-club-name'));
    } else if (action == 'edit') {
      this.props.onEdit(url);
    } else {
      console.warn('unknown action: ' + action);
    }
  },
  render: function() {
    return (
      <div className={this.props.className} onClick={this.handleClick}></div>
    )
  }
});

module.exports = Map;
