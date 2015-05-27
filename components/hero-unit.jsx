var React = require('react');

var config = require('../lib/config');

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
    var marquee = null;

    if (config.IN_STATIC_SITE &&
        /[?&]marquee=MOZILLAAAAAAAAA/.test(window.location.search)) {
      marquee = (
        <marquee>
          <span style={{color: 'transparent'}}>
            MOZILLAAAAAAAAA!!
          </span>
          <img src="/img/components/hero-unit/svg/mozilla_wordmark_white.svg" alt="Mozilla logo"/>
        </marquee>
      );
    }

    return (
      <div className="row hero-unit-row">
        <div className="col-md-12 hero-unit" style={{
          backgroundImage: 'url(' + this.state.image + ')'
        }}>
          <div>
            <div className="inner-container">
              {marquee}
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = HeroUnit;
