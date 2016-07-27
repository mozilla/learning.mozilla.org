var React = require('react');
var FormattedMessage = require('react-intl').FormattedMessage;

var Illustration = require('../../components/illustration.jsx');
var config = require('../../config/config');

var ToolsIntro = (
  <div className="inner-container">
    <section className="intro intro-after-banner">
      <Illustration
        height={204} width={204}
        src1x="/img/pages/tools/svg/icon-circle-tools.svg"
        alt="icon toolkit">
        <h1><FormattedMessage id='tools_intro_h1' /></h1>
        <h2><FormattedMessage id='tools_intro_h2' /></h2>
      </Illustration>
    </section>
  </div>
);

module.exports = ToolsIntro;
