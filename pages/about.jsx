var React = require('react');

var ImageTag = require('../components/imagetag.jsx');
var IconLinks = require('../components/icon-links.jsx');
var IconLink = require('../components/icon-link.jsx');
var Illustration = require('../components/illustration.jsx');

var config = require('../config/config');

var Intro = (
  <div>
    <h1>About the Mozilla Learning Network</h1>
    <section className="intro">
      <Illustration width={226} height={226}
      src1x="/img/pages/about/hive-nyc-summer-quest.jpg"
      alt="HiveLearningNYC 2014 Hive NYC Summer Quest Maker Party">
        <p>
          We are cultivating a global network of web literacy leaders who are teaching and
          learning the most important skills of our age: the ability to read, write and
          participate in the digital world. Our programs and resources can help you make
          an impact in your community, and participate in an openly networked world.
        </p>
      </Illustration>
    </section>
  </div>
);

var OurFocus = (
  <section className="row list-with-illust">
    <Illustration width={199} height={199}
    src1x="/img/pages/home/svg/icon-circle-home.svg"
    alt="A graphic showing an illustration of a person, a book, some gears, a map pin, and a square acedemic cap">
      <ul className="colored-list">
        <li>Learn and deepen your 21st Century digital skills, and get better at teaching them to others.</li>
        <li>Contribute to real-world products and projects that are open, participatory and networked.</li>
        <li>
          Access free resources like event planning guides and step-by-step teaching activities, or share
          your own resources to receive feedback from peers.
        </li>
        <li>Develop your skills in facilitative leadership, participatory practices and collaboration.</li>
      </ul>
    </Illustration>
  </section>
);

var OurGoal = (
  <section className="row page-end our-goal">
    <div className="horizontal-divider"></div>
    <p className="learn-more">
      In 2015, our goal is to foster and sustain web literacy activities in 500 cities around the globe.
      Join us by teaching, learning, sharing and imagining the full power of the web.
    </p>
    <div className="horizontal-divider"></div>
  </section>
);

var IconLinks = (
  <IconLinks>
    <IconLink
      link={config.TWITTER_LINK}
      imgSrc="/img/pages/about/svg/icon-twitter-blue.svg"
      width={60}
      head="Follow Us"
      subhead="Start a conversation on Twitter."
      highlightedText="Twitter"
    />
    <IconLink
      link={"mailto:"+config.TEACH_THE_WEB_EMAIL}
      imgSrc="/img/pages/about/svg/icon-get-help-blue.svg"
      head="Get Help"
      subhead="Email us anytime."
      highlightedText="Email us"
    />
    <IconLink
      link="https://discourse.webmaker.org/t/if-youre-new-to-the-community-please-introduce-yourself"
      imgSrc="/img/pages/about/svg/icon-connect-blue.svg"
      head="Say Hello"
      subhead="Connect on the Discourse forum."
      highlightedText="Discourse forum"
    />
  </IconLinks>
);

var AboutPage = React.createClass({
  statics: {
    pageTitle: 'About',
    pageClassName: 'about-page'
  },
  render: function () {
    return (
      <div className="inner-container">
        {Intro}
        {OurFocus}
        {OurGoal}
        {IconLinks}
      </div>
    );
  }
});

module.exports = AboutPage;
