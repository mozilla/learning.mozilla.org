var _ = require('underscore');
var React = require('react');
var ga = require('react-ga');
var PureRenderMixin = require('react-addons-pure-render-mixin');

var config = require('../../config/config');

var LogoutLink = React.createClass({
  mixins: [PureRenderMixin],
  contextTypes: {
    router: React.PropTypes.func
  },
  propTypes: {
    origin: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      origin: config.ORIGIN
    };
  },
  render: function() {
    var callbackURL = this.props.origin + this.context.router.getCurrentPathname();
    var loginBaseURL = this.props.loginBaseURL;
    var href = loginBaseURL + '/auth/oauth2/logout?callback=' + encodeURIComponent(callbackURL);
    var props = _.extend({}, this.props, { href: href });
    return <a {...props}>{this.props.children}</a>;
  }
});

module.exports = LogoutLink;
