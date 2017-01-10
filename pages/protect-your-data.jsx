var React = require('react');
var Link = require('react-router').Link;

var Illustration = require('../components/illustration.jsx');
var ActivitySection = require('../components/activity-section.jsx');

var Intro = (
  <div>
    <h1>Privacy Basics: Protect Your Data</h1>
    <section className="intro">
      <Illustration
      height={204} width={204}
      src1x="/img/pages/protect-your-data/ip-tracer-badge.jpg"
      alt="hexoganal badge with magnifying glass icon">
        <h2>These activities will help your learners understand how to take control of their privacy in a networked world. Learn web literacy skills like evaluate, navigate, open practice, and protect to safeguard your data and identity online.</h2>
      </Illustration>
    </section>
  </div>
);

var LearningObjectives = (
  <section className="row web-lit-basics">
    <div className="col-sm-12">
      <h2>Learning Objectives</h2>
      <p>
        Learners will understand how to create secure passwords, monitor their online privacy and security, protect their data, and identify online trackers using web literacy skills like <strong>evaluate</strong>, <strong>navigate</strong>, <strong>open practice</strong>, and <strong>protect</strong>.
      </p>
    </div>
  </section>
);

var sectionList = [
  {
    activities: [
      {
        title: "IP Tracer",
        image1x: "/img/pages/protect-your-data/img-iptracer.png",
        image2x: "/img/pages/protect-your-data/img-iptracer@2x.png",
        subtitle: "Navigate, Search",
        description: "You will explore the internet using internet protocol addresses - or IP addresses - to follow and map the connections between websites and devices, learning about <strong>navigate</strong> and <strong>search</strong>.",
        link: "https://mozilla.github.io/curriculum-final/privacy-basics/session01-ip-tracer.html"
      },
      {
        title: "Bad Password Collage",
        image1x: "/img/pages/protect-your-data/img-password.png",
        image2x: "/img/pages/protect-your-data/img-password@2x.png",
        subtitle: "Evaluate, Protect",
        description: "You will learn about weak and strong passwords and test the strength of different passwords using tools called password meters. You will also make a &#34;bad password collage,&#34; learning web literacy skills like <strong>evaluate</strong> and <strong>protect</strong>.",
        link: "https://mozilla.github.io/curriculum-final/privacy-basics/session02-bad-password-collage.html"
      },
      {
        title: "Cookies and Third-Party Tracking",
        image1x: "/img/pages/protect-your-data/img-cookies.png",
        image2x: "/img/pages/protect-your-data/img-cookies@2x.png",
        subtitle: "Navigate, Open Practice, Protect",
        description: "You will use a privacy tool called Mozilla Lightbeam to see how websites track your movement online, learning web literacy skills like <strong>navigate</strong>, <strong>open practice</strong>, and <strong>protect</strong>.",
        link: "https://mozilla.github.io/curriculum-final/privacy-basics/session03-cookies-and-third-party-tracking.html"
      },
      {
        title: "Create Secure Passwords",
        image1x: "/img/pages/protect-your-data/pass-phrase.jpg",
        subtitle: "Evaluate, Protect",
        description: "You will learn several different ways to generate secure passwords and pass-phrases and test their strength, learning web literacy skills like <strong>evaluate</strong> and <strong>protect</strong>.",
        link: "https://mozilla.github.io/curriculum-final/privacy-basics/session04-create-secure-passwords.html"
      },
      {
        title: "Data Trail Timeline",
        image1x: "/img/pages/protect-your-data/img-datatrail.png",
        image2x: "/img/pages/protect-your-data/img-datatrail@2x.png",
        subtitle: "Protect",
        description: "You will create a timeline on a poster or in a video or slideshow to demonstrate how information about your movement in the real world gets collected online by companies and other organizations throughout the course of a typical day while learning about web literacy skills like <strong>protect</strong>.",
        link: "https://mozilla.github.io/curriculum-final/privacy-basics/session05-data-trail-timeline.html"
      },
      {
        title: "Privacy Coach",
        image1x: "/img/pages/protect-your-data/img-privacycoach.png",
        image2x: "/img/pages/protect-your-data/img-privacycoach@2x.png",
        subtitle: "Open Practice, Protect",
        description: "You will make a teaching and learning resource you can use to mentor your peers about online privacy and protecting their data while learning web literacy skills like <strong>open practice<strong> and <strong>protect</strong>.",
        link: "https://mozilla.github.io/curriculum-final/privacy-basics/session06-privacy-coach.html"
      }
    ]
  }
];

var sections = sectionList.map(function (section, key) {
  return (
    <ActivitySection title={section.title} key={section.title} activities={section.activities} />
  );
});

var ProtectYourData = React.createClass({
  statics: {
    pageTitle: 'Protect Your Data',
    pageClassName: 'protect-your-data'
  },
  render: function() {
    return (
      <div className="inner-container">
        {Intro}
        {LearningObjectives}
        {sections}
      </div>
    );
  }
});

module.exports = ProtectYourData;
