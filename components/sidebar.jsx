var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router');
var classNames = require('classnames');
var Link = Router.Link;
var LinkAnchorSwap = require('./link-anchor-swap.jsx');
var Login = require('./login.jsx');
var Footer = require('./footer.jsx');
var OutboundLink = require('react-ga').OutboundLink;

var config = require('../config/config');

var Subitem = React.createClass({
  render: function() {
    var ifExternalLink = this.props.link.substr(0,4).toLowerCase() === "http";
    return (
      ifExternalLink ?  <OutboundLink to={this.props.link} eventLabel={this.props.link} ref={this.props.key} className="external-link">{this.props.name}</OutboundLink> :
                        <Link to={this.props.link} ref={this.props.key}>{this.props.name}</Link>
    );
  }
});

var Subitems = React.createClass({
  render: function() {
    var items = this.props.subItems.map(function (item, key) {
      return (
        <li key={item.name}>
          <Subitem {...item} />
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
  toggleSubNav: function() {
    // TODO: there seems to be no way to do this without interacting with DOM.
    // Please feel free to polish this function if you find a better solution :)
    var subNavActive = ReactDOM.findDOMNode(this).querySelectorAll('a.active').length > 0;
    if ( this.state.activeSubNav != subNavActive) {
      this.setState({
        activeSubNav: subNavActive
      });
    }
  },
  componentDidMount: function() {
    // this handles the initial site load, e.g., when you visit the site directly via url or force refresh
    this.toggleSubNav();
  },
  componentDidUpdate: function() {
    // this handles the rest of the cases, i.e., switching between different views/pages after the first site load
    this.toggleSubNav();
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
      className: "activities",
      subItems: [
        {
          name: "Web Literacy",
          link: "web-literacy"
        }
      ]
    },
    {
      name: "Leadership Opportunities",
      link: 'opportunities',
      icon: "/img/components/sidebar/svg/icon-nav-maker.svg",
      className: 'opportunities',
      subItems: [
        {
          name: "Mozilla Clubs",
          link: 'mozilla-clubs'
        },
        {
          name: "Maker Party",
          link: 'events'
        },
        {
          name: "Hive Learning Networks",
          link: config.HIVE_LEARNING_NETWORKS_URL
        },
        {
          name: "MozFest",
          link: config.MOZFEST_SITE_LINK
        },
        {
          name: "Gigabit Community Fund",
          link: config.GIGABIT_SITE_LINK
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
      name: "Community",
      link: "community",
      icon: "/img/components/sidebar/svg/icon-nav-community.svg",
      className: "community",
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
