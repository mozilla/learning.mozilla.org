var React = require('react');
var Illustration = require('../components/illustration.jsx');
var ActivitySection = require('../components/activity-section.jsx');
var Router = require('react-router');
var Link = Router.Link;

var CurriculumIntro = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Back-to-School Write the Web Kit</h1>
        <section className="intro">
          <Illustration
            height={204} width={204}
            src1x="/img/pages/back-to-school-write-the-web/img-main.jpg"
            src2x="/img/pages/back-to-school-write-the-web/img-main@2x.jpg"
            alt="Graph paper wad">
            <h2>Learn how to remix and write basic HTML, CSS, and JavaScript with these Back-to-School Thimble activities and lesson plans.</h2>
          </Illustration>
        </section>
      </div>
    );
  }
});

var BackToSchoolWrite = React.createClass({
  render: function () { 
    return (
      <section className="row back-to-school-write-the-web">
        <div className="col-sm-12">
          <h2>Learning Objectives</h2>
          <p>
            Learners will understand navigation, search, composing, remix, coding/scripting as they learn to write the Web.
          </p>
        </div>
      </section>
    );
  }
});

var ClubsCurriculum = React.createClass({
  statics: {
    pageTitle: 'Back-to-School Write the Web Kit',
    pageClassName: 'back-to-school-write-the-web'
  },
  curriculum: [
    {
      title: "Reading the Web",
      activities: [
        {
          title: "School Around the World Teaching Kit",
          image1x: "/img/pages/back-to-school-write-the-web/img-valenciano.jpg",
          image2x: "/img/pages/back-to-school-write-the-web/img-valenciano@2x.jpg",
          subtitle: "Understanding Search",
          description: "Students explore classrooms around the world and learn how to search for images and information to create a basic webpage.",
          link: "https://chadsansing.github.io/curriculum-testing/school-around-the-world/session03-schoolaroundtheworld.html"
        }
      ]
    },
    {
      title: "Writing the Web",
      activities: [
        {
          title: "My Six-Word Summer",
          image1x: "/img/pages/back-to-school-write-the-web/img-six-word.jpg",
          image2x: "/img/pages/back-to-school-write-the-web/img-six-word@2x.jpg",
          subtitle: "Understanding Composing",
          description: "Learners reflect on their summer break by remixing and editing text and HTML on a webpage.",
          link: "https://d157rqmxrxj6ey.cloudfront.net/mozillalearning/11704/"
        },
        {
          title: "Remix My Schedule Teaching Kit",
          image1x: "/img/pages/back-to-school-write-the-web/img-remix.jpg",
          image2x: "/img/pages/back-to-school-write-the-web/img-remix@2x.jpg",
          subtitle: "Understanding Composing",
          description: "Students create customized, webby versions of their school schedule by remixing and editing text and HTML on a basic webpage.",
          link: "https://chadsansing.github.io/curriculum-testing/remix-my-schedule/session02-remixmyschedule.html"
        },
        {
          title: "Homework Excuse Generator Teaching Kit",
          image1x: "/img/pages/back-to-school-write-the-web/img-main.jpg",
          image2x: "/img/pages/back-to-school-write-the-web/img-main@2x.jpg",
          subtitle: "Understanding Coding/Scripting",
          description: "Students create an interactive webpage while learning basic JavaScript functions.",
          link: "https://d157rqmxrxj6ey.cloudfront.net/mozillalearning/11701/"
        },
        {
          title: "3 Things I <3 Teaching Kit",
          image1x: "/img/pages/back-to-school-write-the-web/img-three-things.png",
          image2x: "/img/pages/back-to-school-write-the-web/img-three-things@2x.png",
          subtitle: "Understanding Web Navigation",
          description: "Learners remix text and HTML to create a multi-page website that highlights their interests.",
          link: "https://d157rqmxrxj6ey.cloudfront.net/mozillalearning/11288/ "
        }
      ]
    }
  ],
  render: function () {
    return (
      <div className="inner-container">
        <CurriculumIntro/>
        <BackToSchoolWrite/>
        {this.curriculum.map(function (section) {
          return (
            <ActivitySection title={section.title} key={section.title} activities={section.activities} />
          );
        })}
      </div>
    );
  }
});

module.exports = ClubsCurriculum;
