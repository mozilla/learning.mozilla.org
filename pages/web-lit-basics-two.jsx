var React = require('react');
var Illustration = require('../components/illustration.jsx');
var ActivitySection = require('../components/activity-section.jsx');
var Router = require('react-router');
var Link = Router.Link;
var OutboundLink = require('react-ga').OutboundLink;

var CurriculumIntro = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Web Literacy Basics II</h1>
        <section className="intro">
          <Illustration
          height={204} width={204}
          src1x="/img/pages/web-lit-basics-two/intro.jpg"
          className="illustration-img-circle"
          alt=""
          caption={<a href="https://c2.staticflickr.com/6/5760/22431506387_43e85e71bd.jpg">cc-by-2.0 Mozilla Festival</a>}>
            <h2>Dive deeper into the basics of composing webpages, designing for accessibility, sharing resources, using online media, and working open.</h2>
          </Illustration>
        </section>
      </div>
    );
  }
});

var WebLitBasics = React.createClass({
  render: function () {
    return (
      <section className="row web-lit-basics">
        <div className="col-sm-12">
          <h2>Learning Objectives</h2>
          <p>
            Learners will understand community practice, composing, designing for accessibility, open practices, sharing, and remixing and reflecting on how they and others create, use, and license media on the Web.
          </p>
        </div>
      </section>
    );
  }
});

var WebLitBasicsTwo = React.createClass({
  statics: {
    pageTitle: 'Web Literacy Basics II',
    pageClassName: 'web-lit-basics-two'
  },
  curriculum: [
    {
      title: "",
      activities: [
        {
          title: "Why Do We Use the Web?",
          image1x: "/img/pages/web-lit-basics-two/why-do-we-use-the-web.png",
          originalImgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Online_Survey_Icon_or_logo.svg/600px-Online_Survey_Icon_or_logo.svg.png",
          subtitle: "Understanding Community Participation",
          description: "Learners will create and research survey questions about their community's Web use, learning about <strong>collaborating, community participation, and open practices</strong>.",
          link: "https://chadsansing.github.io/curriculum-testing/web-lit-basics-two/session01-why-do-we-use-the-web.html"
        },
        {
          title: "The Web is a Tool for Learning",
          image1x: "/img/pages/web-lit-basics-two/the-web-is-a-tool-for-learning.jpg",
          originalImgSrc: "https://c1.staticflickr.com/1/88/234010602_0b42343b8d.jpg",
          subtitle: "Understanding Navigating",
          description: "Learners will use Web-native instructions to make a meme or build a maker project in real life, learning <strong>navigating, remixing, and community participation</strong>.",
          link: "https://chadsansing.github.io/curriculum-testing/web-lit-basics-two/session02-the-web-is-for-making.html"
        },
        {
          title: "Project Playlist",
          image1x: "/img/pages/web-lit-basics-two/project-playlist.png",
          originalImgSrc: "http://chadsansing.github.io/curriculum-testing/web-lit-basics-two/playlist-kawaii.png",
          subtitle: "Understanding Composing",
          description: "Learners will build a playlist of songs from the Open Web, learning <strong>composing and remixing</strong>.",
          link: "https://chadsansing.github.io/curriculum-testing/web-lit-basics-two/bridge01-project-playlist.html"
        },
        {
          title: "Welcome to My Mixtape",
          image1x: "/img/pages/web-lit-basics-two/welcome-to-my-mixtape.jpg",
          originalImgSrc: "https://c1.staticflickr.com/1/164/433463323_998d31b743_n.jpg",
          subtitle: "Understanding Composing",
          description: "Learners will use Web-native music-production tools and share music through an online community, learning <strong>composing, remix, sharing, and community participation</strong>.",
          link: "http://chadsansing.github.io/curriculum-testing/web-lit-basics-two/session03-welcome-to-my-mixtape.html"
        },
        {
          title: "Pixel Portrait",
          image1x: "/img/pages/web-lit-basics-two/pixel-portrait.png",
          originalImgSrc: "http://chadsansing.github.io/curriculum-testing/web-lit-basics-two/space-cat.png",
          subtitle: "Understanding Composing",
          description: "Learners will create their own pixel art, import it into an online code editor, and then insert it into a webpage, learning <strong>composing</strong>.",
          link: "http://chadsansing.github.io/curriculum-testing/web-lit-basics-two/bridge02-pixel-portrait.html"
        },
        {
          title: "#allthestickerz",
          image1x: "/img/pages/web-lit-basics-two/allthestickerz.png",
          originalImgSrc: "https://d157rqmxrxj6ey.cloudfront.net/chadsansing/7048/stickerz-love.png ",
          subtitle: "Understanding Sharing",
          description: "Learners will create pixel art online/digital stickers, publish them for others, and use them to annotate and remix the Web, learning <strong>community participation, composing, open practices, remix, and sharing</strong>.",
          link: "http://chadsansing.github.io/curriculum-testing/web-lit-basics-two/session04-all-the-stickerz.html"
        },
        {
          title: "Who Am I?",
          image1x: "/img/pages/web-lit-basics-two/who-am-i.png",
          originalImgSrc: "http://chadsansing.github.io/curriculum-testing/web-lit-basics-two/question-mark.png",
          subtitle: "Understanding Search",
          description: "Learners will conduct a reverse image search to find information about a subject online and then revise a webpage with their own text and images, learning <strong>composing and search</strong>.",
          link: "http://chadsansing.github.io/curriculum-testing/web-lit-basics-two/bridge03-who-am-i.html"
        },
        {
          title: "Fair Use Free-for-All",
          image1x: "/img/pages/web-lit-basics-two/fair-use-free-for-all.png",
          originalImgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Copyleft.svg/512px-Copyleft.svg.png",
          subtitle: "Understanding Sharing",
          description: "Learners will compete to identify examples and non-examples of fair use in peers' web remixes, learning <strong>credibility, search, and sharing</strong>.",
          link: "http://chadsansing.github.io/curriculum-testing/web-lit-basics-two/session05-fair-use-free-for-all.html"
        },
        {
          title: "The Planets",
          image1x: "/img/pages/web-lit-basics-two/the-planets.jpg",
          originalImgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/NGC_3521-_the_Bubble_galaxy.jpg/320px-NGC_3521-_the_Bubble_galaxy.jpg",
          subtitle: "Understanding Designing for Accessibility",
          description: "Learners will improve the accessibility of a webpage by changing its color scheme, content, and embedded media, learning <strong>composing, designing for accessibility, and remixing</strong>.",
          link: "http://chadsansing.github.io/curriculum-testing/web-lit-basics-two/session06-the-planets-and-accessibility.html"
        }
      ]
    }
  ],
  render: function () {
    var blogPostLink = "https://blog.webmaker.org/help-us-get-local-with-web-literacy";
    return (
      <div className="inner-container">
        <CurriculumIntro/>
        <WebLitBasics/>
        {this.curriculum.map(function (section, key) {
          return (
            <ActivitySection title={section.title} key={key} activities={section.activities} />
          );
        })}
      </div>
    );
  }
});

module.exports = WebLitBasicsTwo;
