var React = require('react');

var ImageTag = require('../components/imagetag.jsx');
var IconLinks = require('../components/icon-links.jsx');
var IconLink = require('../components/icon-link.jsx');
var Illustration = require('../components/illustration.jsx');

var Intro = React.createClass({
  render: function () {
    return (
        <div>
          <h1>About Mozilla Learning Networks</h1>
          <section className="intro">
            <Illustration width={226} height={226}
            className="img-circle"
            src1x="/img/about-page/hive-nyc-summer-quest.jpg"
            alt="HiveLearningNYC 2014 Hive NYC Summer Quest Maker Party">
              <p>We want more people to see themselves as citizens of the web. Mozilla Learning Networks offers programs and a global community dedicated to helping people learn the most important skills of our age: <em>the ability to read, write and participate in the digital world.</em></p>
            </Illustration>
          </section>
        </div>
    );
  }
});

var OurFocus = React.createClass({
  render: function () {
    return (
        <section className="row list-with-illust">
          <Illustration width={199} height={199}
          src1x="/img/about-page/about-illustration.svg"
          alt="A graphic showing an illustration of a person, a book, some gears, a map pin, and a square acedemic cap">
            <h2>Our Focus</h2>
            <ul>
              <li>
                We focus on peer learning that is production-centered, rooted in open practices, facilitated online and
                in person, and localized culturally but connected globally.
              </li>
              <li>
                We offer training and event models to help you develop and teach web literacy skills and connect with
                peers.
              </li>
              <li>
                Our curriculum and web literacy programs are modular, adaptable, and have been developed and tested in
                various learning settings.
              </li>
              <li>
                We support Hive Learning Networks, city-based communities where educators, organizations and learners
                network for greater impact.
              </li>
            </ul>
          </Illustration>
        </section>
    );
  }
});

var OurGoal = React.createClass({
  render: function () {
    return (
        <section className="row page-end our-goal">
          <ImageTag alt="A stylised icon of a city"
              className="center-block" src1x="/img/about-page/icon-city.png"
              src2x="/img/about-page/icon-city@2x.png" width={292} height={102} />
            <p className="learn-more">
              In 2015, our goal is to foster and sustain web literacy activities in 500 cities around the globe. Join us by teaching, learning, sharing and imagining the full power of the web.
            </p>
            <img src="/img/shared-iconography/icon-horizontal-divider.svg" width={292} alt="" className="center-block"/>
        </section>
    );
  }
});

var AboutPage = React.createClass({
  statics: {
    pageTitle: 'About',
    pageClassName: 'about-page'
  },
  render: function () {
    return (
        <div className="inner-container">
          <Intro/>
          <OurFocus/>
          <OurGoal/>
          <IconLinks>
            <IconLink
              href="https://twitter.com/webmaker"
              imgSrc="/img/shared-iconography/icon-twitter-blue.svg"
              imgAlt="twitter logo"
              head="Follow Us"
              subhead="Start a conversation on Twitter"
            />
            <IconLink
              href="mailto:teachtheweb@mozillafoundation.org"
              imgSrc="/img/shared-iconography/icon-get-help-blue.svg"
              imgAlt="question mark icon"
              head="Get Help"
              subhead="Email us anytime"
            />
            <IconLink
              href="http://discourse.webmaker.org/category/meet"
              imgSrc="/img/shared-iconography/icon-connect-blue.svg"
              imgAlt="illustration of two people connecting"
              head="Say Hello"
              subhead="Connect on the #teachtheweb Discourse forum"
            />
          </IconLinks>
        </div>
    );
  }
});

module.exports = AboutPage;
