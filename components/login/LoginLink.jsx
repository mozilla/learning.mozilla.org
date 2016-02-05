var _ = require('underscore');
var React = require('react');
var ga = require('react-ga');
var OutboundLink = require('react-ga').OutboundLink;
var PureRenderMixin = require('react-addons-pure-render-mixin');

var config = require('../../config/config');

var LoginLink = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    origin: React.PropTypes.string,
    callbackSearch: React.PropTypes.string,
    action: React.PropTypes.string,
    loginBaseURL: React.PropTypes.string.required,
    callbackURL: React.PropTypes.string.required
  },
  contextTypes: {
    history: React.PropTypes.object
  },
  getDefaultProps: function() {
    return {
      origin: config.ORIGIN,
      callbackSearch: '',
      action: 'signin'
    };
  },
  render: function() {
    var action = this.props.action;
    var href = this.props.loginBaseURL + '/auth/oauth2/authorize?callback=' + encodeURIComponent(this.props.callbackURL) + '&action=' + action;
    var props = _.extend({}, this.props, { to: href, eventLabel: href });
    if (process.env.NODE_ENV !== 'production' && !/^(signin|signup)$/.test(action)) {
      console.warn("unrecognized action: " + action);
    }
    return <OutboundLink {...props}>{this.props.children}</OutboundLink>;
  }
});

module.exports = LoginLink;
