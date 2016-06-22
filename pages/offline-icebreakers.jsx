var React = require('react');
var Link = require('react-router').Link;
var OutboundLink = require('react-ga').OutboundLink;

var Illustration = require('../components/illustration.jsx');
var ActivitySection = require('../components/activity-section.jsx');

var CurriculumIntro = (
  <div>
    <h1>Offline Icebreakers</h1>
    <section className="intro">
      <Illustration
      height={204} width={204}
      src1x="/img/pages/offline-icebreakers/html-puzzleboxes.jpg"
      alt=""
      caption={<a href="https://mouse.org/">from MOUSE</a>}>
        <h2>Solve puzzles and play games to get to know your fellow learners and the web!</h2>
      </Illustration>
    </section>
  </div>
);

var WebLitBasics = (
  <section className="row web-lit-basics">
    <div className="col-sm-12">
      <h2>Learning Objectives</h2>
      <p>
        Help learners activate and share their prior knowledge about the web and issues like online privacy while they get to know their fellow participants.
      </p>
    </div>
  </section>
);

var curriculumList = [
  {
    title: "",
    activities: [
      {
        title: "Web Mechanics Speed Dating",
        image1x: "/img/pages/offline-icebreakers/cookies.jpg",
        originalImgSrc: "https://f8f80e43569fe52b7b6e7df741a8e3820c5e5e97.googledrive.com/host/0B5ga06pZVp55VXJ5RlhhOVRuS3M/MOTW_07",
        caption: "CC-BY-SA Mozilla",
        subtitle: "Communication, Navigate, Protect",
        description: "Web Mechanics are a combination of tools, characteristics and functions that determine how we use the internet. Knowing how web mechanics work help us protect personal information online and use and understand URLs, IP addresses, search terms, bookmarks and more. This activity will introduce the basics of web mechanics through an offline, multi-person activity. This activity can be adapted for all ages.",
        link: "https://chadsansing.github.io/curriculum-testing/offline-icebreakers/session01-web-mechanics-speed-dating.html#overview"
      },
      {
        title: "HTML Thimble Tag Puzzle",
        image1x: "/img/pages/offline-icebreakers/tag-puzzle.jpg",
        originalImgSrc: "https://pixabay.com/static/uploads/photo/2014/07/08/09/58/html5-386614_960_720.jpg ",
        caption: "CC0 Public Domain by geralt",
        subtitle: "Collaboration, Communication, Problem-solving, Synthesize",
        description: "Learners get familiar with reading, writing and participating on the web in this six-part module. Discover the foundations of the web through production and collaboration.",
        link: "https://chadsansing.github.io/curriculum-testing/offline-icebreakers/session02-html-thimble-tag-puzzle.html#overview"
      },
      {
        title: "Puzzles for Teaching HTML",
        image1x: "/img/pages/offline-icebreakers/puzzle.jpg",
        originalImgSrc: "http://farm1.staticflickr.com/124/409083204_0758fb0615.jpg",
        caption: "CC-BY 2.0 John Hritz",
        subtitle: "Collaboration, Communication, Problem-solving, Synthesize",
        description: "Explore web literacy skills with these puzzle-like activities designed to engage participants with offline learning about the web.",
        link: "https://chadsansing.github.io/curriculum-testing/offline-icebreakers/session03-puzzles-for-teaching-html.html#overview"
      },
      {
        title: "A Strong Wind Blows for Web Literacy",
        image1x: "/img/pages/offline-icebreakers/wind.png",
        originalImgSrc: "http://orig04.deviantart.net/1232/f/2015/264/9/b/free_wind_by_markbartle-d9adyw5.png",
        caption: "CC-BY 3.0 MARKBARTLE",
        subtitle: "Communication, Evaluate",
        description: "This activity is a hack of the game musical chairs. Thematic statements are introduced and learners for whom the statement is true must find a new seat.",
        link: "https://chadsansing.github.io/curriculum-testing/offline-icebreakers/session04-a-strong-wind.html#overview"
      },
      {
        title: "Web Literacy Bingo",
        image1x: "/img/pages/offline-icebreakers/bingo.jpg",
        originalImgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Classic_BINGO_game_%286679739315%29_%282%29.jpg/800px-Classic_BINGO_game_%286679739315%29_%282%29.jpg",
        caption: "CC-BY 2.0 Edwin Torres",
        subtitle: "Collaboration, Communication, Synthesize",
        description: "This activity can be used in offline settings, or between screen-based activities. Web literacy bingo allows you to explore a web literacy competency of your choice with a group of learners.",
        link: "https://chadsansing.github.io/curriculum-testing/offline-icebreakers/session05-web-literacy-bingo.html#overview"
      },
      {
        title: "HTML Puzzle Boxes",
        image1x: "/img/pages/offline-icebreakers/html-puzzleboxes.jpg",
        originalImgSrc: "https://mozilla.github.io/mozilla-club-activity-html-puzzle-boxes/activity-data/images/html-puzzleboxes.jpg",
        caption: "CC-BY-SA MOUSE",
        subtitle: "Creativity, Code, Remix",
        description: "Learners will race to sequence the paper boxes labeled with HTML tags, becoming familiar with the code and remix.",
        link: "https://chadsansing.github.io/curriculum-testing/offline-icebreakers/session06-html-puzzle-box.html#overview"
      },
    ]
  }
];

var curriculum = curriculumList.map(function (section) {
  return (
    <ActivitySection title={section.title} key={section.title} activities={section.activities} />
  );
});


var OfflineIcebreakers = React.createClass({
  statics: {
    pageTitle: 'Offline Icebreakers',
    pageClassName: 'offline-icebreakers'
  },

  render: function () {
    return (
      <div className="inner-container">
        {CurriculumIntro}
        {WebLitBasics}
        {curriculum}
      </div>
    );
  }
});

module.exports = OfflineIcebreakers;
