var React = require('react');
var Illustration = require('../components/illustration.jsx');
var ActivitySection = require('../components/activity-section.jsx');
var CCLicenseNote = require('../components/cc-license-note.jsx');
var Router = require('react-router');
var Link = Router.Link;

var Intro = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Protect Your Data</h1>
        <section className="intro">
          <Illustration
          height={204} width={204}
          src1x="/img/pages/protect-your-data/photo-protect-your-data.png"
          src2x="/img/pages/protect-your-data/photo-protect-your-data@2x.png"
          alt=""
          className="illustration-img-circle">
            <h2>Engage learners around the topic of privacy in this six-part module, developed in conjunction with Hive Toronto and the Mozilla Privacy Team.</h2>
          </Illustration>
        </section>
      </div>
    );
  }
});


var LearningObjectives = React.createClass({
  render: function () {
    return (
      <section className="row web-lit-basics">
        <div className="col-sm-12">
          <h2>Learning Objectives</h2>
          <p>
            These activities will help your learners understand how to take control of their privacy in a networked world. Complete the activities in sequence, or mix and match. Visit <a href="http://discourse.webmaker.org/category/clubs">our discussion forum</a> to get help and share your experience.
          </p>
        </div>
      </section>
    );
  }
});


var ProtectYourData = React.createClass({
  statics: {
    pageTitle: 'Protect Your Data',
    pageClassName: 'protect-your-data'
  },
  sections: [
    {
      title: "Reading the Web",
      activities: [
        {
          title: "IP Tracer",
          image1x: "/img/pages/protect-your-data/img-iptracer.png",
          image2x: "/img/pages/protect-your-data/img-iptracer@2x.png",
          subtitle: "Understanding privacy",
          description: "Learners explore internet protocol (IP) addresses and create a map to illustrate their associations with individuals, devices, or websites.",
          link: "http://mozilla.github.io/webmaker-curriculum/ProtectingYourData/session01-ip.html"
        },
        {
          title: "Understanding security",
          image1x: "/img/pages/protect-your-data/img-password.png",
          image2x: "/img/pages/protect-your-data/img-password@2x.png",
          subtitle: "Understanding web mechanics",
          description: "Learners investigate the differences between weak and strong passwords, and create a collage to document bad password practices.",
          link: "http://mozilla.github.io/webmaker-curriculum/ProtectingYourData/session01-password-collage.html"
        }
      ]
    },
    {
      title: "Writing the Web",
      activities: [
        {
          title: "Cookies and Third-Party Tracking",
          image1x: "/img/pages/protect-your-data/img-cookies.png",
          image2x: "/img/pages/protect-your-data/img-cookies@2x.png",
          subtitle: "Understanding privacy and open practices",
          description: "Using a free and open source tool called Mozilla Lightbeam, learners see how cookies and third-party trackers monitor their everyday tasks on the web. Then they divide into teams and race to see who can gather the most trackers.",
          link: "http://mozilla.github.io/webmaker-curriculum/ProtectingYourData/session02-lightbeam.html"
        },
        {
          title: "Draw Secure Passwords",
          image1x: "/img/pages/protect-your-data/img-password.png",
          image2x: "/img/pages/protect-your-data/img-password@2x.png",
          subtitle: "Understanding privacy and security",
          description: "Learners generate pass-phrases, pronounceable and random passwords based on best practices. Then they create a survey to pass along their knowledge to friends and family.",
          link: "http://mozilla.github.io/webmaker-curriculum/ProtectingYourData/session02-secure-passwords.html"
        }
      ]
    },
    {
      title: "Participating on the Web",
      activities: [
        {
          title: "Data Trail Timeline",
          image1x: "/img/pages/protect-your-data/img-datatrail.png",
          image2x: "/img/pages/protect-your-data/img-datatrail@2x.png",
          subtitle: "Understanding remixing, privacy",
          description: "Learners create a timeline, video or slideshow remix to demonstrate how information gets collected by companies and other organizations throughout the course of a typical day.",
          link: "http://mozilla.github.io/webmaker-curriculum/ProtectingYourData/session03-datatrail.html"
        },
        {
          title: "Privacy Coach",
          image1x: "/img/pages/protect-your-data/img-privacycoach.png",
          image2x: "/img/pages/protect-your-data/img-privacycoach@2x.png",
          subtitle: "Understanding privacy and open practices",
          description: "Learners become privacy mentors to their peers by sharing their expertise through discussion or creating their own &ldquo;recipe&rdquo; documentation on privacy.",
          link: "http://mozilla.github.io/webmaker-curriculum/ProtectingYourData/session03-privacycoach.html"
        }
      ]
    }
  ],
  render: function() {
    return (
      <div className="inner-container">
        <Intro/>
        <LearningObjectives/>
        {this.sections.map(function (section, key) {
          return (
            <ActivitySection title={section.title} key={key} activities={section.activities} />
          );
        })}
        <CCLicenseNote/>
      </div>
    );
  }
});


module.exports = ProtectYourData;
