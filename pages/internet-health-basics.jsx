var React = require('react');
var Link = require('react-router').Link;
var OutboundLink = require('react-ga').OutboundLink;

var Illustration = require('../components/illustration.jsx');
var ActivitySection = require('../components/activity-section.jsx');

var CurriculumIntro = (
  <div>
    <h1>Internet Health Basics</h1>
    <section className="intro">
      <Illustration
      height={204} width={204}
      src1x="/img/pages/internet-health-basics/internet-health-1.png"
      alt="">
        <h2>What is Internet health? What makes the internet healthy or unhealthy?</h2>
      </Illustration>
    </section>
  </div>
);

var WebLitBasics = (
  <section className="row web-lit-basics">
    <div className="col-sm-12">
      <h2>Learning Objectives</h2>
      <p>
        Help your learners make sense of ways to support an open, accessible, and healthy Internet for all with these introductory lessons about key issues facing us online.
      </p>
    </div>
  </section>
);

var curriculumList = [
  {
    title: "",
    activities: [
      {
        title: "An Introduction to Internet Health",
        image1x: "/img/pages/internet-health-basics/internet-health-1.png",
        originalImgSrc: "https://mozilla.github.io/curriculum-final/internet-health-basics/images/internet-health-1.png",
        caption: "CC-BY Mozilla",
        subtitle: "Synthesize, Protect, Share",
        description: "Learn the basics of Internet health and related issues by comparing and contrasting healthy and unhealthy behaviors on popular apps and sites using skills like evaluate, protect, share, and synthesize.",
        link: "https://mozilla.github.io/curriculum-final/internet-health-basics/session01-intro-to-internet-health.html"
      },
      {
        title: "Web Literacy",
        image1x: "/img/pages/internet-health-basics/web-literacy-1.png",
        originalImgSrc: "https://mozilla.github.io/curriculum-final/internet-health-basics/images/web-literacy-1.png",
        caption: "CC-BY Mozilla",
        subtitle: "Synthesize, Navigate, Code, Remix, Protect",
        description: "Explore what it means to read, write, and participate on the web by learning how the Internet and webpages work, learning skills like code, connect, navigate, remix, and synthesize.",
        link: "https://mozilla.github.io/curriculum-final/internet-health-basics/session02-web-literacy.html"
      },
      {
        title: "Digital Inclusion",
        image1x: "/img/pages/internet-health-basics/digital-inclusion-1.png",
        originalImgSrc: "https://mozilla.github.io/curriculum-final/internet-health-basics/images/digital-inclusion-1.png",
        caption: "CC-BY Mozilla",
        subtitle: "Evaluate, Synthesize, Compose, Connect, Open Practice, Contribute, Share",
        description: "You and your learners will make a Code of Conduct that you can use to guide inclusivity practices online and offline while practicing skills like compose, contribute, evaluate, open practice, protect, share, and synthesize.",
        link: "https://mozilla.github.io/curriculum-final/internet-health-basics/session03-digital-inclusion.html"
      },
      {
        title: "Privacy & Security",
        image1x: "/img/pages/internet-health-basics/privacy-and-security-1.png",
        originalImgSrc: "https://mozilla.github.io/curriculum-final/internet-health-basics/images/privacy-and-security-1.png",
        caption: "CC-BY Mozilla",
        subtitle: "Evaluate, Synthesize, Navigate, Search, Protect",
        description: "You and your learners will identify the privacy choices that face you every day. Then you will learn how third parties can track you online and how you can limit online tracking in your browser learning skills like evaluate, navigate, protect, search, and synthesize.",
        link: "https://mozilla.github.io/curriculum-final/internet-health-basics/session04-privacy-and-security.html"
      },
      {
        title: "Decentralization",
        image1x: "/img/pages/internet-health-basics/decentralization-1.png",
        originalImgSrc: "https://mozilla.github.io/curriculum-final/internet-health-basics/images/decentralization-1.png",
        caption: "CC-BY Mozilla",
        subtitle: "Evaluate, Synthesize, Navigate, Search, Compose, Remix, Connect, Open Practice, Share",
        description: "You and your learners will play a game to learn the importance of decentralization and summarize your learnings in 6-word stories to share online as part of a decentralized web learning skills like compose, connect, contribute, evaluate, navigate, open practice, remix, search, share, and synthesize.",
        link: "https://mozilla.github.io/curriculum-final/internet-health-basics/session05-decentralization.html"
      },
      {
        title: "Openness",
        image1x: "/img/pages/internet-health-basics/open-innovation-1.png",
        originalImgSrc: "https://mozilla.github.io/curriculum-final/internet-health-basics/images/open-innovation-1.png",
        caption: "CC-BY Mozilla",
        subtitle: "Design, Connect, Open Practice, Contribute, Share",
        description: "You and your learners will brainstorm, research, storyboard, and share new, innovative products for your peers to learn about the advantages of openness while learning skills like connect, contribute, design, open practice, and share.",
        link: "https://mozilla.github.io/curriculum-final/internet-health-basics/session06-openness.html"
      },
    ]
  }
];

var curriculum = curriculumList.map(function (section) {
  return (
    <ActivitySection title={section.title} key={section.title} activities={section.activities} />
  );
});


var InternetHealthBasics = React.createClass({
  statics: {
    pageTitle: 'Internet Health Basics',
    pageClassName: 'internet-health-basics'
  },

  render: function () {
    return (
      <div className="inner-container">
        {CurriculumIntro}
        {WebLitBasics}
        {curriculum}
      </div>
    );
  }
});

module.exports = InternetHealthBasics;
