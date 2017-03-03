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
        originalImgSrc: "http://chadsansing.github.io/curriculum-testing/intermediate-web-lit-two/blue-pyramid.png",
        caption: "CC0, public domain by ClkerFreeVectorImages",
        subtitle: "Coding/Scripting, Composing, Design",
        description: "Learners will use CSS to change the size of text on an HTML webpage, learning about <strong>coding</strong>, <strong>composing</strong>, and <strong>design</strong>.",
        link: "https://mozilla.github.io/curriculum-final/intermediate-web-lit-one/session01-css-pyramid.html#overview"
      },
      {
        title: "CSS Fonts",
        image1x: "/img/pages/intermediate-web-lit/letterpress.jpg",
        originalImgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Plantin_letterpress.jpg/320px-Plantin_letterpress.jpg",
        caption: "CC-BY-SA 3.0, France3470",
        subtitle: "Coding/Scripting, Composing, Design",
        description: "Learners will use webfonts to create moods and tones on webpages, learning about <strong>coding</strong>, <strong>composing</strong>, and <strong>design</strong>.",
        link: "https://mozilla.github.io/curriculum-final/intermediate-web-lit-one/session02-css-fonts.html#overview"
      },
      {
        title: "CSS Fonts Extension: Bridge to Infinity",
        image1x: "/img/pages/intermediate-web-lit/bridge.jpg",
        originalImgSrc: "https://c1.staticflickr.com/3/2224/2271837503_756e2260b5_o.jpg",
        caption: "CC-BY 2.0, L.E. Spry",
        subtitle: "Coding/Scripting, Composing, Design",
        description: "Jump right into this Thimble project to improve the fonts on this remixable movie poster, learning about <strong>coding</strong>, <strong>composing</strong>, and <strong>design</strong>.",
        link: "https://mozilla.github.io/curriculum-final/intermediate-web-lit-one/session02a-css-fonts-extension-activity.html#overview"
      },
      {
        title: "CSS Circles",
        image1x: "/img/pages/intermediate-web-lit/circles.jpg",
        originalImgSrc: "http://res.freestockphotos.biz/pictures/9/9201-blurred-colored-lights-pv.jpg",
        caption: "CC0, Petr Kratochvil",
        subtitle: "Coding/Scripting, Composing, Design",
        description: "Learners will position, size, and color circular div elements while learning about <strong>coding</strong>, <strong>composing</strong>, and <strong>design</strong>.",
        link: "https://mozilla.github.io/curriculum-final/intermediate-web-lit-one/session03-css-circles.html#overview"
      },
      {
        title: "CSS Building Blocks",
        image1x: "/img/pages/intermediate-web-lit/blocks.png",
        originalImgSrc: "http://chadsansing.github.io/curriculum-testing/intermediate-web-lit-two/blocks.png",
        caption: "CC0, Counseling",
        subtitle: "Coding/Scripting, Composing, Design",
        description: "Learners will position, size, and color rectangular div elements while learning about the “box model” and web literacy skills like <strong>coding</strong>, <strong>composing</strong>, and <strong>design</strong>.",
        link: "https://mozilla.github.io/curriculum-final/intermediate-web-lit-one/session04-css-building-blocks.html#overview"
      },
      {
        title: "CSS Decoration",
        image1x: "/img/pages/intermediate-web-lit/decoration.jpg",
        originalImgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Ubosoth_decoration.jpg/320px-Ubosoth_decoration.jpg",
        caption: "CC-BY-SA 3.0, Michael Janich",
        subtitle: "Coding/Scripting, Composing, Design",
        description: "Learners will apply text- and box-effect CSS styling techniques to inline and block elements on an HTML webpage, learning about <strong>coding</strong>, <strong>composing</strong>, and <strong>design</strong>.",
        link: "https://mozilla.github.io/curriculum-final/intermediate-web-lit-one/session05-css-decoration.html#overview"
      },
      {
        title: "Web-o-tron & the Scrambled Divs",
        image1x: "/img/pages/intermediate-web-lit/webotron-head.png",
        originalImgSrc: "http://chadsansing.github.io/curriculum-testing/intermediate-web-lit-two/webotron-head.png",
        caption: "CC-BY, Mozilla",
        subtitle: "Coding/Scripting, Composing, Design",
        description: "Learners will apply CSS layout techniques to inline and block elements on an HTML webpage, learning about <strong>coding</strong>, <strong>composing</strong>, and <strong>design</strong>.",
        link: "https://mozilla.github.io/curriculum-final/intermediate-web-lit-one/session06-webotron-and-the-scrambled-divs.html#overview"
      },
      {
        title: "CSS External Tutorials",
        image1x: "/img/pages/intermediate-web-lit/flexbox-froggy.png",
        originalImgSrc: "http://chadsansing.github.io/curriculum-testing/intermediate-web-lit-two/flexbox-froggy-screen-cap-1.png",
        caption: "CC-BY, Mozilla",
        subtitle: "Coding/Scripting, Composing, Design",
        description: "Learners will apply multi-part CSS selectors and flexbox positioning with external CSS tutorial games, learning about <strong>coding</strong>, <strong>composing</strong>, and <strong>design</strong>.",
        link: "https://mozilla.github.io/curriculum-final/intermediate-web-lit-one/session07-external-css-tutorials.html#overview"
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
