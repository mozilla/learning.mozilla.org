var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var LinkAnchorSwap = React.createClass({
  render: function() {
    // FIXME
    // we should find a way to properly intercept external links
    // and render <Link> or <a> accordingly as well as their relevant props
    // (icon-link.jsx and icon-button.jsx need to be revisted too)

    // Swap out Link or a simple anchor depending on the props we have.
    if (this.props.to) {
      return (
        <Link to={this.props.to}>
          {this.props.children}
        </Link>
      )
    }
    return (
      <a href={this.props.href}>
        {this.props.children}
      </a>
    )
  }
});

module.exports = LinkAnchorSwap;
