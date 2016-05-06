var React = require('react'),
  Badge = require('./badge.jsx');

var BadgeHorizontalIcon = React.createClass({
  propTypes: { badge: React.PropTypes.object.isRequired },

  render: function() {
    return (
      <div className='badge-details'>
        <Badge badge={this.props.badge} />
        <h2>{ this.props.badge.title }</h2>
        <div>{ this.props.badge.description }</div>
      </div>
    )
  }
});

module.exports = BadgeHorizontalIcon;
