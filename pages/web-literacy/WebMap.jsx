var React = require('react');

var WebMap = React.createClass({
  render: function() {
    return (
      <div className="web-map col-sm-4 col-md-4 col-lg-4">
        <h2>{this.props.head}</h2>
        <span>{this.props.subhead}</span>
        <div className="web-map-contents">
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = WebMap;
