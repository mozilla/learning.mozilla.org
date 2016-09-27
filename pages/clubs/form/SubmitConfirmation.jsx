var React = require('react');

var Divider = require('../../../components/Divider.jsx');
var VerticalLeader = require('../../../components/VerticalLeader.jsx');

var IconLinks = require('../../../components/icon-links.jsx');
var IconLink = require('../../../components/icon-link.jsx');
var Illustration = require('../../../components/illustration.jsx');
var ImageTag = require('../../../components/imagetag.jsx');

var config = require('../../../config/config');

var StepThree = React.createClass({
  render: function() {
    var className = "step3" + (this.props.hidden ? " hidden" : "");

    return (
      <div className={className}>
        <VerticalLeader height="6em"/>

        <p className="learn-more">To learn more about Mozilla Clubs, read the <a href="http://mozilla.github.io/learning-networks/clubs/facts">Fact Sheet</a>.</p>

        <Divider/>

        <div className="social">
          <IconLinks>
            <IconLink
              link="/activities/web-lit-basics/"
              imgSrc="/img/pages/clubs/svg/icon-curriculum.svg"
              head="Start Teaching"
              subhead="Use our remixable Web Literacy curriculum."
              highlightedText="Web Literacy curriculum"
            />
            <IconLink
              link="https://discourse.webmaker.org/c/mozilla-clubs"
              imgSrc="/img/pages/clubs/svg/icon-connect.svg"
              head="Connect"
              subhead="Connect with other Club Leaders."
              highlightedText="Connect"
            />
            <IconLink
              link="http://mozilla.github.io/learning-networks/clubs/"
              imgSrc="/img/pages/clubs/svg/icon-tips.svg"
              head="Get Help"
              subhead="Resources for running your Club."
              highlightedText="Resources"
            />
          </IconLinks>
        </div>
      </div>
    );
  }
});

module.exports = StepThree;
