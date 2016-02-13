var React = require('react');
var Link = require('react-router').Link;
var OutboundLink = require('react-ga').OutboundLink;

var SubItem = React.createClass({
  render: function() {
    var ifExternalLink = this.props.link.substr(0,4).toLowerCase() === "http";
    return (
      ifExternalLink ?  <OutboundLink to={this.props.link} eventLabel={this.props.link} ref={this.props.key} className="external-link">{this.props.name}</OutboundLink> :
                        <Link to={this.props.link} ref={this.props.key}>{this.props.name}</Link>
    );
  }
});

module.exports = SubItem;
