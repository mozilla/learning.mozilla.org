var React = require('react');

var HeroUnit = React.createClass({
  propTypes: {
    'image': React.PropTypes.string.isRequired
  },
  render: function() {
    var image = this.props.image;
    if (typeof window !== 'undefined' && window.devicePixelRatio > 1.5) {
      image = this.props.image2x || this.props.image;
    }
    return (
      <div className="row">
        <div className="col-md-12 hero-unit" style={{
          backgroundImage: 'url(' + image + ')'
        }}>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = HeroUnit;
