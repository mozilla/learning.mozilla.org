var _ = require('underscore');
var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;

var config = require('../lib/config');
var TeachAPIClientMixin = require('../mixins/teach-api-client');
var ga = require('react-ga');

var LogoutLink = React.createClass({
  mixins: [TeachAPIClientMixin, Router.State, React.addons.PureRenderMixin],
  propTypes: {
    origin: React.PropTypes.string
  },
  getDefaultProps: function() {
    return {
      origin: config.ORIGIN
    };
  },
  render: function() {
    var callbackURL = this.props.origin + this.getPathname();
    var loginBaseURL = this.getTeachAPI().baseURL;
    var href = loginBaseURL + '/auth/oauth2/logout?callback=' +
               encodeURIComponent(callbackURL);
    var props = _.extend({}, this.props, {
      href: href
    });

    return React.DOM.a(props, this.props.children);
  }
});

var LoginLink = React.createClass({
  mixins: [TeachAPIClientMixin, Router.State, React.addons.PureRenderMixin],
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
    var callbackPath = this.getPathname() + this.props.callbackSearch;
    var callbackURL = this.props.origin + callbackPath;
    var loginBaseURL = this.getTeachAPI().baseURL;
    var action = this.props.action;
    var href = loginBaseURL + '/auth/oauth2/authorize?callback=' +
               encodeURIComponent(callbackURL) + '&action=' + action;
    var props = _.extend({}, this.props, {
      href: href
    });

    if (process.env.NODE_ENV !== 'production' &&
        !/^(signin|signup)$/.test(action)) {
      console.warn("unrecognized action: " + this.props.action);
    }

    return React.DOM.a(props, this.props.children);
  }
});

var Login = React.createClass({
  mixins: [TeachAPIClientMixin],
  statics: {
    LoginLink: LoginLink,
    LogoutLink: LogoutLink,
    teachAPIEvents: {
      'login:start': 'handleApiLoginStart',
      'login:error': 'handleApiLoginError',
      'login:success': 'handleApiLoginSuccess',
      'logout': 'handleApiLogout'
    }
  },
  componentDidMount: function() {
    var teachAPI = this.getTeachAPI();

    teachAPI.checkLoginStatus();
    this.setState({username: teachAPI.getUsername()});
  },
  getInitialState: function() {
    return {
      username: null,
      loggingIn: false,
      loginError: false
    };
  },
  handleApiLoginError: function(err) {
    if (!config.IN_TEST_SUITE) {
      console.log("Teach API error", err);
      ga.event({ category: 'Login', action: 'Teach API Error',
                nonInteraction:true});
    }

    this.setState({
      loggingIn: false,
      loginError: true
    });
    ga.event({ category: 'Login', action: 'Error Occurred',
               nonInteraction:true});
  },
  handleApiLoginStart: function() {
    this.setState({loggingIn: true});
  },
  handleApiLoginSuccess: function(info) {
    this.setState({username: this.getTeachAPI().getUsername(),
                   loggingIn: false});
    ga.event({ category: 'Login', action: 'Logged In' });
  },
  handleApiLogout: function() {
    this.setState({username: null, loggingIn: false});
    ga.event({ category: 'Login', action: 'Logged Out' });
  },
  render: function() {
    var content;

    if (this.state.loginError) {
      content = (
        <span><small>
          <span className="glyphicon glyphicon-flash"/>&nbsp;
          Unable to contact login server.
          <br/>
          <span className="glyphicon glyphicon-flash" style={{
            opacity: '0'
          }}/>&nbsp;
          Refresh the page to try again.
        </small></span>
      );
    } else if (this.state.loggingIn) {
      content = (
        <span>
          Loading&hellip;
        </span>
      );
    } else if (this.state.username) {
      content = (
        <span>
          Logged in as {this.state.username} | <LogoutLink>Logout</LogoutLink>
        </span>
      );
    } else {
      content = (
        <span>
          <LoginLink action="signup">Create an account</LoginLink> | <LoginLink>Log in</LoginLink>
        </span>
      );
    }

    return (
      <div className="sidebar-login">
        {content}
      </div>
    );
  }
});

module.exports = Login;
