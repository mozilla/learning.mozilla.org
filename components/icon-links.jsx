var React = require('react');

var IconLinks = React.createClass({
  render: function() {
    return (
      <div className="row icon-links">{this.props.children}</div>
    );
  }
});

module.exports = IconLinks;
