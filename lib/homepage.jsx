var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Page = require('./page.jsx');
var HeroUnit = require('./hero-unit.jsx');

var CaseStudies = React.createClass({
  render: function() {
    return (
      <div className="case-studies">
        <blockquote className="primary-quote">
          <img src="/img/maurya-nyc@2x.png" alt="Maurya NYC Quote" width="148" />
          Web literacy is about more than coding - it is about how you can be a better web citizen.
          <small>Maurya C. New York, United States</small>
        </blockquote>
      </div>
    );
  }
});

var Values = React.createClass({
  render: function() {
    return (
      <div className="values row">
        <div className="col-sm-3 col-md-3 col-md-offset-1 col-lg-3 col-lg-offset-1">
          <img src="/img/values.jpg" className="img-circle img-scale-to-fit"
               alt="Image reflecting our values"/>
        </div>
        <div className="col-sm-9 col-lg-8">
          Join our community of educators and activists who want to teach digital skills and web literacy through making. <Link to="about" className="bold-link">Learn More</Link>
        </div>
      </div>
    );
  }
});

var Homepage = React.createClass({
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

module.exports = Homepage;
