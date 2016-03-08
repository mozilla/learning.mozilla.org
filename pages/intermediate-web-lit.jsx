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

var IntermediateWebLit = (
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
    title: "Writing the Web",
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
      {
        title: "CSS Building Blocks",
        image1x: "/img/pages/intermediate-web-lit/blocks.png",
        subtitle: "Coding/Scripting, Composing, Design",
        description: "Learners will search for webfonts to include in a webpage, matching the mood, purpose, tone and voice of the page while learning about coding, composing, and design.",
        link: "http://chadsansing.github.io/curriculum-testing/curriculum-migration/intermediate-web-lit-css-one-migrated/session04-css-building-blocks.html"
      },
      {
        title: "CSS Decoration",
        image1x: "/img/pages/intermediate-web-lit/decoration.jpg",
        subtitle: "Coding/Scripting, Composing, Design",
        description: "Learners will apply text- and box-effect CSS styling techniques to inline and block elements on an HTML webpage, learning about coding, composing, and design.",
        link: "http://chadsansing.github.io/curriculum-testing/curriculum-migration/intermediate-web-lit-css-one-migrated/session05-css-decoration.html"
      },
      {
        title: "Web-o-tron & the Scrambled Divs",
        image1x: "/img/pages/intermediate-web-lit/webotron-head.png",
        subtitle: "Coding/Scripting, Composing, Design",
        description: "Learners will apply text- and box-effect CSS styling techniques to inline and block elements on an HTML webpage, learning about coding, composing, and design.",
        link: "http://chadsansing.github.io/curriculum-testing/curriculum-migration/intermediate-web-lit-css-one-migrated/session06-webotron-and-the-scrambled-divs.html"
      },
      {
        title: "CSS External Tutorials",
        image1x: "/img/pages/intermediate-web-lit/flexbox-froggy.png",
        subtitle: "Coding/Scripting, Composing, Design",
        description: "Learners will apply multi-part CSS selectors and flexbox positioning with external CSS tutorial games, learning about coding, composing, and design.",
        link: "http://chadsansing.github.io/curriculum-testing/curriculum-migration/intermediate-web-lit-css-one-migrated/session07-external-css-tutorials.html"
      },
    ]
  },
];

var curriculum = curriculumList.map(function (section) {
  return (
    <ActivitySection title={section.title} key={section.title} activities={section.activities} />
  );
});

var ClubsCurricIntermediate = React.createClass({
  statics: {
    pageTitle: 'Web Literacy Basics',
    pageClassName: 'web-lit-basics'
  },

  render: function () {
    var blogPostLink = "https://blog.webmaker.org/help-us-get-local-with-web-literacy";
    return (
      <div className="inner-container">
        {Intro}
        {IntermediateWebLit}
        {curriculum}
      </div>
    );
  }
});

module.exports = ClubsCurricIntermediate;
