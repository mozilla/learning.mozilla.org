var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var LinkAnchorSwap = require('./link-anchor-swap.jsx');

var Login = require('./login.jsx');

var Subitems = React.createClass({
  render: function() {
    var items = this.props.subItems.map(function (item, key) {
      return (
        <li key={item.name}>
          <Link to={item.link}>
            {item.name}
          </Link>
        </li>
      )}
    );
    return (
      <ul className="sidebar-subitems">
        {items}
      </ul>
    );
  }
});

var TopLevelNavItem = React.createClass({
  getInitialState: function() {
    return {
      activeSubNav: false
    };
  },
  componentDidMount: function() {
    this.highlightActiveSubNav();
  },
  componentDidUpdate: function() {
    this.highlightActiveSubNav();
  },
  highlightActiveSubNav: function() {
    var activeState = !!this.getDOMNode().querySelector(".sidebar-subitems a.active");
    if (activeState != this.state.activeSubNav) {
      this.setState({
        activeSubNav: activeState
      });
    }
  },
  render: function() {
    var classes = this.props.className + " top-level-item";
    if (this.state.activeSubNav) {
      classes += " sub-nav-active";
    }
    return (
      <li key={this.props.name} className={classes}>
        <LinkAnchorSwap to={this.props.link} href={this.props.href}>
          <div className="img-container">
            <img src={this.props.icon}
             /* The sidebar icon is purely decorative, so leave
              * the alt attribute empty. */
             alt=""/>
          </div>
          <strong>{this.props.name}</strong>
        </LinkAnchorSwap>
        {this.props.subItems ? <Subitems subItems={this.props.subItems} /> : null}
      </li>
    );
  }
});

var Sidebar = React.createClass({
  MENU_ENTRIES: [
    {
      name: "Teaching Activities",
      link: 'activities',
      icon: "/img/components/sidebar/svg/icon-nav-activities.svg",
      className: "activities"
    },
    {
      name: "Mozilla Clubs",
      link: 'mozilla-clubs',
      icon: "/img/components/sidebar/svg/icon-nav-clubs.svg",
      className: "clubs"
    },
    {
      name: "Maker Party",
      link: 'events',
      icon: "/img/components/sidebar/svg/icon-nav-maker.svg",
      className: "events",
      subItems: [
        {
          name: "Event Resources",
          link: "event-resources"
        }
      ]
    },
    {
      name: "Tools",
      link: 'tools',
      icon: "/img/components/sidebar/svg/icon-nav-tools.svg",
      className: "tools-page"
    },
    {
      name: "Teach Like Mozilla",
      link: 'teach-like-mozilla',
      icon: "/img/components/sidebar/svg/icon-nav-tlm.svg",
      className: "teach",
      subItems: [
        {
          name: "Web Literacy",
          link: "web-literacy"
        }
      ]
    },
    {
      name: "Community",
      href: 'http://discourse.webmaker.org/',
      icon: "/img/components/sidebar/svg/icon-nav-community.svg",
      className: "community external-link",
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
  handleFocus: function() {
    this.setState({
      showCollapsibleContent: true
    });
  },
  render: function() {
    return (
      <div className="sidebar col-md-3" role="navigation">
        <div className="sidebar-header">
          <Link to="home">
            <img src="/img/components/sidebar/svg/mozilla-wordmark-white.svg" alt="Mozilla Learning Home" className="moz-logo"/>
          </Link>
          <button aria-label="toggle" className="glyphicon glyphicon-menu-hamburger hidden-lg hidden-md"
                  onClick={this.handleHamburgerClick} />
        </div>
        <div onFocus={this.handleFocus}
             className={this.state.showCollapsibleContent
                        ? "collapsible-content"
                        : "collapsed collapsible-content"}>

          <Login/>

          <ul className="sidebar-menu list-unstyled">
            {this.MENU_ENTRIES.map(function(entry, i) {
              return (
                <TopLevelNavItem key={entry.name} {...entry} />
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = Sidebar;
