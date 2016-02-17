var React = require('react');

var WebMaps = React.createClass({
  render: function() {
    return (
      <div className="row web-maps">{this.props.children}</div>
    );
  }
});

module.exports = WebMaps;
