var React = require('react');
var HeroUnit = require('../components/hero-unit.jsx');
// use this LinkAnchorSwap component for hyperlinks
var LinkAnchorSwap = require('../components/link-anchor-swap.jsx');
var Illustration = require('../components/illustration.jsx');

var CommunityCallPage = React.createClass({
  statics: {
    pageClassName: 'community-call',
    pageTitle: 'Community Call'
  },
  render: function () {
    return (
        <div className="inner-container call-container">
          <section className="intro intro-after-banner">
           <Illustration
             height={175} width={175}
             src1x="/img/pages/community/svg/icon-circle-community.svg"
             alt="icon toolkit">
               <h1>Mozilla Learning Community Call </h1>
               <h2>Join us to learn more about&mdash;and be inspired by&mdash;projects happening across our community. </h2>
           </Illustration>
          </section>

          <p>
            This monthly community call provides the opportunity to connect in real time with Mozilla and to ask questions and interact with others in our community who are doing their part to #teachtheweb.
          </p>

          <section className="callout-box past-workshop">
            <h2>Archived Call</h2>
            <p className="date">October 13th - 8am PT/ 11am ET/ 3pm UTC</p>
            <h1>Ada Lovelace Day & Women in STEM</h1>
          </section>

          <p>
            Celebrate Ada Lovelace Day and women in STEM with Mozilla Learning, the Mozilla Science Lab and our guest speakers: Kirstie Whitaker, Postdoc at University of Cambridge, UK and Mozilla Science Lab 2016 Fellow; Zannah Marsh, Curriculum Strategist for Mozilla Science Lab; Srushtika Neelakantam, Mozilla Clubs Captain
          </p>
          <p>
            The presence and participation of women in STEM (science, technology, engineering, mathematics) is on the rise thanks to the efforts of many across the globe, but there are still obstacles and barriers to overcome. This month, Mozilla Learning and the Mozilla Science Lab are joining forces to explore current opportunities and supports for women in STEM around the world.
          </p>

          <h3>Workshop Video Stream</h3>

          <div className="video-wrapper">
            <iframe className="workshop-video" width="560" height="315" src="https://air.mozilla.org/mozilla-learning-science-community-call-2016-10-13/video/" frameBorder="0" allowFullScreen></iframe>
          </div>

          <h4>
            Open Agenda
            <a title="Open the agenda in a new tab" className="fa fa-external-link open-etherpad" href="https://public.etherpad-mozilla.org/p/sciencelab-calls-oct13-2016">
            </a>
          </h4>

          <iframe className="etherpad" src="https://public.etherpad-mozilla.org/p/sciencelab-calls-oct13-2016"></iframe>

        </div>
    );
  }
});

module.exports = CommunityCallPage;
