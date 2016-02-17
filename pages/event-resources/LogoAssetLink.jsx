var React = require('react');

var LogoAssetLink = React.createClass({
  render: function() {
    return (
      <a className="logo-asset-link" href={this.props.href}><span className="fa fa-download">&nbsp;</span>{this.props.children}</a>
    );
  }
});


module.exports = LogoAssetLink;

