var React = require('react');
var Link = require('react-router').Link;
var OutboundLink = require('react-ga').OutboundLink;

var Illustration = require('../components/illustration.jsx');
var ActivitySection = require('../components/activity-section.jsx');


var WebLitBasics = (
  <section className="row web-lit-basics">
    <div className="col-sm-12">
      <h2>Learning Objectives</h2>
      <p>
        Learners will understand community practice, composing, designing for accessibility, open practices, sharing,
        and remixing and reflecting on how they and others create, use, and license media on the Web.
      </p>
    </div>
  </section>
);

var curriculumList = [
  {
    title: "",
    activities: [
      {
        title: "Why Do We Use the Web?",
        image1x: "/img/pages/web-lit-basics-two/why-do-we-use-the-web.png",
        originalImgSrc: "https://commons.wikimedia.org/wiki/File:Online_Survey_Icon_or_logo.svg",
        caption: "CC0 1.0 by Tungalik",
        subtitle: "Understanding Community Participation",
        description: "Learners will create and research survey questions about their community's Web use, learning about <strong>collaborating, community participation, and open practices</strong>.",
        link: "https://mozilla.github.io/curriculum-final/web-lit-basics-two/session01-why-do-we-use-the-web.html#overview"
      },
      {
        title: "The Web is a Tool for Learning",
        image1x: "/img/pages/web-lit-basics-two/the-web-is-a-tool-for-learning.jpg",
        originalImgSrc: "https://www.flickr.com/photos/rahims/234010602",
        caption: "CC-BY 2.0 by rahims",
        subtitle: "Understanding Navigating",
        description: "Learners will use Web-native instructions to make a meme or build a maker project in real life, learning <strong>navigating, remixing, and community participation</strong>.",
        link: "https://mozilla.github.io/curriculum-final/web-lit-basics-two/session02-the-web-is-a-tool-for-learning.html#overview"
      },
      {
        title: "Project Playlist",
        image1x: "/img/pages/web-lit-basics-two/project-playlist.png",
        originalImgSrc: "https://learning.mozilla.org",
        caption: "CC-BY MLN",
        subtitle: "Understanding Composing",
        description: "Learners will build a playlist of songs from the Open Web, learning <strong>composing and remixing</strong>.",
        link: "https://mozilla.github.io/curriculum-final/web-lit-basics-two/bridge01-project-playlist.html#overview"
      },
      {
        title: "Welcome to My Mixtape",
        image1x: "/img/pages/web-lit-basics-two/welcome-to-my-mixtape.jpg",
        originalImgSrc: "https://www.flickr.com/photos/badjonni/433463323/sizes/n/",
        caption: "CC-BY-SA 2.0 by badjonni",
        subtitle: "Understanding Composing",
        description: "Learners will use Web-native music-production tools and share music through an online community, learning <strong>composing, remix, sharing, and community participation</strong>.",
        link: "https://mozilla.github.io/curriculum-final/web-lit-basics-two/session03-welcome-to-my-mixtape.html#overview"
      },
      {
        title: "Pixel Portrait",
        image1x: "/img/pages/web-lit-basics-two/pixel-portrait.png",
        originalImgSrc: "https://learning.mozilla.org",
        caption: "CC-BY MLN",
        subtitle: "Understanding Composing",
        description: "Learners will create their own pixel art, import it into an online code editor, and then insert it into a webpage, learning <strong>composing</strong>.",
        link: "https://mozilla.github.io/curriculum-final/web-lit-basics-two/bridge02-pixel-portrait.html#overview"
      },
      {
        title: "#allthestickerz",
        image1x: "/img/pages/web-lit-basics-two/allthestickerz.png",
        originalImgSrc: "https://learning.mozilla.org",
        caption: "CC-BY MLN",
        subtitle: "Understanding Sharing",
        description: "Learners will create pixel art online/digital stickers, publish them for others, and use them to annotate and remix the Web, learning <strong>community participation, composing, open practices, remix, and sharing</strong>.",
        link: "https://mozilla.github.io/curriculum-final/web-lit-basics-two/session04-allthestickerz.html#overview"
      },
      {
        title: "Who Am I?",
        image1x: "/img/pages/web-lit-basics-two/who-am-i.png",
        originalImgSrc: "https://commons.wikimedia.org/wiki/File:Question_mark_%28black_on_white%29.png",
        caption: "CC0 1.0 by author neutrality",
        subtitle: "Understanding Search",
        description: "Learners will conduct a reverse image search to find information about a subject online and then revise a webpage with their own text and images, learning <strong>composing and search</strong>.",
        link: "https://mozilla.github.io/curriculum-final/web-lit-basics-two/bridge03-who-am-i.html#overview"
      },
      {
        title: "Fair Use Free-for-All",
        image1x: "/img/pages/web-lit-basics-two/fair-use-free-for-all.png",
        originalImgSrc: "https://en.wikipedia.org/wiki/Copyleft#/media/File:Copyleft.svg",
        caption: "public domain common knowledge, by Zscout370",
        subtitle: "Understanding Sharing",
        description: "Learners will compete to identify examples and non-examples of fair use in peers' web remixes, learning <strong>credibility, search, and sharing</strong>.",
        link: "https://mozilla.github.io/curriculum-final/web-lit-basics-two/session05-fair-use-free-for-all.html#overview"
      },
      {
        title: "The Planets",
        image1x: "/img/pages/web-lit-basics-two/the-planets.jpg",
        originalImgSrc: "https://commons.wikimedia.org/wiki/File:NGC_3521-_the_Bubble_galaxy.jpg",
        caption: "CC-BY-SA 3.0 by R. Jay GaBany",
        subtitle: "Understanding Designing for Accessibility",
        description: "Learners will improve the accessibility of a webpage by changing its color scheme, content, and embedded media, learning <strong>composing, designing for accessibility, and remixing</strong>.",
        link: "https://mozilla.github.io/curriculum-final/web-lit-basics-two/session06-the-planets-and-accessibility.html#overview"
      }
    ]
  }
];

var curriculum = curriculumList.map(function (section) {
  return (
    <ActivitySection title={section.title} key={section.title} activities={section.activities} />
  );
});


var WebLitBasicsTwo = React.createClass({
  statics: {
    pageTitle: 'Web Literacy Basics II',
    pageClassName: 'web-lit-basics-two'
  },

  contextTypes: {
    intl: React.PropTypes.object
  },

  render: function () {
    var blogPostLink = "https://blog.webmaker.org/help-us-get-local-with-web-literacy";
    var formatMessage = this.context.intl.formatMessage;
    var CurriculumIntro = (
      <div>
        <h1>{formatMessage({id:"web_lit_basics_2_title"})}</h1>
        <section className="intro">
          <Illustration
          height={204} width={204}
          src1x="/img/pages/web-lit-basics-two/intro.jpg"
          alt=""
          caption={<a href="https://c2.staticflickr.com/6/5760/22431506387_43e85e71bd.jpg">cc-by-2.0 Mozilla Festival</a>}>
            <h2>{formatMessage({id:"web_lit_basics_2_intro"})}</h2>
          </Illustration>
        </section>
      </div>
    );

    return (
      <div className="inner-container">
        {CurriculumIntro}
        {WebLitBasics}
        {curriculum}
      </div>
    );
  }
});

module.exports = WebLitBasicsTwo;
