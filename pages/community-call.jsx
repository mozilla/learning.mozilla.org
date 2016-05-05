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

          <section className="callout-box">
            <h2>Upcoming Call</h2>
            <p className="date">May 25th, 11am HADT / 1pm PT / 4pm ET / 8pm GMT / 10pm SAST</p>
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
            <iframe width="560" height="315" src="//www.youtube.com/embed/LlEXY8NKxoY" frameborder="0" allowfullscreen></iframe>
          </div>

          <h4>
            Open Agenda
            <a title="Open the agenda in a new tab" className="fa fa-external-link open-etherpad" href="https://public.etherpad-mozilla.org/p/mozcommunitycallMay16">
            </a>
          </h4>

          <iframe className="etherpad" src="https://public.etherpad-mozilla.org/p/mozcommunitycallMay16"></iframe>

          <h2>Upcoming Calls</h2>

          <ul className="upcoming-workshops">
            <li>
              <p className="date">June 29th</p>
              <h2>Theme: Summer Learning</h2>
              <p>
                 Featured Speakers: TBD
              </p>
            </li>
          </ul>

          <h2>Past Calls</h2>

          <ul className="past-workshops">
            <li>
              <p className="date">April 20, 2016</p>
              <h2>Internet of Things</h2>
              <p>
                In this call, we’ll explore how we’d like to control our personal data in the home, especially as homes become increasingly connected. We’ll compare how people from India, Scotland, Germany, the UK and beyond are engaging with these questions and how we can build provocative prototypes that bring these ideas to life.
              </p>
              <p className="watch-archive">
                <LinkAnchorSwap to="/community/community-call/april-20-2016/">Watch the Replay</LinkAnchorSwap>
              </p>
            </li>
            <li>
              <p className="date">March 23, 2016</p>
              <h2>Celebrating Women &amp; The Open Web</h2>
              <p>
                For our first community call, in conjunction with International Women’s Day, we’ll explore topics related to teaching women and girls. Topics include best practices for engaging girls around the web and technology and case studies of programs and organizations that focus on girls and the web.
              </p>
              <p className="watch-archive">
                <LinkAnchorSwap to="/community/community-call/march-23-2016/">Watch the Replay</LinkAnchorSwap>
              </p>
            </li>
          </ul>


        </div>
    );
  }
});

module.exports = CommunityCallPage;
