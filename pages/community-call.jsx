var React = require('react');
var HeroUnit = require('../components/hero-unit.jsx');
// use this LinkAnchorSwap component for hyperlinks
var LinkAnchorSwap = require('../components/link-anchor-swap.jsx');
var Illustration = require('../components/illustration.jsx');

var CommunityCallPage = React.createClass({
  statics: {
    pageClassName: 'community-call'
  },
  render: function () {
    return (
        <div className="inner-container">

          HELLO WORLD

        </div>
    );
  }
});

module.exports = CommunityCallPage;
