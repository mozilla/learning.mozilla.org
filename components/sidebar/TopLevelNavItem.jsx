var React = require('react');
var ReactDOM = require('react-dom');
var classNames = require('classnames');
var LinkAnchorSwap = require('../link-anchor-swap.jsx');
var SubItems = require('./SubItems.jsx');

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
        <LinkAnchorSwap to={this.props.to} activeClassName="active">
          <div className="img-container">
            <img src={this.props.icon} alt=""/>
          </div>
          <strong>{this.props.name}</strong>
        </LinkAnchorSwap>
        {this.props.subItems ? <SubItems subItems={this.props.subItems} /> : null}
      </li>
    );
  }
});

module.exports = TopLevelNavItem;
