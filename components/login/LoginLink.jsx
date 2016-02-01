var _ = require('underscore');
var React = require('react');
var ga = require('react-ga');
var OutboundLink = require('react-ga').OutboundLink;
var PureRenderMixin = require('react-addons-pure-render-mixin');

var config = require('../../config/config');

var exposeRouter = require('../../hoc/expose-router.jsx');

var LoginLink = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    origin: React.PropTypes.string,
    callbackSearch: React.PropTypes.string,
    action: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      origin: config.ORIGIN,
      callbackSearch: '',
      action: 'signin'
    };
  },
  render: function() {
    var callbackPath = this.props.router.getCurrentPathname() + this.props.callbackSearch;
    var callbackURL = this.props.origin + callbackPath;
    var loginBaseURL = this.props.loginBaseURL;
    var action = this.props.action;
    var href = loginBaseURL + '/auth/oauth2/authorize?callback=' + encodeURIComponent(callbackURL) + '&action=' + action;
    var props = _.extend({}, this.props, { to: href, eventLabel: href });
    if (process.env.NODE_ENV !== 'production' && !/^(signin|signup)$/.test(action)) {
      console.warn("unrecognized action: " + action);
    }
    return <OutboundLink {...props}>{this.props.children}</OutboundLink>;
  }
});

module.exports = exposeRouter(LoginLink);
