var React = require('react');

var RemixLink = React.createClass({
  render: function() {
    return (
      <a className="remix-link" href={this.props.href}>Remix</a>
    );
  }
});

module.exports = RemixLink;
