var React = require('react');
var Link = require('react-router').Link;
var OutboundLink = require('react-ga').OutboundLink;
var FormattedMessage = require('react-intl').FormattedMessage;


var Illustration = require('../components/illustration.jsx');
var ActivitySection = require('../components/activity-section.jsx');

var config = require('../config/config');

var WebmakerActivity = React.createClass({

curriculumList: [
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

  curriculum: function() {
    return this.curriculumList.map(function (section) {
      return (
        <ActivitySection title={section.title} key={section.title} activities={section.activities} />
      );
    });
  },
  contextTypes: {
    intl: React.PropTypes.object
  },
  statics: {
    pageTitle: 'Read, Write, and Participate with Webmaker',
    pageClassName: 'read-write-participate-with-webmaker'
  },
  render: function () {
    var formatMessage = this.context.intl.formatMessage;
    var mlnLink = (<a href="https://learning.mozilla.org">{formatMessage({id:"MLN"})}</a>);
    var webmakerLink = (<a href={config.WEBMAKER}>{formatMessage({id:"webmaker_app"})}</a>);

    var LearningObjectives = (
      <section className="row web-lit-basics">
        <div className="col-sm-12">
          <h2>{formatMessage({id:"learning_objectives_title"})}</h2>
          <p>
            {formatMessage({id:"learning_objectives_description"})}
          </p>
        </div>
      </section>
    );

    var CurriculumIntro = (
      <div>
        <h1>{formatMessage({id: "webmaker_tagline"})}</h1>
        <section className="intro">
          <Illustration
          height={204} width={204}
          src1x="/img/pages/webmaker/designing-webmaker.jpg"
          src2x="/img/pages/webmaker/designing-webmaker@2x.jpg"
          alt="">
            <h2><FormattedMessage id="webmaker_cta" values={{webmaker_link: webmakerLink, mln_link: mlnLink}}/></h2>
          </Illustration>
        </section>
      </div>
    );

    return (
      <div className="inner-container">
        {CurriculumIntro}
        {LearningObjectives}
        {this.curriculum()}
      </div>
    );
  }
});

module.exports = WebmakerActivity;
