var urlParse = require('url').parse;
var React = require('react');
var request = require('superagent');

var config = require('../lib/config');

var DEFAULT_STYLESHEETS = config.IN_TEST_SUITE ? [] : [
  'https://api.tiles.mapbox.com/mapbox.js/v2.1.5/mapbox.css',
  'https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v0.4.0/MarkerCluster.css',
  'https://api.tiles.mapbox.com/mapbox.js/plugins/leaflet-markercluster/v0.4.0/MarkerCluster.Default.css'
];

var mapboxId = process.env.MAPBOX_MAP_ID || 'alicoding.ldmhe4f3';
var accessToken = process.env.MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoiYWxpY29kaW5nIiwiYSI6Il90WlNFdE0ifQ.QGGdXGA_2QH-6ujyZE2oSg';

function geoJSONit(data) {
  var places = {};

  data.forEach(function(i) {
    var key = JSON.stringify([i.longitude*1, i.latitude*1]);

    if (!(key in places)) {
      places[key] = {
        "geometry": {
          "coordinates": [i.longitude*1, i.latitude*1],
          "type": "Point"
        },
        "properties": {
          "clubs": []
        },
        "type": "Feature"
      };
    }

    places[key].properties.clubs.push({
      "url": i.url,
      "owner": i.owner,
      "description": i.description,
      "website": i.website,
      "location": i.location,
      "status": i.status,
      "title": i.name
    });
  });

  return _.values(places);
}

// Note that the MarkerPopup classes will always be rendered to static
// markup, so they can't have any dynamic functionality.
//
// Furthermore, because they aren't "live" React elements, events
// dispatched from the popup will need to be processed when they bubble
// up to the parent map component.
var MarkerPopup = React.createClass({
  propTypes: {
    clubs: React.PropTypes.array.isRequired,
    username: React.PropTypes.string
  },
  render: function() {
    return (
      <div>
        {this.props.clubs.map(function(club, i) {
          return React.createElement(MarkerPopupClub, _.extend({
            key: i,
            isOwned: club.owner == this.props.username
          }, club));
        }, this)}
      </div>
    );
  }
});

var ClubStatusLabel = React.createClass({
  propTypes: {
    status: React.PropTypes.oneOf([
      'pending',
      'approved',
      'denied'
    ]).isRequired,
    showApproved: React.PropTypes.bool
  },
  render: function() {
    if (this.props.status === 'pending') {
      return (
        <span className="label label-warning"
         title="This club is pending approval and is not visible to other users.">
          pending
        </span>
      );
    } else if (this.props.status === 'denied') {
      return (
        <span className="label label-danger"
         title="This club has been denied approval and is not visible to other users.">
          denied
        </span>
      );
    }
    if (this.props.showApproved) {
      return (
        <span className="label label-success"
         title="This club has been approved and is visible to everyone.">
          approved
        </span>
      );
    } else {
      return <span></span>;
    }
  }
});

var MarkerPopupClub = React.createClass({
  getWebsiteDomain: function() {
    return urlParse(this.props.website).hostname;
  },
  render: function() {
    var website = null;
    var actions = null;

    if (this.props.website) {
      website = (
        <p><a href={this.props.website} target="_blank">
          {this.getWebsiteDomain()}
        </a></p>
      );
    }

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
        <b>{this.props.title} <ClubStatusLabel status={this.props.status}/><br/></b>
        <i>{this.props.location}</i>
        <br/>
        <br/>
        <p>{this.props.description}</p>
        <p><small>Led by <a href={"https://webmaker.org/en-US/search?type=user&q=" + this.props.owner}>{this.props.owner}</a></small></p>
        {website}
        {actions}
      </div>
    );
  }
});

var Map = React.createClass({
  propTypes: {
    className: React.PropTypes.string.isRequired,
    clubs: React.PropTypes.array.isRequired,
    username: React.PropTypes.string,
    onDelete: React.PropTypes.func.isRequired,
    onEdit: React.PropTypes.func.isRequired,
    stylesheets: React.PropTypes.array,
    onReady: React.PropTypes.func
  },
  statics: {
    ClubStatusLabel: ClubStatusLabel,
    MarkerPopup: MarkerPopup,
    clubsToGeoJSON: geoJSONit,
    setAccessToken: function(value) {
      accessToken = value;
    },
    simplifyMapboxGeoJSON: function(features) {
      return features.filter(function(feature) {
        return /^place/.test(feature.id);
      }).map(function(feature) {
        var context = feature.context.filter(function(item) {
          return /^(region|country)/.test(item.id);
        }).map(function(item) {
          return item.text;
        });
        var info = {
          location: [feature.text].concat(context).join(', '),
          latitude: feature.center[1],
          longitude: feature.center[0]
        };

        return info;
      });
    },
    getAutocompleteOptions: function(input, callback) {
      var url = '//api.tiles.mapbox.com/v4/geocode/mapbox.places/' +
                encodeURIComponent(input) +
                '.json?access_token=' + accessToken;
      if (!input) {
        return process.nextTick(function() {
          callback(null, {
            options: []
          });
        });
      }
      request('get', url)
        .accept('json')
        .end(function(err, res) {
          if (err) {
            return callback(err);
          }
          // Mapbox sets its content-type to 'application/vnd.geo+json',
          // which superagent doesn't think is JSON, so we'll parse the
          // JSON ourselves.
          var features = JSON.parse(res.text).features;
          callback(null, {
            options: Map.simplifyMapboxGeoJSON(features).map(function(info) {
              return {
                value: JSON.stringify(info),
                label: info.location
              };
            })
          });
        });
    }
  },
  getDefaultProps: function() {
    return {
      stylesheets: DEFAULT_STYLESHEETS
    };
  },
  installStylesheets: function() {
    var head = document.getElementsByTagName('head')[0];
    this.props.stylesheets.filter(function(url) {
      return !document.querySelector('link[href="' + url + '"]');
    }).forEach(function(url) {
      var link = document.createElement('link');
      link.setAttribute('href', url);
      link.setAttribute('rel', 'stylesheet');
      head.appendChild(link);
    });
  },
  componentDidMount: function() {
    var self = this;
    this.installStylesheets();
    require([
      // These will automatically attach to the window object.
      'mapbox.js',
      'leaflet.markercluster'
    ], function() {
      self.mapboxLoaded = true;
      if (self.isMounted()) {
        self.handleDependenciesLoaded();
      }
    });
  },
  handleDependenciesLoaded: function() {
    L.mapbox.accessToken = accessToken;
    this.map = L.mapbox.map(this.refs.map.getDOMNode())
      .setView([0, 0], 2)
      .addLayer(L.mapbox.tileLayer(mapboxId));
    this.markers = new L.MarkerClusterGroup({
      iconCreateFunction: function(cluster) {
        return L.mapbox.marker.icon({
          'marker-symbol': cluster.getChildCount(),
          'marker-color': '#422'
        });
      }
    });

    this.map.on('layeradd', function(e) {
      var html;
      var marker = e.layer;
      var feature = marker.feature;

      // we have to check if this is a feature or marker-cluster.
      if (feature) {
        html = React.renderToStaticMarkup(
          <MarkerPopup clubs={feature.properties.clubs}
                       username={this.props.username} />
        );

        marker.setIcon(L.icon({
          "iconUrl": "/img/components/map/svg/map-marker.svg",
          "iconSize": [33, 33],
          "iconAnchor": [15, 15]
        }));
        marker.bindPopup(html);
      }
    }.bind(this));
    this.map.addLayer(this.markers);
    this.updateMap();

    this.map.scrollWheelZoom.disable();
    this.map.on('focus', function() {
      this.setState({focused: true});
      this.map.scrollWheelZoom.enable();
    }.bind(this));
    this.map.on('blur', function() {
      this.setState({focused: false});
      this.map.scrollWheelZoom.disable();
    }.bind(this));

    // We're doing this manually instead of via JSX markup to
    // ensure that react-a11y doesn't complain about our lack of
    // accessibility markup; such warnings are false positives, as
    // we're only catching events that bubble up from the static
    // marker popup button clicks to make *those* buttons usable,
    // rather than offering any new kind of interactivity.
    this.getDOMNode().addEventListener('click', this.handleClick);
    if (this.props.onReady) {
      this.props.onReady();
    }
  },
  getInitialState: function() {
    return {
      focused: false
    };
  },
  updateMap: function() {
    if (this.geoJsonLayer) {
      this.markers.removeLayer(this.geoJsonLayer);
    }
    this.geoJsonLayer = L.geoJson(geoJSONit(this.props.clubs));
    this.markers.addLayer(this.geoJsonLayer);
  },
  componentDidUpdate: function(prevProps, prevState) {
    if (!this.mapboxLoaded) {
      return;
    }
    if (this.props.clubs !== prevProps.clubs ||
        this.props.username !== prevProps.username) {
      this.updateMap();
    }
  },
  componentWillUnmount: function() {
    this.getDOMNode().removeEventListener('click', this.handleClick);
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
  focusOnClub: function(club) {
    var latLng = L.latLng(club.latitude, club.longitude);
    this.map.setView(latLng, 5, {
      pan: {
        animate: true,
        duration: 1
      },
      zoom: {
        animate: true
      }
    });
  },
  render: function() {
    var className = "map " + this.props.className +
                    (this.state.focused ? " map-focused" : "");
    return (
      <div className={className}>
        <div ref="map"></div>
      </div>
    )
  }
});

module.exports = Map;
