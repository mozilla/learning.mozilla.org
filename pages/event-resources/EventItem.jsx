var React = require('react');

var EventItem = React.createClass({
  propTypes: {
    participants: React.PropTypes.string.isRequired,
    linkToGuide: React.PropTypes.string.isRequired,
    head: React.PropTypes.string.isRequired,
    subHead: React.PropTypes.string.isRequired,
    content: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <div className="event-item">
        <div className="event-icon">
          <div className="participants-number">{this.props.participants}</div>
          <div className="participants-label">participants</div>
        </div>
        <div className="event-content">
          <div className="event-item-header"><a href={this.props.linkToGuide}>{this.props.head}</a></div>
          <div className="event-item-subheader">{this.props.subHead}</div>
          <p className="event-item-content">{this.props.content}</p>
        </div>
      </div>
    );
  }
});

module.exports = EventItem;

