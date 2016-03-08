var React = require('react');
var Link = require('react-router').Link;
var OutboundLink = require('react-ga').OutboundLink;

var Illustration = require('../components/illustration.jsx');
var ActivitySection = require('../components/activity-section.jsx');

var Intro = (
  <div>
    <h1>Intermediate Web Literacy 1: Intro to CSS</h1>
    <section className="intro">
      <Illustration
      height={204} width={204}
      src1x="/img/pages/intermediate-web-lit/blocks.png"
      alt="Multi-colored stacked blocks">
        <h2>Learn to style HTML elements on a webpage using CSS selectors, attributes, and values.</h2>
      </Illustration>
    </section>
  </div>
);

var WebLitBasics = (
  <section className="row web-lit-basics">
    <div className="col-sm-12">
      <h2>Learning Objectives</h2>
      <p>
        Learners will understand and apply coding/scripting, composing, and design with CSS.
      </p>
    </div>
  </section>
);

var curriculumList = [
  {
    title: "Reading the Web",
    activities: [
      {
        title: "CSS Word Pyramid",
        image1x: "/img/pages/intermediate-web-lit/blue-pyramid.png",
        subtitle: "Coding/Scripting, Composing, Design",
        description: "Learners will use CSS to change the size of text on an HTML webpage, learning about coding, composing, and design. ",
        link: "http://chadsansing.github.io/curriculum-testing/curriculum-migration/intermediate-web-lit-css-one-migrated/session01-css-word-pyramid.html"
      },
      {
        title: "CSS Fonts",
        image1x: "/img/pages/intermediate-web-lit/letterpress.jpg",
        subtitle: "Coding/Scripting, Composing, Design",
        description: "Learners will use webfonts to create moods and tones on webpages, learning about coding, composing, and design.",
        link: "http://chadsansing.github.io/curriculum-testing/curriculum-migration/intermediate-web-lit-css-one-migrated/session02-css-fonts.html"
      },
      {
        title: "CSS Fonts Extension: Bridge to Infinity",
        image1x: "/img/pages/intermediate-web-lit/bridge.jpg",
        subtitle: "Coding/Scripting, Composing, Design",
        description: "Jump right into this Thimble project to improve the fonts on this remixable movie poster, learning about coding, composing, and design.",
        link: "https://d157rqmxrxj6ey.cloudfront.net/chadsansing/22265/ "
      },
      {
        title: "CSS Circles",
        image1x: "/img/pages/intermediate-web-lit/circles.jpg",
        subtitle: "Coding/Scripting, Composing, Design",
        description: "Learners will search for webfonts to include in a webpage, matching the mood, purpose, tone and voice of the page while learning about coding, composing, and design.",
        link: "http://chadsansing.github.io/curriculum-testing/curriculum-migration/intermediate-web-lit-css-one-migrated/session03-css-circles.html"
      },
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
        link: "https://mozilla.github.io/mozilla-club-activity-hack-the-news/#en"
      },
      {
        title: "HTML Puzzle Boxes",
        image1x: "/img/pages/web-lit-basics/img-puzzle-boxes.jpg",
        image2x: "/img/pages/web-lit-basics/img-puzzle-boxes@2x.jpg",
        subtitle: "Understanding composing for the web",
        description: "Learners race to sequence the paper boxes labeled with HTML tags, becoming familiar with the most common HTML tags and how to structure a web page.",
        link: "https://mozilla.github.io/mozilla-club-activity-html-puzzle-boxes/#en"
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
        link: "https://mozilla.github.io/mozilla-club-activity-web-chef/#en"
      },
      {
        title: "Final Project: Story of Us",
        image1x: "/img/pages/web-lit-basics/img-story-of-us.jpg",
        image2x: "/img/pages/web-lit-basics/img-story-of-us@2x.jpg",
        subtitle: "Understanding community participation",
        description: "Learners tell their Story of Self, use it to reflect  on what they have learned, and how they want to participate on the web and with their community going forward.",
        link: "https://mozilla.github.io/mozilla-club-activity-story-of-us/#en"
      }
    ]
  }
];

var curriculum = curriculumList.map(function (section) {
  return (
    <ActivitySection title={section.title} key={section.title} activities={section.activities} />
  );
});

var ClubsCurriculum = React.createClass({
  statics: {
    pageTitle: 'Web Literacy Basics',
    pageClassName: 'web-lit-basics'
  },

  render: function () {
    var blogPostLink = "https://blog.webmaker.org/help-us-get-local-with-web-literacy";
    return (
      <div className="inner-container">
        {Intro}
        {WebLitBasics}
        <section>
          <div className="alert alert-warning">
            <strong>Help us translate: </strong>
            We're making an effort to localize our Web Literacy Basics I curriculum and we need your help!
            There's increasing interest in starting Mozilla Clubs and teaching web literacy skills in
            communities around the globe, but our current curricular modules are only available in
            English. <OutboundLink to={blogPostLink} eventLabel={blogPostLink}>Learn how you can help</OutboundLink>.
          </div>
        </section>
        {curriculum}
      </div>
    );
  }
});

module.exports = ClubsCurriculum;
