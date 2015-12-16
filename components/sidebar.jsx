var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router');
var classNames = require('classnames');
var Link = Router.Link;
var LinkAnchorSwap = require('./link-anchor-swap.jsx');

var Login = require('./login.jsx');
var Footer = require('./footer.jsx');

var Subitem = React.createClass({
  componentDidMount: function() {
    this.toggleHighlight();
  },
  componentDidUpdate: function() {
    this.toggleHighlight();
  },
  toggleHighlight: function() {
    var isActive = ReactDOM.findDOMNode(this).classList.contains("active");
    this.props.toggleHighlight(isActive);
  },
  render: function() {
    return (
      <Link to={this.props.link} ref={this.props.key}>
        {this.props.name}
      </Link>
    );
  }
});

var Subitems = React.createClass({
  render: function() {
    var toggleHighlight = this.props.toggleHighlight;
    var items = this.props.subItems.map(function (item, key) {
      return (
        <li key={item.name}>
          <Subitem {...item} toggleHighlight={toggleHighlight} />
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
  highlightSubNav: function(subNavActive) {
    if (subNavActive != this.state.activeSubNav) {
      this.setState({
        activeSubNav: subNavActive
      });
    }
  },
  render: function() {
    var classes = classNames(
      this.props.className,
      "top-level-item",
      {
        "sub-nav-active": this.state.activeSubNav
      }
    );
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
        {this.props.subItems ? <Subitems subItems={this.props.subItems} toggleHighlight={this.highlightSubNav} /> : null}
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
      href: 'https://discourse.webmaker.org/',
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
          <Footer/>
        </div>
      </div>
    );
  }
});

module.exports = Sidebar;
