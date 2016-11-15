var React = require('react');
var Link = require('react-router').Link;
var OutboundLink = require('react-ga').OutboundLink;

var Illustration = require('../components/illustration.jsx');
var ActivitySection = require('../components/activity-section.jsx');

var Intro = (
  <div>
    <h1>Make Your First Webpage</h1>
    <section className="intro">
      <Illustration
      height={204} width={204}
      src1x="/img/pages/make-your-first-webpage/html9.png"
      alt="Document icon with clapping hands and the letters HTML">
        <h2>Learn to use and style common HTML tags to make your first webpage from scratch.</h2>
      </Illustration>
    </section>
  </div>
);

var IntermediateWebLit = (
  <section className="row web-lit-basics">
    <div className="col-sm-12">
      <h2>Learning Objectives</h2>
      <p>
        Learners will understand how to build and style a webpage with common HTML tags and CSS selectors, learning about skills like <strong>code</strong>, <strong>compose</strong>, <strong>design</strong>, and <strong>share</strong>.
      </p>
    </div>
  </section>
);

var curriculumList = [
  {
    title: "",
    activities: [
      {
        title: "Tag Tag Revolution",
        image1x: "/img/pages/make-your-first-webpage/html.png",
        originalImgSrc: "https://mozilla.github.io/curriculum-final/make-your-first-webpage/images/make-your-own-webpage-11.png",
        caption: "CC-BY-SA Mozilla",
        subtitle: "Code, Connect",
        description: "Learners will choreograph a dance party with tag cards, learning <strong>code</strong> and <strong>connect</strong>.",
        link: "https://mozilla.github.io/curriculum-final/make-your-first-webpage/session01-tag-tag-revolution.html"
      },
      {
        title: "HTML Puzzle Boxes",
        image1x: "/img/pages/make-your-first-webpage/html2.png",
        originalImgSrc: "https://mozilla.github.io/curriculum-final/make-your-first-webpage/images/make-your-own-webpage-1.png",
        caption: "CC-BY-SA Mozilla",
        subtitle: "Code, Remix",
        description: "Learners will race to sequence the paper boxes labeled with HTML tags, becoming familiar with the <strong>code</strong> and <strong>remix</strong>.",
        link: "https://mozilla.github.io/curriculum-final/make-your-first-webpage/session02-html-puzzle-boxes.html"
      },
      {
        title: "Build a Blank Page & Beyond",
        image1x: "/img/pages/make-your-first-webpage/html3.png",
        originalImgSrc: "https://mozilla.github.io/curriculum-final/make-your-first-webpage/images/make-your-own-webpage-10.png",
        caption: "CC-BY-SA Mozilla",
        subtitle: "Code, Compose",
        description: "Structure a blank webpage with HTML to learn about markup, <strong>code</strong>, and <strong>compose</strong>.",
        link: "https://mozilla.github.io/curriculum-final/make-your-first-webpage/session03-build-a-blank-page.html"
      },
      {
        title: "#commontags",
        image1x: "/img/pages/make-your-first-webpage/html4.png",
        originalImgSrc: "https://mozilla.github.io/curriculum-final/make-your-first-webpage/images/make-your-own-webpage-2.png",
        caption: "CC-BY-SA Mozilla",
        subtitle: "Code, Compose, Remix",
        description: "Practice applying common HTML tags to see how they work on a webpage, learning <strong>code</strong>, <strong>compose</strong>, and <strong>remix</strong>.",
        link: "https://mozilla.github.io/curriculum-final/make-your-first-webpage/session04-common-tags.html"
      },
      {
        title: "Revise a Résumé",
        image1x: "/img/pages/make-your-first-webpage/html5.png",
        originalImgSrc: "https://mozilla.github.io/curriculum-final/make-your-first-webpage/images/make-your-own-webpage-5.png",
        caption: "CC-BY-SA Mozilla",
        subtitle: "Compose, Code, Evaluate, Revise, Remix, Share",
        description: "Evaluate a résumé in need of revision and use common HTML tags to give it structure and organization, learning <strong>compose</strong>, <strong>code</strong>, <strong>evaluate</strong>, <strong>revise</strong>, <strong>remix</strong>, and <strong>share</strong>.",
        link: "https://mozilla.github.io/curriculum-final/make-your-first-webpage/session05-revise-a-resume.html"
      },
      {
        title: "Revise a Business Page",
        image1x: "/img/pages/make-your-first-webpage/html6.png",
        originalImgSrc: "https://mozilla.github.io/curriculum-final/make-your-first-webpage/images/make-your-own-webpage-7.png",
        caption: "CC-BY-SA Mozilla",
        subtitle: "Code, Compose, Evaluate, Remix, Revise, Share, Synthesize",
        description: "Exercise your HTML skills while customizing the business page and learning <strong>code</strong>, <strong>compose</strong>, <strong>evaluate</strong>, <strong>remix</strong>, <strong>revise</strong>, <strong>share</strong>, and <strong>synthesize</strong>.",
        link: "https://mozilla.github.io/curriculum-final/make-your-first-webpage/session06-revise-a-business-page.html"
      },
      {
        title: "Working with a Grid",
        image1x: "/img/pages/make-your-first-webpage/html7.png",
        originalImgSrc: "https://mozilla.github.io/curriculum-final/make-your-first-webpage/images/make-your-own-webpage-8.png",
        caption: "CC-BY-SA Mozilla",
        subtitle: "Code, Design, Evaluate, Revise, Synthesize",
        description: "Discover how HTML and CSS can work together to help you design a webpage and its structure content learning <strong>code</strong>, <strong>design</strong>, <strong>evaluate</strong>, <strong>revise</strong>, and <strong>synthesize</strong>.",
        link: "https://mozilla.github.io/curriculum-final/make-your-first-webpage/session07-working-with-a-grid.html"
      },
      {
        title: "Make Your First Webpage",
        image1x: "/img/pages/make-your-first-webpage/html8.png",
        originalImgSrc: "https://mozilla.github.io/curriculum-final/make-your-first-webpage/images/make-your-own-webpage-9.png",
        caption: "CC-BY-SA Mozilla",
        subtitle: "Code, Compose, Design, Evaluate. Share, Synthesize",
        description: "Build your very own webpage from scratch using the web literacy skills you've picked up throughout the module like <strong>code</strong>, <strong>compose</strong>, <strong>design</strong>, <strong>evaluate</strong>, <strong>share</strong>, and <strong>synthesize</strong>.",
        link: "https://mozilla.github.io/curriculum-final/make-your-first-webpage/session08-make-your-first-webpage.html"
      },
    ]
  },
];

var curriculum = curriculumList.map(function (section) {
  return (
    <ActivitySection title={section.title} key={section.title} activities={section.activities} />
  );
});

var MakeYourFirstWebpage = React.createClass({
  statics: {
    pageTitle: 'Make Your First Webpage',
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

module.exports = MakeYourFirstWebpage;
