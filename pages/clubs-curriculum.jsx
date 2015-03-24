var React = require('react');
var ImageTag = require('../components/imagetag.jsx');
var Router = require('react-router');
var Link = Router.Link;

var CurriculumIntro = React.createClass({
  render: function () {
    return (
        <section className="row intro">
          <h1 className="col-sm-12">Clubs Curriculum</h1>
          <div className="col-sm-3 col-md-3 col-md-offset-1 col-lg-3">
            <ImageTag alt="Woman training a young man on a computer"
                className="img-circle img-scale-to-fit" src1x="/img/clubs-curriculum-page/photo-clubs-curriculum.jpg"
                src2x="/img/clubs-curriculum-page/photo-clubs-curriculum@2x.jpg"/>
          </div>
          <h2 className="col-sm-9 col-md-8">
            Activities to teach the web in your club. Developed and tested by our seasoned educator community. Easy
            to use, guaranteed fun.
          </h2>
        </section>
    );
  }
});

var WebLitBasics = React.createClass({
  render: function () {
    return (
        <section className="row web-lit-basics">
          <div className="col-sm-12">
            <h2>Web Literacy Basics</h2>
            <p>
              Learners get familiar with reading, writing and participating on the web in this six-part module.
              Discover the foundations of the web through production and collaboration. The learning objectives
              underpinning each activity are informed by
              Mozilla&rsquo;s <a href="https://webmaker.org/en-US/resources">Web Literacy Map</a>
              . Complete the activities in sequence,
              or mix &amp; match for your learners. Need
              help{'?'} <a href="http://discourse.webmaker.org/category/clubs">Visit
              our discussion forum</a> to get help and share your experience.
            </p>
          </div>
        </section>
    );
  }
});

var CurriculumSection = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    activities: React.PropTypes.array.isRequired
  },
  render: function () {
    return (
      <section>
        <h2 className="curriculum-section-header">
          Section {this.props.title}
        </h2>
        {this.props.activities.map(function (activity, i) {
          return (
            <div className="row container-fluid activity" key={i}>
              <div className="col-sm-2 col-md-3">
                <ImageTag width={122} alt={activity.imageAlt} src1x={activity.image1x} src2x={activity.image2x}/>
              </div>
              <div className="col-sm-10 col-md-9 curriculum-description">
                <h3>{activity.title}</h3>
                <p>
                  <em>{activity.subtitle}</em>
                </p>
                <p dangerouslySetInnerHTML={{__html: activity.description}}></p>
              </div>
            </div>
          )
        })}
      </section>
    );
  }
});

var LearnMoreSection = React.createClass({
  render: function () {
    return (
        <section className="row">
          <ImageTag alt="Icon representing Web Literacy—A smart phone inside a stylized atom illustration"
              className="center-block" src1x="/img/clubs-curriculum-page/icon-web-literacy.jpg"
              src2x="/img/clubs-curriculum-page/icon-web-literacy@2x.jpg" width={292} height={102} />
            <h3 className="learn-more">
              <em>What is Web Literacy{'?'}</em></h3>
            <p className="learn-more">
              Mozilla defines Web Literacy as the skills and competencies needed for reading, writing, and
              participating on the web.
            </p>
            <p className="learn-more">
              <Link to="about">Learn More</Link>
            </p>
            <img src="/img/clubs-curriculum-page/web-literacy-divider.svg" alt="" className="center-block"/>
        </section>
    );
  }
});

var ClubsCurriculum = React.createClass({
  statics: {
    pageClassName: 'clubs-curriculum-page'
  },
  curriculum: [
    {
      "title": "1: Reading the Web",
      "activities": [
        {
          "title": "Kraken the Code",
          "image1x": "/img/clubs-curriculum-page/img-kraken-code.jpg",
          "image2x": "/img/clubs-curriculum-page/img-kraken-code@2x.jpg",
          "imageAlt": "An illustration of water with a sea monster and a boat in it",
          "subtitle": "Understanding credibility",
          "description": "Learners use the Internet to solve the mystery of The Kraken, a legendary sea creature, while also <strong>learning about search terms, keywords, and how to assess the validity and relevance of web sources.</strong>"
        },
        {
          "title": "Ping Kong",
          "image1x": "/img/clubs-curriculum-page/img-ping-kong.jpg",
          "image2x": "/img/clubs-curriculum-page/img-ping-kong@2x.jpg",
          "imageAlt": "An illustration of the Empire State Building, with several helicopters circling",
          "subtitle": "Understanding web mechanics",
          "description": "For many, &ldquo;the Internet&rdquo; is an abstract and overwhelming concept. This activity challenges learners to <strong>think concretely about how the internet communicates with a computer</strong>."
        }
      ]
    },
    {
      "title": "2: Writing the Web",
      "activities": [
        {
          "title": "Hack the News",
          "image1x": "/img/clubs-curriculum-page/img-hack-news.jpg",
          "image2x": "/img/clubs-curriculum-page/img-hack-news@2x.jpg",
          "imageAlt": "An illustration of a newspaper, with a headline of &ldquo;Hack the News&rdquo;",
          "subtitle": "Understanding remixing",
          "description": "Learners use X-Ray Goggles to remix a news website, learning about <strong>openly-licensed resources, different forms of media, and how to create something new on the Web through remix</strong>."
        },
        {
          "title": "HTML Puzzle Boxes",
          "image1x": "/img/clubs-curriculum-page/img-puzzle-boxes.jpg",
          "image2x": "/img/clubs-curriculum-page/img-puzzle-boxes@2x.jpg",
          "imageAlt": "A photograph of several paper boxes with HTML tags on them",
          "subtitle": "Understanding composing for the web",
          "description": "Learners race to sequence the paper boxes labeled with HTML tags, <strong>becoming familiar with the most common HTML tags and how to structure a web page</strong>."
        }
      ]
    },
    {
      "title": "3: Participating on the Web",
      "activities": [
        {
          "title": "Web Chef",
          "image1x": "/img/clubs-curriculum-page/img-web-chef.jpg",
          "image2x": "/img/clubs-curriculum-page/img-web-chef@2x.jpg",
          "imageAlt": "An illustration of a chef",
          "subtitle": "Understanding open practices",
          "description": "Learners teach their peers a skill and document the steps by making a web resource that includes properly attributed open content."
        },
        {
          "title": "Final Project: Story of Us",
          "image1x": "/img/clubs-curriculum-page/img-story-of-us.jpg",
          "image2x": "/img/clubs-curriculum-page/img-story-of-us@2x.jpg",
          "imageAlt": "An illustration of a hand holding a smart phone",
          "subtitle": "Understanding community participation",
          "description": "Learners tell their Story of Self, use it to reflect  on what they have learned, and how they want to participate on the web and with their community going forward."
        }
      ]
    }
  ],
  render: function () {
    return (
        <div className="container-fluid">
          <CurriculumIntro/>
          <WebLitBasics/>
          {this.curriculum.map(function (section, key) {
            return (
                <CurriculumSection title={section.title} key={key} activities={section.activities} />
            );
          })}
          <LearnMoreSection/>
        </div>
    );
  }
});

module.exports = ClubsCurriculum;
