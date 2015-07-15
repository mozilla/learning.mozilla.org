var React = require('react');
var Illustration = require('../components/illustration.jsx');
var ActivitySection = require('../components/activity-section.jsx');
var CCLicenseNote = require('../components/cc-license-note.jsx');
var Router = require('react-router');
var Link = Router.Link;

var CurriculumIntro = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Web Literacy Basics</h1>
        <section className="intro">
          <Illustration
          height={204} width={204}
          src1x="/img/pages/web-lit-basics/photo-clubs-curriculum.jpg"
          src2x="/img/pages/web-lit-basics/photo-clubs-curriculum@2x.jpg"
          alt="Woman training a young man on a computer"
          className="illustration-img-circle">
            <h2>Learners get familiar with reading, writing and participating on the web in this six-part module. Discover the foundations of the web through production and collaboration.</h2>
          </Illustration>
        </section>
      </div>
    );
  }
});

var WebLitBasics = React.createClass({
  render: function () { // TODO: update Link to weblit after #396 is merged
    return (
      <section className="row web-lit-basics">
        <div className="col-sm-12">
          <h2>Learning Objectives</h2>
          <p>
            The learning objectives underpinning each activity are informed by Mozilla&apos;s <Link to="web-literacy">Web Literacy Map</Link>. Complete the activities in
            sequence, or mix and match for your learners. Need help{'? '}
            <a href="http://discourse.webmaker.org/category/clubs">Visit our discussion forum</a> to get help and share
            your experience.
          </p>
        </div>
      </section>
    );
  }
});

var ClubsCurriculum = React.createClass({
  statics: {
    pageTitle: 'Web Literacy Basics',
    pageClassName: 'web-lit-basics'
  },
  curriculum: [
    {
      title: "Reading the Web",
      activities: [
        {
          title: "Kraken the Code",
          image1x: "/img/pages/web-lit-basics/img-kraken-code.jpg",
          image2x: "/img/pages/web-lit-basics/img-kraken-code@2x.jpg",
          subtitle: "Understanding credibility",
          description: "Learners use the Internet to solve the mystery of The Kraken, a legendary sea creature, while also learning about search terms, keywords, and how to assess the validity and relevance of web sources.",
          link: "http://mozilla.github.io/webmaker-curriculum/WebLiteracyBasics-I/session01-kraken.html"
        },
        {
          title: "Ping Kong",
          image1x: "/img/pages/web-lit-basics/img-ping-kong.jpg",
          image2x: "/img/pages/web-lit-basics/img-ping-kong@2x.jpg",
          subtitle: "Understanding web mechanics",
          description: "For many, &ldquo;the Internet&rdquo; is an abstract and overwhelming concept. This activity challenges learners to think concretely about how the internet communicates with a computer.",
          link: "http://mozilla.github.io/webmaker-curriculum/WebLiteracyBasics-I/session01-pingkong.html"
        }
      ]
    },
    {
      title: "Writing the Web",
      activities: [
        {
          title: "Hack the News",
          image1x: "/img/pages/web-lit-basics/img-hack-news.jpg",
          image2x: "/img/pages/web-lit-basics/img-hack-news@2x.jpg",
          subtitle: "Understanding remixing",
          description: "Learners use X-Ray Goggles to remix a news website, learning about openly-licensed resources, different forms of media, and how to create something new on the Web through remixing.",
          link: "http://mozilla.github.io/webmaker-curriculum/WebLiteracyBasics-I/session02-hackthenews.html"
        },
        {
          title: "HTML Puzzle Boxes",
          image1x: "/img/pages/web-lit-basics/img-puzzle-boxes.jpg",
          image2x: "/img/pages/web-lit-basics/img-puzzle-boxes@2x.jpg",
          subtitle: "Understanding composing for the web",
          description: "Learners race to sequence the paper boxes labeled with HTML tags, becoming familiar with the most common HTML tags and how to structure a web page.",
          link: "http://mozilla.github.io/webmaker-curriculum/WebLiteracyBasics-I/session02-puzzlebox.html"
        }
      ]
    },
    {
      title: "Participating on the Web",
      activities: [
        {
          title: "Web Chef",
          image1x: "/img/pages/web-lit-basics/img-web-chef.jpg",
          image2x: "/img/pages/web-lit-basics/img-web-chef@2x.jpg",
          subtitle: "Understanding open practices",
          description: "Learners teach their peers a skill and document the steps by making a web resource that includes properly-attributed open content.",
          link: "http://mozilla.github.io/webmaker-curriculum/WebLiteracyBasics-I/session03-chef.html"
        },
        {
          title: "Final Project: Story of Us",
          image1x: "/img/pages/web-lit-basics/img-story-of-us.jpg",
          image2x: "/img/pages/web-lit-basics/img-story-of-us@2x.jpg",
          subtitle: "Understanding community participation",
          description: "Learners tell their Story of Self, use it to reflect  on what they have learned, and how they want to participate on the web and with their community going forward.",
          link: "http://mozilla.github.io/webmaker-curriculum/WebLiteracyBasics-I/session03-storyofus.html"
        }
      ]
    }
  ],
  render: function () {
    return (
      <div className="inner-container">
        <CurriculumIntro/>
        <WebLitBasics/>
        {this.curriculum.map(function (section, key) {
          return (
            <ActivitySection title={section.title} key={key} activities={section.activities} />
          );
        })}
        <CCLicenseNote/>
      </div>
    );
  }
});

module.exports = ClubsCurriculum;
