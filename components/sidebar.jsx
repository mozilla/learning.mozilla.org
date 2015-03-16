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
    teachAPI.on('error', this.handleApiError);
    teachAPI.on('login', this.handleApiLogin);
    teachAPI.on('logout', this.handleApiLogout);
    this.teachAPI = teachAPI;
    this.setState({username: this.getUsername()});
  },
  getInitialState: function() {
    return {
      username: null
    };
  },
  getUsername: function() {
    var info = this.teachAPI.getLoginInfo();
    return info && info.username;
  },
  handleLoginClick: function(e) {
    e.preventDefault();
    this.teachAPI.startLogin();
  },
  handleLogoutClick: function(e) {
    e.preventDefault();
    this.teachAPI.logout();
  },
  handleApiError: function(err) {
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
  handleApiLogin: function(info) {
    this.setState({username: this.getUsername()});
  },
  handleApiLogout: function() {
    this.setState({username: null});
  },
  render: function() {
    var username = this.state.username;

    return (
      <div className="sidebar-login">
        {username
         ? <span>
             Logged in as {username} | <a href="" onClick={this.handleLogoutClick}>Logout</a>
           </span>
         : <span>
             <Link to="join">Create an account</Link> | <a href="" onClick={this.handleLoginClick}>Log in</a>
           </span>}
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
