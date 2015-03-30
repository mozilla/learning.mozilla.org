var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Login = require('./login.jsx');

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
      className: "teach",
      subItems: [
        {
          name: "Web Literacy",
          link: "web-literacy",
          help: "skills and competencies needed for reading, writing and participating on the web."
        }
      ]
    },
    {
      name: "Mozilla Web Clubs",
      link: 'mozilla-web-clubs',
      help: "Join our global community of local chapters",
      icon: "/img/nav/icon-nav-white-globe.svg",
      className: "clubs",
      subItems: [
        {
          name: "Clubs Curriculum",
          link: "clubs-curriculum",
          help: "Activities to teach the web in your club."
        },
        {
          name: "Clubs Toolkit",
          link: "clubs-toolkit",
          help: "todo hover tooltip"
        }
      ]
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
          <Link to="home">
            <img src="/img/nav/mozilla-wordmark-white.svg" alt="Webmaker logo" className="moz-logo"/>
          </Link>
          <span aria-label="toggle" role="button" onKeyUp={this.handleHamburgerClick} onKeyDown={this.handleHamburgerClick} className="glyphicon glyphicon-menu-hamburger hidden-lg hidden-md"
                onClick={this.handleHamburgerClick} tabIndex="0" />
        </div>
        <div className={this.state.showCollapsibleContent
                        ? "collapsible-content"
                        : "hidden-xs hidden-sm collapsible-content"}>
          <Login/>
          <ul className="sidebar-menu list-unstyled">
            {this.MENU_ENTRIES.map(function(entry, i) {
              return (
                <li key={i} className={entry.className}>
                  <Link to={entry.link}>
                    <img src={entry.icon} alt={entry.name}/>
                    <strong>{entry.name}</strong>
                    <div className="help-text hidden-xs hidden-sm">{entry.help}</div>
                    <span className="glyphicon glyphicon-menu-right"></span>
                  </Link>
                  <ul className="sidebar-subitems">
                    {entry.subItems ?
                      entry.subItems.map(function (item, key) {
                        return (
                          <li key={key}>
                            <Link to={item.link} title={item.help}>
                              {item.name}
                            </Link>
                          </li>
                        )}
                      ) : ''}
                  </ul>
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
