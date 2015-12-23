var React = require('react');
var Illustration = require('../components/illustration.jsx');
var ActivitySection = require('../components/activity-section.jsx');
var Router = require('react-router');
var Link = Router.Link;
var OutboundLink = require('react-ga').OutboundLink;

var config = require('../lib/config');

var CurriculumIntro = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Read, Write, and Participate with Webmaker</h1>
        <section className="intro">
          <Illustration
          height={204} width={204}
          src1x="/img/pages/webmaker/designing-webmaker.jpg"
          src2x="/img/pages/webmaker/designing-webmaker@2x.jpg"
          alt="">
            <h2>Learn how to set up your mobile device to write, publish, and share stories with the <a href={config.WEBMAKER}>Webmaker App</a> from <a href="https://teach.mozilla.org">Mozilla Learning Networks</a>.</h2>
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
            Learners will understand how their mobile devices connect to the Web and then learn how to design, write, and publish personal and community stories through the Webmaker Android App.
          </p>
        </div>
      </section>
    );
  }
});

var WebmakerActivity = React.createClass({
  statics: {
    pageTitle: 'Read, Write, and Participate with Webmaker',
    pageClassName: 'read-write-participate-with-webmaker'
  },
  curriculum: [
    {
      title: "Reading the Web",
      activities: [
        {
          title: "Learning about the Internet",
          image1x: "/img/pages/webmaker/learning-about-internet.jpg",
          originalImgSrc: "https://farm4.staticflickr.com/3734/12301114235_5626e573bf.jpg",
          caption: "We love Internet” by Kristina Alexanderson",
          subtitle: "Understanding Web Mechanics",
          description: "Learners will understand what the Internet is, how to access it, and what it can be used for on their mobile devices.",
          link: "http://mozilla.github.io/webmaker-curriculum/MobileWeb/learning-about-the-internet.html"
        }
      ]
    },
    {
      title: "Writing the Web",
      activities: [
        {
          title: "Setting Up Your Phone",
          image1x: "/img/pages/webmaker/setting-up-your-phone.png",
          originalImgSrc: 'https://webmaker.org',
          caption: "webmaker.org",
          subtitle: "Understanding Web Mechanics",
          description: "Learners will understand how to set up their mobile phone, connect to the web and download, install and use apps.",
          link: "http://mozilla.github.io/webmaker-curriculum/MobileWeb/setting-up-your-phone.html"
        },
        {
          title: "Publishing and Sharing on the Internet",
          image1x: "/img/pages/webmaker/publishing-and-sharing-on-the-internet.jpg",
          originalImgSrc: "https://www.jisc.ac.uk/blog/digital-storytelling-in-organisations-the-challenges-and-how-to-overcome-them-05-may-2015",
          caption: "Jisc",
          subtitle: "Understanding Sharing",
          description: "Learners will understand how to publish and share content online using the Webmaker Android App.",
          link: "http://mozilla.github.io/webmaker-curriculum/MobileWeb/publishing-and-sharing.html"
        }
      ]
    },
    {
      title: "Participating on the Web",
      activities: [
        {
          title: "Creating a Webmaker Project",
          image1x: "/img/pages/webmaker/creating-webmaker-projects.jpg",
          originalImgSrc: "http://mozilla.github.io/webmaker-curriculum/MobileWeb/create-webmaker-project.html",
          caption: "",
          subtitle: "Understanding Composing",
          description: "Learners will create original web content by making projects with Webmaker.",
          link: "http://mozilla.github.io/webmaker-curriculum/MobileWeb/create-webmaker-project.html",
          className: "landscape"
        },
        {
          title: "Design a Story for the Web",
          image1x: "/img/pages/webmaker/designing-webmaker.jpg",
          originalImgSrc: "http://mozilla.github.io/webmaker-curriculum/MobileWeb/design-webmaker-project.html",
          caption: "",
          subtitle: "Understanding Designing",
          description: "Learners will ideate, sketch and structure a story to create with Webmaker. By brainstorming offline, learners will start thinking about the different ways to create for the Web and get more comfortable with the idea of creating their own content.",
          link: "http://mozilla.github.io/webmaker-curriculum/MobileWeb/design-webmaker-project.html"
        }
      ]
    }
  ],
  render: function () {
    return (
      <div className="inner-container">
        <CurriculumIntro/>
        <LearningObjectives/>
        {this.curriculum.map(function (section) {
          return (
            <ActivitySection title={section.title} key={section.title} activities={section.activities} />
          );
        })}
      </div>
    );
  }
});

module.exports = WebmakerActivity;
