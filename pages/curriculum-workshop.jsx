var React = require('react');
var HeroUnit = require('../components/hero-unit.jsx');
// use this LinkAnchorSwap component for hyperlinks
var LinkAnchorSwap = require('../components/link-anchor-swap.jsx');

var CurriculumWorkshop = React.createClass({
  statics: {
    pageClassName: 'curriculum-workshop'
  },
  render: function () {
    return (
      <div>
        <HeroUnit>
          <h1>Mozilla Curriculum Workshop</h1>
        </HeroUnit>
        <div className="inner-container">
        
        </div>
      </div>
    );
  }
});

module.exports = CurriculumWorkshop;
