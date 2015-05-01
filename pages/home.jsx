var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var HeroUnit = require('../components/hero-unit.jsx');
var Blockquote = require('../components/blockquote.jsx');
var Illustration = require('../components/illustration.jsx');

var CaseStudies = React.createClass({
  render: function() {
    return (
      <div className="case-studies">
        <Blockquote className="primary-quote" author="Maurya C. New York, United States"
            imgSrc="/img/pages/home/maurya-nyc.png" imgSrc2x="/img/pages/home/maurya-nyc@2x.png" imgAlt="Maurya NYC Quote">
          <p>Web literacy is about more than coding - it's about how you can be a better web citizen.</p>
        </Blockquote>
      </div>
    );
  }
});

var HomePage = React.createClass({
  render: function() {
    return (
      <div>
        <HeroUnit image="/img/pages/home/hero-unit.png"
                  image2x="/img/pages/home/hero-unit@2x.png">
          <h1>Unlock opportunities for all citizens of the Web.</h1>

        </HeroUnit>
        <div className="inner-container">
          <div className="values">
            <Illustration
            height={226} width={226}
            className="img-circle"
            src1x="/img/pages/home/values.jpg" src2x="/img/pages/home/values.jpg"
            alt="Image reflecting our values">
              Join our community of educators and activists who want to teach digital skills and web literacy through making. <Link to="about" className="bold-link">Learn More</Link>
            </Illustration>
          </div>
          <CaseStudies/>
        </div>
      </div>
    );
  }
});

module.exports = HomePage;
