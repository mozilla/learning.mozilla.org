var React = require('react'),
    Badge = require('./badge.jsx');

var BadgeVerticalIcon = React.createClass({
  render: function() {
    var badge = this.props.badge;
    return (
      <div className='badge-vertical-icon'>
        <Badge badge={badge} anonymous={this.props.anonymous}/>
        <div className="badge-text text-center">
          {
            this.props.anonymous ? null : [
              <div key="title" className="title">{badge.title}</div>,
              <div key="description" className="description">{badge.description}</div>
            ]
          }
        </div>
      </div>
    )
  }
});

module.exports = BadgeVerticalIcon;
