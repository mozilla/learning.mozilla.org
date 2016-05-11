var React = require('react');

var config = require('../config/config');

var HeroUnit = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-md-12 hero-unit">
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = HeroUnit;
