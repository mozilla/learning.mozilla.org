var React = require('react');
var LinkAnchorSwap = require('../link-anchor-swap.jsx');

var SubItems = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function() {
    var self = this;
    var items = this.props.subItems.map(function (item, key) {
      return (
        <li key={item.name}>
          <LinkAnchorSwap name={self.context.intl.formatMessage({id: item.name})} to={item.to} activeClassName="active" />
        </li>
      );
    });
    return (
      <ul className="sidebar-subitems">
        {items}
      </ul>
    );
  }
});

module.exports = SubItems;
