var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var HeroUnit = require('./hero-unit.jsx');
var Blockquote = require('./blockquote.jsx');

var CaseStudies = React.createClass({
  render: function() {
    return (
      <div className="case-studies">
        <Blockquote className="primary-quote" author="Maurya C. New York, United States"
            imgSrc="/img/maurya-nyc@1x.png" imgSrc2x="/img/maurya-nyc@2x.png" imgAlt="Maurya NYC Quote" imgWidth="148">
          <p>Web literacy is about more than coding - it is about how you can be a better web citizen.</p>
        </Blockquote>

      </div>
    );
  }
});

var Values = React.createClass({
  render: function() {
    return (
      <div className="values row">
        <div className="col-sm-3 col-md-3 col-md-offset-1 col-lg-3 col-lg-offset-1">
          <ImageTag src1x="/img/values.jpg" src2x="/img/values.jpg"
              alt="Image reflecting our values" className="img-circle img-scale-to-fit"/>
        </div>
        <div className="col-sm-9 col-lg-8">
          Join our community of educators and activists who want to teach digital skills and web literacy through making. <Link to="about" className="bold-link">Learn More</Link>
        </div>
      </div>
    );
  }
});

var HomePage = React.createClass({
  render: function() {
    return (
      <div>
        <HeroUnit image="/img/hero-unit.jpg">
          <h1>Unlock opportunities for all citizens of the Web.</h1>
          <div><Link to="join" className="btn btn-awsm">Join Us</Link></div>
        </HeroUnit>
        <Values/>
        <CaseStudies/>
      </div>
    );
  }
});

module.exports = HomePage;
