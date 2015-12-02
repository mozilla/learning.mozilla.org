var React = require('react');
var Illustration = require('../components/illustration.jsx');
var ActivitySection = require('../components/activity-section.jsx');
var Router = require('react-router');
var Link = Router.Link;
var OutboundLink = require('react-ga').OutboundLink;

var config = require('../lib/config');

var Intro = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Made with Code</h1>
        <section className="intro">
          <Illustration
          width={200} height={355}
          src1x="/img/pages/madewithcode/logo_mwc.png"
          alt="Woman training a young man on a computer"
          className="content-first">
            <h2>Welcome! Mozilla is happy to partner with Google's Made with Code initiative to inspire girls to get creative with code. Below are three fun activities to help you create your own webpages by writing and remixing HTML.</h2>
          </Illustration>
        </section>
      </div>
    );
  }
});

var MadeWithCode = React.createClass({
  statics: {
    pageTitle: 'Made with Code',
    pageClassName: 'madewithcode-landing'
  },
  curriculum: [
    {
      title: "",
      activities: [
        {
          title: "Let's Make a Meme",
          image1x: "/img/pages/madewithcode/doge.jpg",
          image2x: "/img/pages/madewithcode/doge@2x.jpg",
          subtitle: "Understanding remixing",
          description: "A “meme” is something that’s shared on the internet, and it usually has three parts: a picture, a caption, and a dash of humor. In this activity, you’ll make your own meme using a bit of HTML and your own creativity.",
          link: "/activities/madewithcode-meme/"
        },
        {
          title: "Make a Movie Poster",
          image1x: "/img/pages/madewithcode/sunset.jpg",
          image2x: "/img/pages/madewithcode/sunset@2x.jpg",
          subtitle: "Understanding remixing",
          description: "Seen a movie or read any good books lately? Make a web page with your glowing (or vicious) review. Learn a little code along the way.",
          link: "/activities/madewithcode-poster/"
        },
        {
          title: "Make Your First Webpage",
          image1x: "/img/pages/madewithcode/fireworks.jpg",
          image2x: "/img/pages/madewithcode/fireworks@2x.jpg",
          subtitle: "Understanding remixing",
          description: "You’ve probably seen hundreds (if not thousands) of web pages. All of them are written in a language called HTML. It’s easy to start messing around with HTML. In this activity, you’ll make a basic web page in about 60 seconds or less.",
          link: "/activities/madewithcode-firstwebpage/"
        }
      ]
    }
  ],
  render: function () {
    return (
      <div className="inner-container">
        <Intro/>
        {this.curriculum.map(function (section, key) {
          return (
            <ActivitySection title={section.title} key={section.title} activities={section.activities} />
          );
        })}
        <section>
          <p>Looking for more fun projects to make and remix using Mozilla's Thimble code editor? Check out <OutboundLink to={config.THIMBLE} eventLabel={config.THIMBLE}>Mozilla's Thimble!</OutboundLink></p>
        </section>
      </div>
    );
  }
});

module.exports = MadeWithCode;
