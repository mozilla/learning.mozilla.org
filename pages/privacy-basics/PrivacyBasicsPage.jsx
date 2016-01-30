var React = require('react');
var Illustration = require('../../components/illustration.jsx');

var Intro = (
  <div>
    <h1>Privacy Basics: Passwords, Tracking, and Data Retention</h1>
    <section className="intro">
      <Illustration
      height={204} width={204}
      src1x=" https://upload.wikimedia.org/wikipedia/commons/7/73/Monitor_padlock.svg"
      alt="">
        <h2>Learn how to safeguard your privacy online and develop an awareness of how companies and governments track and collect your data online.</h2>
      </Illustration>
    </section>
  </div>
);

var LearningObjectives = (
  <section className="row privacy-basics">
    <div className="col-sm-12">
      <h2>Learning Objectives</h2>
      <p>
        Learners will understand Web mechanics, security, and privacy as they analyze and reflect on common surveillance practices, as well as their own privacy habits.
      </p>
    </div>
  </section>
);

var sections = require('./sections.jsx');

var PrivacyBasicsPage = React.createClass({
  statics: {
    pageTitle: 'Privacy Basics: Passwords, Tracking, and Data Retention',
    pageClassName: 'privacy-basics'
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

module.exports = PrivacyBasicsPage;
