var React = require('react');
var Link = require('react-router').Link;
var OutboundLink = require('react-ga').OutboundLink;

var Illustration = require('../components/illustration.jsx');
var ActivitySection = require('../components/activity-section.jsx');

var Intro = (
  <div>
    <h1>Intermediate Web Literacy II: Storytelling with Scripts</h1>
    <section className="intro">
      <Illustration
      height={204} width={204}
      src1x="/img/pages/intermediate-web-lit-two/buttons.jpg"
      alt="Multi-colored stacked blocks">
        <h2>Learn to use buttons, forms, and inputs alongside JavaScript functions to tell stories on the web.</h2>
      </Illustration>
    </section>
  </div>
);

var IntermediateWebLit = (
  <section className="row web-lit-basics">
    <div className="col-sm-12">
      <h2>Learning Objectives</h2>
      <p>
        Learners will understand how different elements of a webpage can work together with JavaScript to show off their creativity and storytelling.
      </p>
    </div>
  </section>
);

var curriculumList = [
  {
    title: "Writing the Web",
    activities: [
      {
        title: "Buttons and Alerts",
        image1x: "/img/pages/intermediate-web-lit-two/buttons.jpg",
        originalImgSrc: "https://pixabay.com/static/uploads/photo/2015/01/30/09/44/buttons-617323_960_720.jpg",
        caption: "CC0 Public Domain",
        subtitle: "Communication, Creativity, Compose, Code, Remix",
        description: "Learn how HTML, CSS, and JavaScript connect to one another by using buttons and scripts to tell a simple story.",
        link: "http://chadsansing.github.io/curriculum-testing/intermediate-web-lit-two/session01-buttons-and-alerts.html"
      },
      {
        title: "Storytelling with Three Buttons",
        image1x: "/img/pages/intermediate-web-lit-two/buttons2.jpg",
        originalImgSrc: "https://pixabay.com/static/uploads/photo/2015/07/12/08/01/buttons-841621_960_720.jpg",
        caption: "CC0 Public Domain",
        subtitle: "Communication, Creativity, Code, Compose, Remix",
        description: "Learn how to write multiple, short functions that each connect to a button on a webpage.",
        link: "http://chadsansing.github.io/curriculum-testing/intermediate-web-lit-two/session02-three-buttons.html"
      },
      {
        title: "Simple Story Generator",
        image1x: "/img/pages/intermediate-web-lit-two/sandbucket.jpg",
        originalImgSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Sand_bucket.jpg/640px-Sand_bucket.jpg",
        caption: "CC-BY 2.0",
        subtitle: "Communication, Creativity, Code, Compose, Remix",
        description: "Learn how to use arrays and the document method to generate random stories and add them to a webpage.",
        link: "http://chadsansing.github.io/curriculum-testing/intermediate-web-lit-two/session03-simple-story-generator.html"
      },
      {
        title: "Storytelling with Pictures",
        image1x: "/img/pages/intermediate-web-lit-two/ice-cream.jpg",
        originalImgSrc: "https://c2.staticflickr.com/4/3587/3400224598_df381cd754_o.jpg",
        caption: "CC-BY",
        subtitle: "Communication, Creativity, Code, Compose, Remix",
        description: "Use HTML, CSS, and JavaScript to tell a simple story using three sequential pictures.",
        link: "http://chadsansing.github.io/curriculum-testing/intermediate-web-lit-two/session04-storytelling-with-pictures.html"
      },
      {
        title: "Storytelling with User Input",
        image1x: "/img/pages/intermediate-web-lit-two/remix.jpg",
        originalImgSrc: "https://c1.staticflickr.com/9/8344/8261470476_218e9470d0.jpg",
        caption: "CC-BY-SA 2.0",
        subtitle: "Communication, Creativity, Code, Compose, Remix",
        description: "Learn how to use HTML, CSS, and JavaScript to turn user input into a brand new story on a webpage.",
        link: "http://chadsansing.github.io/curriculum-testing/intermediate-web-lit-two/session05-storytelling-with-user-input.html"
      },
      {
        title: "Storytelling with Color",
        image1x: "/img/pages/intermediate-web-lit-two/colors.png",
        originalImgSrc: "https://pixabay.com/static/uploads/photo/2013/07/12/18/57/color-154058_960_720.png",
        caption: "CC0 Public Domain",
        subtitle: "Communication, Creativity, Code, Compose, Remix",
        description: "Learn how HTML, CSS, and JavaScript connect to one another by using buttons and scripts to inspire storytelling in response to different colors.",
        link: "http://chadsansing.github.io/curriculum-testing/intermediate-web-lit-two/session06-storytelling-with-color.html"
      },
      {
        title: "Creating a Storytelling Resource",
        image1x: "/img/pages/intermediate-web-lit-two/cats.jpg",
        originalImgSrc: "https://i.ytimg.com/vi/fNwn_zJDaXg/maxresdefault.jpg",
        caption: "CC-BY",
        subtitle: "Communication, Creativity, Code, Compose, Remix",
        description: "Learn how HTML, CSS, and JavaScript connect to one another by using buttons and scripts to create storytelling prompts.",
        link: "http://chadsansing.github.io/curriculum-testing/intermediate-web-lit-two/session07-creating-a-storytelling-resource.html"
      },
      {
        title: "Storytelling with Interactive Fiction",
        image1x: "/img/pages/intermediate-web-lit-two/maze-head.png",
        originalImgSrc: "http://chadsansing.github.io/curriculum-testing/intermediate-web-lit-two/images/cyoa-maze-head-1.png",
        caption: "CC-BY-SA",
        subtitle: "Communication, Creativity, Code, Compose, Remix",
        description: "Learn how HTML, CSS, and JavaScript connect to one another by creating an interactive story that responds to user input.",
        link: "http://chadsansing.github.io/curriculum-testing/intermediate-web-lit-two/session08-storytelling-with-interactive-fiction.html"
      },
    ]
  },
];

var curriculum = curriculumList.map(function (section) {
  return (
    <ActivitySection title={section.title} key={section.title} activities={section.activities} />
  );
});

var ClubsCurricIntermediateTwo = React.createClass({
  statics: {
    pageTitle: 'Intermediate Web Literacy II',
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

module.exports = ClubsCurricIntermediateTwo;
