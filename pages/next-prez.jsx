var React = require('react');
var Link = require('react-router').Link;
var OutboundLink = require('react-ga').OutboundLink;

var Illustration = require('../components/illustration.jsx');
var ActivitySection = require('../components/activity-section.jsx');

var Intro = (
  <div>
    <h1>Using the Web to Write Letters to the Next President</h1>
    <section className="intro">
      <Illustration
      height={204} width={204}
      src1x="/img/pages/2nextprez/government-building.jpg"
      alt="government building">
        <h2>Use Thimble to tell the next President of the United States what issues matter to you most.</h2>
      </Illustration>
    </section>
  </div>
);

var IntermediateWebLit = (
  <section className="row web-lit-basics">
    <div className="col-sm-12">
      <h2>Learning Objectives</h2>
      <p>
        Remix HTML and CSS. Evaluate messages in political campaign materials. Compose critical and persuasive media online. Create and then submit your own online letters, memes, quotes, and campaign posters as part of the National Writing Project’s <a href="https://letters2president.org/">Letters to the Next President 2.0</a> campaign. Share your remixes on social media using #2NextPrez.
      </p>
    </div>
  </section>
);

var curriculumList = [
  {
    title: "Writing the Web",
    activities: [
      {
        title: "#2NextPrez My Letter to the Next President",
        image1x: "/img/pages/2nextprez/government-building.jpg",
        originalImgSrc: "https://c2.staticflickr.com/8/7071/7099628023_fbe58682da_k.jpg",
        caption: "CC-BY 2.0 angela n",
        subtitle: "Compose, Evaluate, Remix",
        description: "Share your advice with the next President of the United States and let them know which issues and decisions matter most to you!",
        link: "https://thimbleprojects.org/chadsansing/24389/"
      },
      {
        title: "#2NextPrez Campaign Poster Project",
        image1x: "/img/pages/2nextprez/woman.jpg",
        originalImgSrc: "https://pixabay.com/en/woman-group-silhouette-rate-73115/",
        caption: "CC0 geralt",
        subtitle: "Compose, Evaluate, Remix",
        description: "Create your own campaign poster supporting (or satirizing) a popular presidential candidate.",
        link: "https://thimbleprojects.org/chadsansing/29290/"
      },
      {
        title: "#2NextPrez Candidate Meme Project",
        image1x: "/img/pages/2nextprez/silly_dog.jpg",
        originalImgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Silly_Dog_%282277051513%29.jpg/800px-Silly_Dog_%282277051513%29.jpg",
        caption: "CC-BY-SA allen watkin",
        subtitle: "Compose, Evaluate, Remix",
        description: "Share your best advice for the next President of the United States using this make-your-own-meme project.",
        link: "https://thimbleprojects.org/chadsansing/31632/"
      },
      {
        title: "#2NextPrez Candidate Quote Project",
        image1x: "/img/pages/2nextprez/cat_mic.jpg",
        originalImgSrc: "https://c2.staticflickr.com/8/7197/7091324605_6b97b8808f_o.jpg",
        caption: "CC-BY 2.0 ocean yamaha",
        subtitle: "Compose, Evaluate, Remix",
        description: "Combine pictures and words to frame and share a key quote from a presidential candidate.",
        link: "https://thimbleprojects.org/chadsansing/29280/"
      },
      {
        title: "#2NextPrez Composing and Annotating with Thimble and Hypothes.is",
        image1x: "/img/pages/2nextprez/annotation.png",
        originalImgSrc: "https://thimbleprojects.org/chadsansing/30045/#overview",
        caption: "screencap by Mozilla from a video by Hypothes.is",
        subtitle: "Compose, Evaluate, Remix",
        description: "Use the web-native annotation tool Hypothes.is to share insights and analysis as you read and annotate peers’ Letters to the Next President projects.",
        link: "https://thimbleprojects.org/chadsansing/30045/#overview"
      },
    ]
  },
];

var curriculum = curriculumList.map(function (section) {
  return (
    <ActivitySection title={section.title} key={section.title} activities={section.activities} />
  );
});

var NextPrez = React.createClass({
  statics: {
    pageTitle: 'Write Letters to the Next President',
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

module.exports = NextPrez;
