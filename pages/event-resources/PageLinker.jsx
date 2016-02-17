var React = require('react');

var PageLinker = React.createClass({
  render: function() {
    return (
      <li className="page-linker">
        <a href={this.props.href}>{this.props.head}</a>
      </li>
    );
  }
});

module.exports = PageLinker;

