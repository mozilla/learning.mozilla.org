var _ = require('underscore');
var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var config = require('../lib/build/config');
var TeachAPIClientMixin = require('../mixins/teach-api-client');
var ga = require('react-ga');
var OutboundLink = require('react-ga').OutboundLink;

var PureRenderMixin = require('react-addons-pure-render-mixin');

var LogoutLink = React.createClass({
  mixins: [TeachAPIClientMixin, PureRenderMixin],
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
    var callbackURL = this.props.origin +
                      this.context.router.getCurrentPathname();
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
  mixins: [TeachAPIClientMixin, PureRenderMixin],
  contextTypes: {
    router: React.PropTypes.func
  },
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
    var callbackPath = this.context.router.getCurrentPathname() +
                       this.props.callbackSearch;
    var callbackURL = this.props.origin + callbackPath;
    var loginBaseURL = this.getTeachAPI().baseURL;
    var action = this.props.action;
    var href = loginBaseURL + '/auth/oauth2/authorize?callback=' +
               encodeURIComponent(callbackURL) + '&action=' + action;
    var props = _.extend({}, this.props, {
      to: href,
      eventLabel: href
    });

    if (process.env.NODE_ENV !== 'production' &&
        !/^(signin|signup)$/.test(action)) {
      console.warn("unrecognized action: " + action);
    }

    return React.createElement(OutboundLink, props, this.props.children);
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
      loginError: false,
      userPanelExpanded: false
    };
  },
  collapse: function() {
    this.setState({
      userPanelExpanded: false
    });
  },
  expand: function() {
    this.setState({
      userPanelExpanded: true
    });
  },
  handleMouseDown: function(e) {
    if (this.state.userPanelExpanded) {
      this.collapse();
    } else {
      this.expand();
    }
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
  renderAdminLink: function() {
    var adminURL = this.getTeachAPI().getAdminURL();

    if (!adminURL) return null;
    return (
      <div>
        <span className="fa fa-wrench"></span>
        <a href={adminURL}>
          Site Administration
        </a>
      </div>
    );
  },
  render: function() {
    var content;
    var userPanelState = this.state.userPanelExpanded ? "expanded" : "collapsed";

    if (this.state.loginError) {
      content = (
        <div className="login-status-text">
          <p>
            <small>
              <span className="fa fa-wrench"/>
              Unable to contact login server.
              <br/>
              Refresh the page to try again.
            </small>
          </p>
        </div>
      );
    } else if (this.state.loggingIn) {
      content = (
        <div className="login-status-text">
          Loading&hellip;
        </div>
      );
    } else if (this.state.username) {
      content = (
        <div className={"user-panel "+userPanelState}>
          <div className="login-status-text" onMouseDown={this.handleMouseDown}>
            Hi, {this.state.username}
          </div>
          <div className="options">
            <ul>
              { this.renderAdminLink() ? <li>{this.renderAdminLink()}</li> : null }
              <li><span className="fa fa-list"></span><Link to="me">Your Projects</Link></li>
              <li><span className="fa fa-sign-out"></span><LogoutLink>Log Out</LogoutLink></li>
            </ul>
          </div>
        </div>
      );
    } else {
      content = (
        <div className="login-status-text">
          <LoginLink>Sign in</LoginLink>
          <span className="or"> or </span>
          <LoginLink action="signup">Sign Up</LoginLink>
        </div>
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
