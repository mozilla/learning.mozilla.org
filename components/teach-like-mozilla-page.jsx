var React = require('react');

var HeroUnit = require('./hero-unit.jsx');

var TeachLikeMozillaPage = React.createClass({
  statics: {
    pageClassName: 'teach-like-mozilla'
  },
  render: function() {
    return <HeroUnit
      image="/img/teach-like-mozilla-page/banner-teach-like-mozilla.jpg"
      image2x="/img/teach-like-mozilla-page/banner-teach-like-mozilla@2x.jpg">
      <h1>Teach like Mozilla</h1>
      <h2>We learn best by making & reflecting, together.</h2>
    </HeroUnit>;
  }
});

module.exports = TeachLikeMozillaPage;
