var React = require('react');
var LinkAnchorSwap = require('../link-anchor-swap.jsx');

var SubItems = React.createClass({
  render: function() {
    var items = this.props.subItems.map(function (item, key) {
      return (
        <li key={item.name}>
          <LinkAnchorSwap {...item} activeClassName="active" />
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

module.exports = SubItems;
