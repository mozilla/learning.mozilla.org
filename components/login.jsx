var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var teachAPI = require('../lib/teach-api');

var Login = React.createClass({
  getDefaultProps: function() {
    return {
      teachAPI: teachAPI
    };
  },
  componentDidMount: function() {
    var teachAPI = this.props.teachAPI;

    teachAPI.on('login:error', this.handleApiLoginError);
    teachAPI.on('login:cancel', this.handleApiLoginCancel);
    teachAPI.on('login:success', this.handleApiLoginSuccess);
    teachAPI.on('logout', this.handleApiLogout);
    this.setState({username: this.getUsername()});
  },
  componentWillUnmount: function() {
    var teachAPI = this.props.teachAPI;

    teachAPI.removeListener('login:error', this.handleApiLoginError);
    teachAPI.removeListener('login:cancel', this.handleApiLoginCancel);
    teachAPI.removeListener('login:success', this.handleApiLoginSuccess);
    teachAPI.removeListener('logout', this.handleApiLogout);
  },
  getInitialState: function() {
    return {
      username: null,
      loggingIn: false
    };
  },
  getUsername: function() {
    var info = this.props.teachAPI.getLoginInfo();
    return info && info.username;
  },
  handleLoginClick: function(e) {
    e.preventDefault();
    this.setState({loggingIn: true});
    this.props.teachAPI.startLogin();
  },
  handleLogoutClick: function(e) {
    e.preventDefault();
    this.props.teachAPI.logout();
  },
  handleApiLoginError: function(err) {
    this.setState({loggingIn: false});
    console.log("Teach API error", err);
    if (err.hasNoWebmakerAccount) {
      window.alert("An error occurred when logging in. Are you sure you " +
                   "have a Webmaker account associated with the email " +
                   "address you used?");
    } else {
      window.alert("An error occurred! Please try again later.");
      this.props.teachAPI.logout();
    }
  },
  handleApiLoginCancel: function() {
    this.setState({loggingIn: false});
  },
  handleApiLoginSuccess: function(info) {
    this.setState({username: this.getUsername(), loggingIn: false});
  },
  handleApiLogout: function() {
    this.setState({username: null, loggingIn: false});
  },
  render: function() {
    var content;

    if (this.state.loggingIn) {
      content = (
        <span>
          Logging in&hellip;
        </span>
      );
    } else if (this.state.username) {
      content = (
        <span>
          Logged in as {this.state.username} | <a href="" onClick={this.handleLogoutClick}>Logout</a>
        </span>
      );
    } else {
      content = (
        <span>
          <Link to="join">Create an account</Link> | <a href="" onClick={this.handleLoginClick}>Log in</a>
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
