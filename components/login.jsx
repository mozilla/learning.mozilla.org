var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var config = require('../lib/config');
var TeachAPIClientMixin = require('../mixins/teach-api-client');
var ga = require('react-ga');

var Login = React.createClass({
  mixins: [TeachAPIClientMixin],
  statics: {
    teachAPIEvents: {
      'login:error': 'handleApiLoginError',
      'login:cancel': 'handleApiLoginCancel',
      'login:success': 'handleApiLoginSuccess',
      'logout': 'handleApiLogout'
    }
  },
  getDefaultProps: function() {
    return {
      alert: defaultAlert
    };
  },
  componentDidMount: function() {
    this.setState({username: this.getTeachAPI().getUsername()});
  },
  getInitialState: function() {
    return {
      username: null,
      loggingIn: false
    };
  },
  handleLoginClick: function(e) {
    e.preventDefault();
    this.setState({loggingIn: true});
    ga.event({ category: 'Login', action: 'Start Login' });
    if (config.ENABLE_OAUTH2) {
      this.getTeachAPI().startOAuth2Login();
    } else {
      this.getTeachAPI().startLogin();
    }
  },
  handleSignupClick: function(e) {
    e.preventDefault();
    if (!config.ENABLE_OAUTH2) {
      window.alert("You need to signup for webmaker at webmaker.org, " +
                   "then log in here using the same email address.");
      return;
    }
    this.setState({loggingIn: true});
    // TODO: Add a ga.event here for signup.
    this.getTeachAPI().startOAuth2Login(null, 'signup');
  },
  handleLogoutClick: function(e) {
    e.preventDefault();
    ga.event({ category: 'Login', action: 'Clicked Logout' });
    if (config.ENABLE_OAUTH2) {
      this.getTeachAPI().startOAuth2Logout();
    } else {
      this.getTeachAPI().logout();
    }
  },
  handleApiLoginError: function(err) {
    this.setState({loggingIn: false});

    if (!config.IN_TEST_SUITE) {
      console.log("Teach API error", err);
      ga.event({ category: 'Login', action: 'Teach API Error',
                nonInteraction:true});
    }

    if (err.hasNoWebmakerAccount) {
      this.props.alert(
        "An error occurred when logging in. Are you sure you " +
        "have a Webmaker account associated with the email " +
        "address you used?"
      );
      ga.event({ category: 'Login', action: 'Error: Has no Webmaker Account',
                nonInteraction:true});
    } else {
      this.props.alert("An error occurred! Please try again later.");
      ga.event({ category: 'Login', action: 'Error Occurred',
                nonInteraction:true});
    }
  },
  handleApiLoginCancel: function() {
    this.setState({loggingIn: false});
    ga.event({ category: 'Login', action: 'Cancelled Login' });
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
          <a href="" onClick={this.handleSignupClick}>Create an account</a> | <a href="" onClick={this.handleLoginClick}>Log in</a>
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

function defaultAlert(message) {
  if (process.browser) {
    window.alert(message);
  } else {
    console.log("User alert: " + message);
  }
}

module.exports = Login;
