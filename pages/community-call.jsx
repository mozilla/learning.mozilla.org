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

          <h3>Workshop Video Stream</h3>

          <div className="video-wrapper">
            <iframe width="560" height="315" src="//www.youtube.com/embed/Elr7leEmfcs" frameBorder="0" allowFullScreen></iframe>
          </div>

          <h4>
            Open Agenda
            <a title="Open the agenda in a new tab" className="fa fa-external-link open-etherpad" href="https://public.etherpad-mozilla.org/p/mozcommunitycallJuly16">
            </a>
          </h4>

          <iframe className="etherpad" src="https://public.etherpad-mozilla.org/p/mozcommunitycallJuly16"></iframe>

          <h2>Upcoming Calls</h2>

          <ul className="upcoming-workshops">
            <li>
              <p className="date">August TBD</p>
              <h2>Theme: TBD</h2>
            </li>
          </ul>

          <h2>Past Calls</h2>

          <ul className="past-workshops">
            <li>
              <p className="date">June 29, 2016</p>
              <h2>Learning and Making</h2>
              <p>
                Summer learning loss is a real challenge, especially for those who may not have access to enriching educational opportunities. There has been a good amount of research and discussion on this topic, and on the June community call, we’ll be exploring the types of fun and engaging learning experiences that can–and do–happen during the summer. Educators from Hive NYC, Hive Chicago and Hive Toronto will join us to share real examples of programs that illustrate the impact that learning and making can have on young people during this critical time of the year.
              </p>
              <p className="watch-archive">
                <LinkAnchorSwap to="/community/community-call/june-29-2016/">Watch the Replay</LinkAnchorSwap>
              </p>
            </li>
            <li>
              <p className="date">May 25, 2016</p>
              <h2>Gigabit</h2>
              <p>
                On this month’s call, we’ll explore how gigabit technology is transforming today’s classroom. We’ll discuss how emerging technologies like virtual reality, artificial intelligence, and 4K video streaming are being deployed to engage students, address learning needs, and create new outcomes for education.
              </p>
              <p className="watch-archive">
                <LinkAnchorSwap to="/community/community-call/may-25-2016/">Watch the Replay</LinkAnchorSwap>
              </p>
            </li>
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
