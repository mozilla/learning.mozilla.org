var React = require('react');

var HeroUnit = React.createClass({
  propTypes: {
    'image': React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <div className="row">
        <div className="col-md-12 hero-unit hero-unit-1x" style={{
          backgroundImage: 'url(' + this.props.image + ')'
        }}>
          {this.props.children}
        </div>
        <div className="col-md-12 hero-unit hero-unit-2x" style={{
          backgroundImage: 'url(' + this.props.image2x || this.props.image + ')'
        }}>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = HeroUnit;
