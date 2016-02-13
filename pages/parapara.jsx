var React = require('react');
var Illustration = require('../components/illustration.jsx');
var ActivitySection = require('../components/activity-section.jsx');
var Link = require('react-router').Link;

var Intro = (
  <div>
    <h1>Animation on the Open Web with Fabble, Para Para, and 3D Projection Mapping</h1>
    <section className="intro">
      <Illustration
      height={204} width={204}
      src1x="/img/pages/parapara/parapara.jpg"
      alt="">
        <h2>Learn to use Mozilla Factory’s Parapara and Fabble, open web tools for animation and sharing work online. Create 2D animations, 3D projection-mapped animations, and ‘recipes’ that others can fork for remix on Fabble.</h2>
      </Illustration>
    </section>
  </div>
);

var Objectives = (
  <section className="row web-lit-basics">
    <div className="col-sm-12">
      <h2>Learning Objectives</h2>
      <p>
        Learners will understand composing, open practice, and sharing on the Web.
      </p>
    </div>
  </section>
);

var content = {
  title: "Participating on the Web",
  activities: [
    {
      title: "Agenda",
      image1x: "/img/pages/activities/parapara.jpg",
      originalImgSrc: "http://fabble.cc/uploads/figure/content/5625b974676974668fc60d00/small_DSC_4310_.jpg",
      subtitle: "Understanding composing",
      description: "Learners will create 2D and projection-mapped 3D animations with Para Para and then share their own ideas for projects using Fabble, learning <strong>composing, open practice, and sharing</strong>.",
      link: "http://chadsansing.github.io/curriculum-testing/para-para-and-fabble/index.html"
    },
    {
      title: "Creating a 2D Parapara Animation",
      image1x: "/img/pages/parapara/2D-animation.png",
      originalImgSrc: "http://parapara.mozlabs.jp/designs/space/preview/space.png",
      subtitle: "Understanding composing",
      description: "Learners will create and share their own 2D Parapara animations, learning <strong>community participation, composing, open practice, and sharing</strong>.",
      link: "http://chadsansing.github.io/curriculum-testing/para-para-and-fabble/para-para-2d.html"
    },
    {
      title: "Projection Mapping with Parapara Animation",
      image1x: "/img/pages/parapara/projection-mapping.jpg",
      image2x: "/img/pages/parapara/projection-mapping.jpg",
      originalImgSrc: "http://fabble.cc/uploads/figure/content/5625b967676974668c610e00/small_DSC_4322_.jpg",
      subtitle: "Understanding composing",
      description: "Create your own projection mapping with Parapara Animation.",
      link: "http://fabble.cc/comozilla/pm-with-parapara#5620b71f6769742ae1b64400"
    },
    {
      title: "Fabble Tutorial",
      image1x: "/img/pages/parapara/fabble-tutorial.png",
      image2x: "/img/pages/parapara/fabble-tutorial@2x.png",
      originalImgSrc: "http://fabble.cc/uploads/figure/content/55634f776769740f143a0a00/medium_top_unlogin_large.png",
      subtitle: "Understanding sharing",
      description: "Share your work on the open web with this documentation and storytelling platform from Mozilla Factory.",
      link: "http://fabble.cc/fabble/tutorial-en"
    }
  ]
};

var ParaparaPage = React.createClass({
  statics: {
    pageTitle: 'Animation on the Open Web',
    pageClassName: 'parapara-page'
  },
  render: function() {
    return (
      <div className="inner-container">
        {Intro}
        {Objectives}
        <ActivitySection title={content.title} activities={content.activities} />
      </div>
    );
  }
});


module.exports = ParaparaPage;
