var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var TeachAPI = require('../lib/teach-api');

var TriangleCorner = React.createClass({
  propTypes: {
    'height': React.PropTypes.number.isRequired,
    'className': React.PropTypes.string
  },
  render: function() {
    var height = this.props.height;
    var width = Math.floor(height / Math.sqrt(3));
    var points = [
      [0, height].join(','),
      [width, height].join(','),
      [width, 0].join(',')
    ];

    return (
      <svg className={"corner " + this.props.className} width={width} height={height}>
        <polygon points={points}/>
      </svg>
    );
  }
});

var Login = React.createClass({
  componentDidMount: function() {
    var teachAPI = new TeachAPI();
    teachAPI.on('login:error', this.handleApiLoginError);
    teachAPI.on('login:cancel', this.handleApiLoginCancel);
    teachAPI.on('login:success', this.handleApiLoginSuccess);
    teachAPI.on('logout', this.handleApiLogout);
    this.teachAPI = teachAPI;
    this.setState({username: this.getUsername()});
  },
  getInitialState: function() {
    return {
      username: null,
      loggingIn: false
    };
  },
  getUsername: function() {
    var info = this.teachAPI.getLoginInfo();
    return info && info.username;
  },
  handleLoginClick: function(e) {
    e.preventDefault();
    this.setState({loggingIn: true});
    this.teachAPI.startLogin();
  },
  handleLogoutClick: function(e) {
    e.preventDefault();
    this.teachAPI.logout();
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
      this.teachAPI.logout();
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

var Sidebar = React.createClass({
  MENU_ENTRIES: [
    {
      name: "Teaching Activities",
      link: 'activities',
      help: "Activities and lesson plans to get you started",
      icon: "/img/nav/icon-nav-white-materials.svg",
      className: "activities"
    },
    {
      name: "Events",
      link: 'events',
      help: "Find gatherings near you, or host your own",
      icon: "/img/nav/icon-nav-white-events.svg",
      className: "events"
    },
    {
      name: "Teach Like Mozilla",
      link: 'teach-like-mozilla',
      help: "Learn about our approach to teaching the Web",
      icon: "/img/nav/icon-nav-white-gears.svg",
      className: "teach"
    },
    {
      name: "Clubs",
      link: 'clubs',
      help: "Join our global community of local chapters",
      icon: "/img/nav/icon-nav-white-globe.svg",
      className: "clubs"
    }
  ],
  getInitialState: function() {
    return {
      showCollapsibleContent: false
    };
  },
  handleHamburgerClick: function() {
    this.setState({
      showCollapsibleContent: !this.state.showCollapsibleContent
    });
  },
  render: function() {
    return (
      <div className="sidebar col-md-3">
        <div className="sidebar-header">
          <Link to="home"><img src="/img/wm-logo.jpg" width="60" alt="Webmaker logo"/> Mozilla Learning</Link>
          <span aria-label="toggle" role="button" onKeyUp={this.handleHamburgerClick} onKeyDown={this.handleHamburgerClick} className="glyphicon glyphicon-menu-hamburger hidden-lg hidden-md"
                onClick={this.handleHamburgerClick} tabIndex="0" />
          <TriangleCorner className="hidden-xs hidden-sm" height={40}/>
        </div>
        <div className={this.state.showCollapsibleContent
                        ? "collapsible-content"
                        : "hidden-xs hidden-sm collapsible-content"}>
          <Login/>
          <ul className="sidebar-menu list-unstyled">
            {this.MENU_ENTRIES.map(function(entry, i) {
              return (
                <li key={i}>
                  <Link to={entry.link}>
                    <img src={entry.icon} alt={entry.name} className={entry.className}/>
                    <strong>{entry.name}</strong>
                    <div className="help-text hidden-xs hidden-sm">{entry.help}</div>
                    <span className="glyphicon glyphicon-menu-right"></span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = Sidebar;
