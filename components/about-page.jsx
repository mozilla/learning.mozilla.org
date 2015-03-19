var React = require('react');
var ImageTag = require('./imagetag.jsx');
var IconLinks = require('./icon-links.jsx');

var Intro = React.createClass({
  render: function () {
    return (
        <header className="row intro">
          <div>
            <h2>About Mozilla Learning Networks</h2>
            <p>We want more people to see themselves as citizens of the web.</p>
            <p>
              Mozilla Learning Networks offers programs and a global community dedicated to helping people learn the most
              important skills of our age:
              <em>the ability to read, write and participate in the digital world.</em>
            </p>
          </div>
          <div className="col-sm-3 col-md-3 col-lg-3">
            <ImageTag src1x="/img/about-page/hive-nyc-summer-quest.jpg"
                alt="HiveLearningNYC 2014 Hive NYC Summer Quest Maker Party" className="img-circle img-scale-to-fit"/>
          </div>
        </header>
    );
  }
});

var OurFocus = React.createClass({
  render: function () {
    return (
        <section className="row list-with-illust">
          <div className="col-sm-4 col-md-4 col-lg-4">
            <img src="/img/about-page/about-illustration.svg"
                alt="A graphic showing an illustration of a person, a book, some gears, a map pin, and a square acedemic cap" />
          </div>
          <div className="col-sm-8 col-md-8 col-lg-8">
            <h2>Our Focus</h2>
            <ul>
              <li>
                We focus on peer learning that is production-centered, rooted in open practices, facilitated online and
                in-person, localized culturally but connected globally.
              </li>
              <li>
                We offer training and event models to help you develop and teach web literacy skills, and connect with
                peers.
              </li>
              <li>
                Our curriculum and web literacy programs are modular, adaptable, and have been developed and tested in
                various learning settings.
              </li>
              <li>
                We support Hive Learning Networks, city-based communities where educators, organizations and learners
                are networked for greater impact.
              </li>
            </ul>
          </div>
        </section>
    );
  }
});

var OurGoal = React.createClass({
  render: function () {
    return (
        <section className="row our-goal">
          <img src="/img/shared-iconography/icon-city.svg" alt="A stylised icon of a city"/>
          <p>
            In 2015, our goal is to foster and sustain web literacy activities in 500 cities around the globe. Join us
            by teaching, learning, sharing and imagining the full power of the web.
          </p>
          <img src="/img/shared-iconography/icon-horizontal-divider.svg" alt=""/>
        </section>
    );
  }
});

var AboutPage = React.createClass({
  statics: {
    pageClassName: 'about-page'
  },
  render: function () {
    return (
        <div>
          <Intro/>
          <OurFocus/>
          <OurGoal/>
          <IconLinks links={[
            {
              linkTo: "https://twitter.com/webmaker",
              imgSrc: "/img/shared-iconography/icon-twitter.svg",
              imgAlt: "twitter logo",
              head: "Follow Us",
              subhead: "Start a conversation on Twitter"
            },
            {
              linkTo: "mailto:help@webmaker.org",
              imgSrc: "/img/shared-iconography/icon-get-help.svg",
              imgAlt: "question mark icon",
              head: "Get Help",
              subhead: "Email us anytime"
            },
            {
              linkTo: "http://discourse.webmaker.org/category/meet",
              imgSrc: "/img/shared-iconography/icon-connect.svg",
              imgAlt: "illustration of two people connecting",
              head: "Say Hello",
              subhead: "Connect on the Discourse forum"
            }
          ]}/>
        </div>
    );
  }
});

module.exports = AboutPage;
