var _ = require('underscore');
var React = require('react');
var Link = require('react-router').Link;
var ga = require('react-ga');
var OutboundLink = require('react-ga').OutboundLink;
var PureRenderMixin = require('react-addons-pure-render-mixin');
var FormattedMessage = require('react-intl').FormattedMessage;
var FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;

var withTeachAPI = require('../../hoc/with-teach-api.jsx');

var config = require('../../config/config');

var LoginLink = require('./LoginLink.jsx');
var LogoutLink = require('./LogoutLink.jsx');

var Login = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  statics: {
    teachAPIEvents: {
      'login:start': 'handleApiLoginStart',
      'login:error': 'handleApiLoginError',
      'login:success': 'handleApiLoginSuccess',
      'logout': 'handleApiLogout'
    }
  },
  componentDidMount: function() {
    var self = this;
    var teachAPI = this.props.teachAPI;
    // Send this off on its own tick, to prevent thread-blocking.
    setTimeout(function() {
      teachAPI.checkLoginStatus(function() {
        self.setState({
          username: teachAPI.getUsername()
        });
      });
    }, 0);
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
      ga.event({ category: 'Login', action: 'Teach API Error', nonInteraction:true});
    }

    this.setState({
      loggingIn: false,
      loginError: true
    });
    ga.event({ category: 'Login', action: 'Error Occurred', nonInteraction:true});
  },
  handleApiLoginStart: function() {
    this.setState({loggingIn: true});
  },
  handleApiLoginSuccess: function(info) {
    this.setState({username: this.props.teachAPI.getUsername(), loggingIn: false});
    ga.event({ category: 'Login', action: 'Logged In' });
  },
  handleApiLogout: function() {
    this.setState({username: null, loggingIn: false});
    ga.event({ category: 'Login', action: 'Logged Out' });
  },
  renderAdminLink: function() {
    var adminURL = this.props.teachAPI.getAdminURL();
    if (!adminURL) {
      return null;
    }
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
              <FormattedHTMLMessage id='unable_to_contact_login_server' />
            </small>
          </p>
        </div>
      );
    } else if (this.state.loggingIn) {
      content = (
        <div className="login-status-text">
          <FormattedHTMLMessage id="loading_message"/>
        </div>
      );
    } else if (this.state.username) {
      content = (
        <div className={"user-panel "+userPanelState}>
          <div className="login-status-text" onMouseDown={this.handleMouseDown}>
            <FormattedMessage id="hi_username" values={{name: this.state.username}}/>
          </div>
          <div className="options">
            <ul>
              { this.renderAdminLink() ? <li>{this.renderAdminLink()}</li> : null }
              <li><span className="fa fa-list"></span><Link to={"/" + this.context.intl.locale + "/me"}>{this.context.intl.formatMessage({id: 'your_projects'})}</Link></li>
              <li>
                <span className="fa fa-sign-out"></span>
                <LogoutLink loginBaseURL={this.props.teachAPI.baseURL} callbackURL={this.props.currentPath}>{this.context.intl.formatMessage({id: 'log_out'})}</LogoutLink>
              </li>
            </ul>
          </div>
        </div>
      );
    } else {
      content = (
        <div className="login-status-text">
          <LoginLink className={this.props.loginClass} loginBaseURL={this.props.teachAPI.baseURL} callbackURL={this.props.currentPath}>{this.context.intl.formatMessage({id: 'sign_in'})}</LoginLink>
          <span className="or"> {this.context.intl.formatMessage({id: 'or'})} </span>
          <LoginLink className={this.props.signinClass} loginBaseURL={this.props.teachAPI.baseURL} callbackURL={this.props.currentPath} action="signup">{this.context.intl.formatMessage({id: 'sign_up'})}</LoginLink>
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

module.exports = withTeachAPI(Login);
