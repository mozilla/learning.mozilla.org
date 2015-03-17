var React = require('react');

var HeroUnit = React.createClass({
  calculateDensity: function () {
    var
        ratio;

    if (typeof window !== 'undefined' && window.devicePixelRatio > 1.5) {
      ratio = 2;
    } else {
      ratio = 1;
    }

    return ratio;
  },

  getInitialState: function () {
    var image = this.props.image;
    if (this.calculateDensity() === 2) {
      image = this.props.image2x || this.props.image;
    }
    return {
      image: image
    };
  },

  propTypes: {
    'image': React.PropTypes.string.isRequired
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-md-12 hero-unit" style={{
          backgroundImage: 'url(' + this.state.image + ')'
        }}>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = HeroUnit;
