var _ = require('underscore');
var React = require('react');
var OutboundLink = require('react-ga').OutboundLink;
var PureRenderMixin = require('react-addons-pure-render-mixin');

var config = require('../../config/config');

var LogoutLink = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    loginBaseURL: React.PropTypes.string,
    callbackURL: React.PropTypes.string
  },
  render: function() {
    var callbackURL = this.props.callbackURL,
        loginBaseURL = this.props.loginBaseURL,
        href = loginBaseURL + '/auth/oauth2/logout?callback=' + encodeURIComponent(callbackURL),
        props = _.extend({}, this.props, { to: href, eventLabel: href });

    return <OutboundLink {...props}>{this.props.children}</OutboundLink>;
  }
});

module.exports = LogoutLink;
