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
            <p className="date">July 28, 9am PT / 12pm ET / 4pm UTC</p>
            <h1>Brokering Learning</h1>
            <p className="description">
              Representing libraries, game education organizations, Mozilla Club leads and Mozilla staff, guests include: Hive Cascadia (Portland, Oregon, USA), Hive Toronto (Canada), Tina Verbo from the Mozilla Philippines community.
            </p>
          </section>

          <p>
            Learning has the potential to make global impact, especially when it starts local. During this month’s call, we’ll discuss how to develop successful learning opportunities that go beyond local borders. What is the recipe for small and large organizations to move their projects beyond city limits? We’ll discuss developing city-wide learning projects, including successes and challenges, and how they connect to the global Mozilla Learning networks for broader impact.
          </p>

          <p>
            Have an idea on how to scale a project globally? Ask questions, share ideas and feedback with us live through the embedded agenda and chat on the 27th!
          </p>

          <p>
            Viewers can ask questions and share ideas and feedback of their own through the embedded agenda and chat.
          </p>

          <h3>Workshop Video Stream</h3>

          <div className="video-wrapper">
            <iframe className="workshop-video" width="560" height="315" src="//www.youtube.com/embed/Elr7leEmfcs" frameBorder="0" allowFullScreen></iframe>
          </div>

          <h4>
            Open Agenda
            <a title="Open the agenda in a new tab" className="fa fa-external-link open-etherpad" href="https://public.etherpad-mozilla.org/p/mozcommunitycallJuly16">
            </a>
          </h4>

          <iframe className="etherpad" src="https://public.etherpad-mozilla.org/p/mozcommunitycallJuly16"></iframe>

        </div>
    );
  }
});

module.exports = CommunityCallPage;
