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
            <p className="date">May 25, 11am HADT / 1pm PT / 4pm ET / 8pm GMT / 10pm SAST</p>
            <h1>Gigabit</h1>
            <p className="description">
              Featured speakers: Caleb Bagby, teacher at Red Bank High School in Chattanooga; Chad Sansing, Curriculum Developer and Web Literacy for Mozilla; and Rebecca Dove and Quest Taylor, who are working together on an artificial intelligence literacy application called Pennez.
            </p>
          </section>

          <p>
            Technology is continually advancing. Join us as we explore how high-speed, low-latency gigabit networks are allowing educational technology to advance rapidly. Thanks to these new connection speeds, education has the opportunity to evolve in ways that wouldn’t be possible on traditional networks, becoming more immersive and more engaging than ever before.
          </p>

          <p>
            On this month’s call, we’ll explore how gigabit technology is transforming today’s classroom. We’ll discuss how emerging technologies like virtual reality, artificial intelligence, and 4K video streaming are being deployed to engage students, address learning needs, and create new outcomes for education.
          </p>

          <p>
            Viewers can ask questions and share ideas and feedback of their own through the embedded agenda and chat.
          </p>

          <h3>Workshop Video Stream</h3>

          <div className="video-wrapper">
            <iframe className="workshop-video" width="560" height="315" src="//www.youtube.com/embed/LlEXY8NKxoY" frameBorder="0" allowFullScreen></iframe>
          </div>

          <h4>
            Open Agenda
            <a title="Open the agenda in a new tab" className="fa fa-external-link open-etherpad" href="https://public.etherpad-mozilla.org/p/mozcommunitycallMay16">
            </a>
          </h4>

          <iframe className="etherpad" src="https://public.etherpad-mozilla.org/p/mozcommunitycallMay16"></iframe>

        </div>
    );
  }
});

module.exports = CommunityCallPage;
