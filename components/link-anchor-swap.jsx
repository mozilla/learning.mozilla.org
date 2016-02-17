var React = require('react');
var Link = require('react-router').Link;
var ga = require('react-ga');
var classNames = require('classnames');
var OutboundLink = ga.OutboundLink;

var LinkAnchorSwap = React.createClass({
  render: function() {
    var link = this.props.to;
    var ifExternalLink = (link.substr(0,4).toLowerCase() === "http") || (link.substr(0,7).toLowerCase() === "mailto:");
    var classes = classNames(
      this.props.className,
      {
        "external-link": ifExternalLink
      }
    );
    var linkedContent = this.props.children || this.props.name;
    return (
      ifExternalLink ?  <OutboundLink eventLabel={link} {...this.props}>{linkedContent}</OutboundLink> :
                        <Link {...this.props}>{linkedContent}</Link>
    );
  }
});

module.exports = LinkAnchorSwap;
