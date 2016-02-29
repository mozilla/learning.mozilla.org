var React = require('react');
var Link = require('react-router').Link;
var Login = require('../login.jsx');
var Footer = require('../footer.jsx');

var Sidebar = React.createClass({
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
    var toggleClass = "glyphicon glyphicon-menu-hamburger hidden-lg hidden-md";
    var showCollapsibleContent = this.state.showCollapsibleContent ? "collapsible-content" : "collapsed collapsible-content";
    return (
      <div className="sidebar col-md-3" role="navigation">
        <div className="sidebar-header">
          <Link to={"/"}>
            <img src="/img/components/sidebar/svg/mozilla-wordmark-white.svg" alt="Mozilla Learning Home" className="moz-logo"/>
          </Link>
          <button aria-label="toggle" className={toggleClass} onClick={this.handleHamburgerClick} />
        </div>
        <div onFocus={this.handleFocus} className={showCollapsibleContent}>
          <Login currentPath={this.props.currentPath} />
          <ul className="sidebar-menu list-unstyled">
            {require('./topLevelNavItems.jsx')}
          </ul>
          <Footer/>
        </div>
      </div>
    );
  }
});

module.exports = Sidebar;
