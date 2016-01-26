var React = require('react');
var Illustration = require('../../components/illustration.jsx');

var Intro = (
  <section className="intro intro-after-banner">
    <Illustration
      height={204} width={204}
      src1x="/img/pages/community/svg/icon-circle-community.svg"
      alt="icon toolkit">
      <h1>Connect with Others</h1>
      <h2>Introduce yourself in the Mozilla Learning Network discussion forum, help test out the latest curriculum modules, or start a new thread about a related issue or challenge you care about.</h2>
      <a href="https://discourse.webmaker.org/" className="btn btn-awsm">Join the Discussion <i className="fa fa-external-link"></i></a>
    </Illustration>
  </section>
);

module.exports = Intro;
