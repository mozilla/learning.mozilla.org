var React = require('react');

var Page = require('./page.jsx');
var HeroUnit = require('./hero-unit.jsx');
var Ia = require('./ia.jsx');

var CaseStudy = React.createClass({
  render: function() {
    var study = this.props.study;

    return (
      <div className="col-sm-4 col-sm-offset-1 case-study">
        <img className="img-scale-to-fit" src={study.img}
             alt={study.alt}/>
        <h2>{study.name}</h2>
        <p>{study.description} <a href="" className="bold-link">Read More</a></p>
      </div>
    );
  }
});

var CaseStudies = React.createClass({
  CASE_STUDIES: [
    {
      name: "Sadia's story",
      img: "img/sadia.jpg",
      alt: "Photo of Sadia",
      description: "This is a story about how a young girl started a Webmaker club at her school in Bangladesh in order to teach other kids how to code."
    },
    {
      name: "Masud's story",
      img: "img/masud.jpg",
      alt: "Photo of Masud",
      description: "This is a story about how a young man got certification through our program and was able to find a job to support his family."
    }
  ],
  render: function() {
    return (
      <div className="case-studies">
        <blockquote className="primary-quote">
          <div><span className="quote-symbol"/></div>
          Every morning, I wake up wondering what I can change.
        </blockquote>
        <div className="row">
          <CaseStudy study={this.CASE_STUDIES[0]}/>
          <div className="col-sm-1 divider"></div>
          <CaseStudy study={this.CASE_STUDIES[1]}/>
        </div>
        <div className="become-a-mentor">
          <a href="" className="btn btn-awsm">Become A Mentor</a>
        </div>
      </div>
    );
  }
});

var Values = React.createClass({
  render: function() {
    return (
      <div className="values row">
        <div className="col-sm-4 col-sm-offset-1">
          <img src="img/values.jpg" className="img-circle img-scale-to-fit"
               alt="Image reflecting our values"/>
        </div>
        <div className="col-sm-6">
           Join our community of educators, parents, techies and makers who want to teach digital skills and web literacy through making. <a href="" className="bold-link">Learn More</a>
        </div>
      </div>
    );
  }
});

var Homepage = React.createClass({
  render: function() {
    return (
      <Page>
        <HeroUnit image="img/hero-unit.jpg">
          <h1>Unlock opportunities for all citizens of the Web.</h1>
          <div><Ia href="/foo/" className="btn btn-awsm">Join Us</Ia></div>
        </HeroUnit>
        <Values/>
        <CaseStudies/>
      </Page>
    );
  }
});

module.exports = Homepage;
