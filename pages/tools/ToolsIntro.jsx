var React = require('react');

var Illustration = require('../../components/illustration.jsx');
var config = require('../../config/config');

var ToolsIntro = (
  <div className="inner-container">
    <section className="intro intro-after-banner">
      <Illustration
        height={204} width={204}
        src1x="/img/pages/tools/svg/icon-circle-tools.svg"
        alt="icon toolkit">
        <h1>Tools to Teach and Learn the Web</h1>
        <h2>These tools are free and open source, and can be used in a variety of ways to teach learners how to read, write, and participate on the Web.</h2>
      </Illustration>
    </section>
  </div>
);

module.exports = ToolsIntro;
