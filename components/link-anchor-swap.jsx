var React = require('react');
var Link = require('react-router').Link;
var ga = require('react-ga');
var classNames = require('classnames');
var OutboundLink = ga.OutboundLink;

var resetreload = require('../lib/resetreload');

var LinkAnchorSwap = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },

  render: function() {
    var linkedContent = this.props.children || this.props.name;
    if (this.isExternalLink()) {
      return <OutboundLink {...this.props} eventLabel={this.props.to}>{linkedContent}</OutboundLink>;
    }
    return <Link {...this.props} to={this.getLocalizedTo()} onClick={this.handleClick}>{linkedContent}</Link>;
  },

  isExternalLink: function() {
    var link = this.props.to;    
    var weblink = (link.substr(0,4).toLowerCase() === "http");
    var maillink = (link.substr(0,7).toLowerCase() === "mailto:");
    return weblink || maillink;
  },

  getLocalizedTo: function() {
    return "/" + this.context.intl.locale + this.props.to;
  },

  // preprocess a <link> click
  handleClick: function(e) {
    this.checkForReset(e);
    this.scrollToTop();
  },

  /**
   * We use <Link> for internal links in the app, but <Link> won't reload a page if
   * that's the page we're already on, so we FORCE it to reset the <Page> instead.
   * @param {event} e the event that triggered this reset check
   * @returns {undefined}
   */
  checkForReset: function(e) {
    if (typeof window !== "undefined" ) {
      var curloc = (window.location.pathname === this.getLocalizedTo());
      if (curloc && resetreload.shouldResetOnReload()) {
        e.preventDefault();
        resetreload.reset();
      }
    }
  },

  // scroll to the top of a page when navigating
  scrollToTop: function() {
    if (typeof window !== "undefined" && window.scrollTo) {
      window.scrollTo(0,0);
    }
  }
});

module.exports = LinkAnchorSwap;
