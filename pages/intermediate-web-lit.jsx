var React = require('react');
var Link = require('react-router').Link;

var Illustration = require('../components/illustration.jsx');
var ActivitySection = require('../components/activity-section.jsx');

var Intro = (
  <div>
    <h1>Intermediate Web Literacy I: Intro to CSS</h1>
    <section className="intro">
      <Illustration
      height={204} width={204}
      src1x="/img/pages/name-of-page/filename.extension"
      src2x="/img/pages/name-of-page/filename@2x.extension"
      alt="">
        <h2>Learn to style HTML elements on a webpage using CSS selectors, attributes, and values.</h2>
      </Illustration>
    </section>
  </div>
);

var LearningObjectives = (
  <section className="row">
    <div className="col-sm-12">
      <h2>Learning Objectives</h2>
      <p>
        Learners will understand and apply coding/scripting, composing, and design with CSS.
      </p>
    </div>
  </section>
);

var sectionList = [
  {
    title: "Section Title",
    activities: [
      {
        title: "CSS Word Pyramid",
        image1x: "/img/pages/intermediate-web-lit/blue-pyramid.png",
        image2x: "/img/pages/intermediate-web-lit/blue-pyramid@2x.png",
        subtitle: "",
        originalImgSrc: "http://chadsansing.github.io/curriculum-testing/intermediate-web-lit-two/blue-pyramid.png",
        caption: "CC0, public domain by ClkerFreeVectorImages",
        description: "Learners will use CSS to change the size of text on an HTML webpage, learning about <strong>coding</strong>, <strong>composing</strong>, and <strong>design</strong>.",
        link: "http://chadsansing.github.io/curriculum-testing/curriculum-migration/intermediate-web-lit-css-one-migrated/session01-css-word-pyramid.html#overview"
      },
      {
        title: "CSS Fonts",
        image1x: "/img/pages/intermediate-web-lit/320px-Plantin_letterpress.jpg",
        originalImgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Plantin_letterpress.jpg/320px-Plantin_letterpress.jpg",
        caption: "CC-BY-SA 3.0, France3470",
        subtitle: "",
        description: "Learners will use webfonts to create moods and tones on webpages, learning about <strong>coding</strong>, <strong>composing</strong>, and <strong>design</strong>.",
        link: "http://chadsansing.github.io/curriculum-testing/curriculum-migration/intermediate-web-lit-css-one-migrated/session02-css-fonts.html#overview"
      },
      {
        title: "CSS Fonts Extension: Bridge to Infinity",
        image1x: "/img/pages/intermediate-web-lit/bridge-to-infinity.jpg",
        image2x: "/img/pages/intermediate-web-lit/bridge-to-infinity@2x.jpg",
        originalImgSrc: "https://c1.staticflickr.com/3/2224/2271837503_756e2260b5_o.jpg",
        caption: "CC-BY 2.0, L.E. Spry",
        subtitle: "",
        description: "Jump right into this Thimble project to improve the fonts on this remixable movie poster, learning about <strong>coding</strong>, <strong>composing</strong>, and <strong>design</strong>.",
        link: "https://d157rqmxrxj6ey.cloudfront.net/chadsansing/22265/"
      },
      {
        title: "CSS Circles",
        image1x: "/img/pages/intermediate-web-lit/CSS_Circles.jpg",
        image2x: "/img/pages/intermediate-web-lit/CSS_Circles@2x.jpg",
        originalImgSrc: "http://res.freestockphotos.biz/pictures/9/9201-blurred-colored-lights-pv.jpg",
        caption: "CC0, Petr Kratochvil",
        subtitle: "",
        description: " Learners will search for webfonts to include in a webpage, matching the mood, purpose, tone and voice of the page while learning about <strong>coding</strong>, <strong>composing</strong>, and <strong>design</strong>.",
        link: "http://chadsansing.github.io/curriculum-testing/curriculum-migration/intermediate-web-lit-css-one-migrated/session03-css-circles.html#overview"
      },
      {
        title: "CSS Building Blocks",
        image1x: "/img/pages/intermediate-web-lit/blocks.jpg",
        image2x: "/img/pages/intermediate-web-lit/blocks@2x.jpg",
        originalImgSrc: "",
        caption: "",
        subtitle: "",
        description: "Learners will search for webfonts to include in a webpage, matching the mood, purpose, tone and voice of the page while learning about <strong>coding</strong>, <strong>composing</strong>, and <strong>design</strong>.",
        link: "http://chadsansing.github.io/curriculum-testing/curriculum-migration/intermediate-web-lit-css-one-migrated/session04-css-building-blocks.html#overview "
      },
      {
        title: "CSS Decoration",
        image1x: "/img/pages/intermediate-web-lit/Ubosoth_decoration.jpg",
        originalImgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Ubosoth_decoration.jpg/320px-Ubosoth_decoration.jpg",
        caption: "CC-BY-SA 3.0, Michael Janich",
        subtitle: "",
        description: "Learners will apply text- and box-effect CSS styling techniques to inline and block elements on an HTML webpage, learning about <strong>coding</strong>, <strong>composing</strong>, and <strong>design</strong>.",
        link: "http://chadsansing.github.io/curriculum-testing/curriculum-migration/intermediate-web-lit-css-one-migrated/session05-css-decoration.html#overview "
      },
      {
        title: "Webotron & the Scrambled Divs",
        image1x: "/img/pages/intermediate-web-lit/webotron-head.png",
        originalImgSrc: "http://chadsansing.github.io/curriculum-testing/intermediate-web-lit-two/webotron-head.png",
        caption: "CC-BY, Mozilla",
        subtitle: "",
        description: "Learners will apply text- and box-effect CSS styling techniques to inline and block elements on an HTML webpage, learning about <strong>coding</strong>, <strong>composing</strong>, and <strong>design</strong>.",
        link: "http://chadsansing.github.io/curriculum-testing/curriculum-migration/intermediate-web-lit-css-one-migrated/session06-webotron-and-the-scrambled-divs.html#overview "
      },
      {
        title: "CSS External Tutorials",
        image1x: "/img/pages/intermediate-web-lit/flexbox-froggy-screen-cap-1.png",
        image2x: "/img/pages/intermediate-web-lit/flexbox-froggy-screen-cap-1@2x.png",
        originalImgSrc: "http://chadsansing.github.io/curriculum-testing/intermediate-web-lit-two/flexbox-froggy-screen-cap-1.png",
        caption: "CC-BY, Mozilla",
        subtitle: "",
        description: "Learners will apply multi-part CSS selectors and flexbox positioning with external CSS tutorial games, learning about <strong>coding</strong>, <strong>composing</strong>, and <strong>design</strong>.",
        link: "http://chadsansing.github.io/curriculum-testing/curriculum-migration/intermediate-web-lit-css-one-migrated/session07-external-css-tutorials.html#overview"
      }
    ]
  },
  {
    title: "Another Section Title",
    activities: [
      {
        title: "Title",
        image1x: "",
        originalImgSrc: "",
        caption: "",
        subtitle: "",
        description: "im the description im the description im the description im the description",
        link: ""
      },
      {
        title: "Another Title",
        image1x: "",
        originalImgSrc: "",
        caption: "",
        subtitle: "",
        description: "im the description im the description im the description im the description",
        link: ""
      }
    ]
  }
];

var sections = sectionList.map(function (section, key) {
  return (
    <ActivitySection title={section.title} key={section.title} activities={section.activities} />
  );
});

var ProtectYourData = React.createClass({
  statics: {
    pageTitle: 'Protect Your Data',
    pageClassName: 'protect-your-data'
  },
  render: function() {
    return (
      <div className="inner-container">
        {Intro}
        {LearningObjectives}
        {sections}
      </div>
    );
  }
});

module.exports = ProtectYourData;
