var React = require('react');

var EventDetail = React.createClass({
  render: function() {
    return (
      <div>
        <div className="event-detail-head col-sm-3 col-md-3 col-lg-3">{this.props.head}</div>
        <div className="event-detail-content col-sm-9 col-md-9 col-lg-9">{this.props.children}</div>
      </div>
    );
  }
});

module.exports = EventDetail;
