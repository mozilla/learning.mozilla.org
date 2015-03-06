var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

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

var Sidebar = React.createClass({
  MENU_ENTRIES: [
    {
      name: "Teaching Activities",
      link: '/activities/',
      help: "Activities and lesson plans to get you started"
    },
    {
      name: "Events",
      link: '/events/',
      help: "Find gatherings near you, or host your own"
    },
    {
      name: "Teach Like Mozilla",
      link: '/teach-like-mozilla/',
      help: "Learn about our approach to teaching the Web"
    },
    {
      name: "Clubs",
      link: '/clubs/',
      help: "Join our global community of local chapters"
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
          <Link to="/"><img src="/img/wm-logo.png" alt="Webmaker logo"/> Mozilla Learning</Link>
          <span aria-label="toggle" role="button" onKeyUp={this.handleHamburgerClick} onKeyDown={this.handleHamburgerClick} className="glyphicon glyphicon-menu-hamburger hidden-lg hidden-md"
                onClick={this.handleHamburgerClick} tabIndex="0" />
          <TriangleCorner className="hidden-xs hidden-sm" height={40}/>
        </div>
        <div className={this.state.showCollapsibleContent
                        ? "collapsible-content"
                        : "hidden-xs hidden-sm collapsible-content"}>
          <div className="sidebar-login">
            <a href="">Create an account</a> | <a href="">Log in</a>
          </div>
          <ul className="sidebar-menu list-unstyled">
            {this.MENU_ENTRIES.map(function(entry, i) {
              return (
                <li key={i}>
                  <Link to={entry.link || '/'}>
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
