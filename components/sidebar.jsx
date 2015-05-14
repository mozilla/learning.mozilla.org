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
      icon: "/img/components/sidebar/svg/icon-nav-white-materials.svg",
      className: "activities"
    },
    {
      name: "Maker Party",
      link: 'events',
      help: "Host a one-time event or workshop",
      icon: "/img/components/sidebar/svg/icon-nav-white-events.svg",
      className: "events",
      subItems: [
        {
          name: "Event Resources",
          link: "event-resources"
        }
      ]
    },
    {
      name: "Teach Like Mozilla",
      link: 'teach-like-mozilla',
      help: "Learn about our approach to teaching the Web",
      icon: "/img/components/sidebar/svg/icon-nav-white-gears.svg",
      className: "teach",
      subItems: [
        {
          name: "Web Literacy",
          link: "web-literacy"
        }
      ]
    },
    {
      name: "Mozilla Clubs",
      link: 'mozilla-clubs',
      help: "Join our global community of local chapters",
      icon: "/img/components/sidebar/svg/icon-nav-white-globe.svg",
      className: "clubs",
      subItems: [
        {
          name: "Clubs Curriculum",
          link: "clubs-curriculum"
        },
        {
          name: "Clubs Toolkit",
          link: "clubs-toolkit"
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
            <img src="/img/components/sidebar/svg/mozilla-wordmark-white.svg" alt="Mozilla Learning Home" className="moz-logo"/>
          </Link>
          <button aria-label="toggle" className="glyphicon glyphicon-menu-hamburger hidden-lg hidden-md"
                  onClick={this.handleHamburgerClick} />
        </div>
        <div className={this.state.showCollapsibleContent
                        ? "collapsible-content"
                        : "collapsed collapsible-content"}>

          <Login/>

          <ul className="sidebar-menu list-unstyled">
            {this.MENU_ENTRIES.map(function(entry, i) {
              return (
                <li key={i} className={entry.className}>
                  <Link to={entry.link}>
                    <img src={entry.icon}
                     /* The sidebar icon is purely decorative, so leave
                      * the alt attribute empty. */
                     alt=""/>
                    <strong>{entry.name}</strong>
                    <div className="help-text hidden-xs hidden-sm">{entry.help}</div>
                    <span className="glyphicon glyphicon-menu-right"></span>
                  </Link>
                  <ul className="sidebar-subitems">
                    {entry.subItems ?
                      entry.subItems.map(function (item, key) {
                        return (
                          <li key={key}>
                            <Link to={item.link}>
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
