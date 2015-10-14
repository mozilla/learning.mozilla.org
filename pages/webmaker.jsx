var React = require('react');

var Illustration = require('../components/illustration.jsx');

var ActivitySection = require('../components/activity-section.jsx');

var Router = require('react-router');

var Link = Router.Link;




var CurriculumIntro = React.createClass({

  render: function () {

    return (

      <div>

        <h1>Web Literacy Basics</h1>

        <section className="intro">

          <Illustration height={204} width={204}
                        src1x="/img/pages/web-lit-basics/photo-clubs-curriculum.jpg"
                        src2x="/img/pages/web-lit-basics/photo-clubs-curriculum@2x.jpg"
                        alt="Woman training a young man on a computer"
                        className="illustration-img-circle">

            <h2>Learners get familiar with reading, writing and participating on the web in this six-part module. Discover the foundations of the web through production and collaboration.</h2>

          </Illustration>

        </section>

      </div>

    );

  }

});