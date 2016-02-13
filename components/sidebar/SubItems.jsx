var React = require('react');
var SubItem = require('./SubItem.jsx');

var SubItems = React.createClass({
  render: function() {
    var items = this.props.subItems.map(function (item, key) {
      return (
        <li key={item.name}>
          <SubItem {...item} />
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
