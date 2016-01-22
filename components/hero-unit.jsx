var React = require('react');

var config = require('../lib/build/config');

var HeroUnit = React.createClass({
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
      <div className="row">
        <div className="col-md-12 hero-unit">
          {marquee}
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = HeroUnit;
