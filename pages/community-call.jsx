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
        <div className="inner-container">
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

          <section className="callout-box">
            <h2>Upcoming Call</h2>
            <p className="date">March 23, 11 AM ET, 4pm UTC, 5pm CET, 9:30pm IST</p>
            <h1>Celebrating Women &amp; The Open Web</h1>
            <p className="description">
              Featured speakers from Arizona State University Girls in Tech, New York Hall of Science, Girl Scouts, and Hype Girl
            </p>
          </section>

          <p>
          For our first community call, in conjunction with International Women’s Day, we’ll explore topics related to teaching women and girls. Topics include best practices for engaging girls around the web and technology and case studies of programs and organizations that focus on girls and the web.
          </p>

          <p>
            Viewers can ask questions and share ideas and feedback of their own through the embedded agenda and chat.
          </p>

          <h3>Workshop Video Stream</h3>

          <div className="video-wrapper">
            <iframe className="workshop-video" width="560" height="315" src="//www.youtube.com/embed/QfvrKvx4mUk" frameborder="0" allowfullscreen></iframe>
          </div>

          <h4>
            Open Agenda
            <a title="Open the agenda in a new tab" className="fa fa-external-link open-etherpad" href="https://public.etherpad-mozilla.org/p/MozTeachCC">
            </a>
          </h4>

          <iframe className="etherpad" src="https://public.etherpad-mozilla.org/p/MozTeachCC"></iframe>

          <h2>Upcoming Workshops</h2>

          <ul className="upcoming-workshops">
            <li>
              <p className="date">Wednesday, April 20 - 11 AM ET/ 4pm UTC/ 5pm CET/ 9:30pm IST</p>
              <h2>Internet of Things</h2>
              <p>
                Featured Speakers: TBD
              </p>
            </li>
          </ul>
        </div>
    );
  }
});

module.exports = CommunityCallPage;
