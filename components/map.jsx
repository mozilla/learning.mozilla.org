var React = require('react');

var Map = React.createClass({

    propTypes: {
      accessToken: React.PropTypes.string.isRequired,
      mapId: React.PropTypes.string.isRequired,
    },
    componentDidMount: function () {
      require('mapbox.js'); // this will automatically attach to Window object.
      // Create a map in the div mapboxDiv element
      this.map = L.mapbox.map(this.refs.mapboxDiv.getDOMNode(), this.props.mapId, {accessToken: this.props.accessToken});
    },
    componentWillUnmount: function() {
      this.map.remove();
    },
    // Called on initialization and after each change to the components
    // props or state
    render: function () {
      return (
        <div ref="mapboxDiv"></div>
      )
    }
  });

module.exports = Map;
