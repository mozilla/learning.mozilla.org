var React = require('react');
var Illustration = require('../components/illustration.jsx');
var ActivitySection = require('../components/activity-section.jsx');
var CCLicenseNote = require('../components/cc-license-note.jsx');
var Router = require('react-router');
var Link = Router.Link;
var config = require('../lib/config');

var Intro = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Maker Party 2015 Activities</h1>
        <section className="intro">
          <Illustration
          height={204} width={204}
          src1x="/img/pages/maker-party-2015/intro-photo.png"
          src2x="/img/pages/maker-party-2015/intro-photo@2x.png"
          alt=""
          className="illustration-img-circle">
            <h2>Fun activities that are perfect for your Maker Party, to help your attendees learn how to read, write and participate on the Web.</h2>
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
            Learn about the culture, mechanics, and citizenship of the Web by making something! Each of the featured activities have offline options as well. Visit our <a href="http://discourse.webmaker.org/category/maker-party">discussion forum</a> for help and to share your experience.
          </p>
        </div>
      </section>
    );
  }
});


var MakerParty2015Page = React.createClass({
  statics: {
    pageTitle: 'Maker Party 2015',
    pageClassName: 'maker-party-2015'
  },
  sections: [
    {
      title: "1: Reading the Web",
      activities: [
        {
          title: "IP Address Tracer",
          image1x: "/img/pages/protect-your-data/img-iptracer.png",
          image2x: "/img/pages/protect-your-data/img-iptracer@2x.png",
          subtitle: "Understanding privacy",
          description: "Learn about internet protocol (IP) addresses and how they might reveal personal information about you. Trace IP addresses and make a map!",
          link: "http://mozilla.github.io/webmaker-curriculum/ProtectingYourData/session01-ip.html"
        },
        {
          title: "No Wi-Fi at your event? Try Draw Secure Passwords",
          image1x: "/img/pages/protect-your-data/img-password.png",
          image2x: "/img/pages/protect-your-data/img-password@2x.png",
          subtitle: "Understanding passwords",
          description: "Generate new pass-phrases and passwords based on best practices. Then create a survey to pass along their knowledge to friends and family.",
          link: "http://mozilla.github.io/webmaker-curriculum/ProtectingYourData/session02-secure-passwords.html"
        }
      ]
    },
    {
      title: "2: Writing the Web",
      activities: [
        {
          placeholderText: "Webmaker App activities coming soon!"
        }
      ]
    },
    {
      title: "3: Participating on the Web",
      activities: [
        {
          title: "Hacking My Media",
          image1x: "/img/pages/maker-party-2015/xray-goggles.png",
          image2x: "/img/pages/maker-party-2015/xray-goggles@2x.png",
          subtitle: "Understanding remixing",
          description: "Learn about openly-licensed resources, different forms of media, and how to remix a news website with the <a href=" + config.XRAY_GOGGLES_LINK + ">X-Ray Goggles</a> tool.",
          link: "http://mozilla.github.io/webmaker-curriculum/WebLiteracyBasics-I/session02-hackthenews.html"
        },
        {
          title: "No Wi-Fi at your event? Print out the media page and make edits on paper",
          image1x: "/img/pages/maker-party-2015/hack-the-news.png",
          image2x: "/img/pages/maker-party-2015/hack-the-news.png",
          subtitle: "Understanding remixing",
          description: "Remix a news website on paper. It's the lo-fi version of a web collage!",
          link: "http://mozilla.github.io/webmaker-curriculum/WebLiteracyBasics-I/session02-hackthenews.html"
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


module.exports = MakerParty2015Page;
