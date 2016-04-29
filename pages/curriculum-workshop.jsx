var React = require('react');
var HeroUnit = require('../components/hero-unit.jsx');
// use this LinkAnchorSwap component for hyperlinks
var LinkAnchorSwap = require('../components/link-anchor-swap.jsx');
var Illustration = require('../components/illustration.jsx');

var CurriculumWorkshop = React.createClass({
  statics: {
    pageClassName: 'curriculum-workshop',
    pageTitle: 'Curriculum Workshops'
  },
  render: function () {
    return (
        <div className="inner-container call-container">
          <section className="intro intro-after-banner">
           <Illustration
             height={175} width={175}
             src1x="/img/pages/community/svg/icon-circle-community.svg"
             alt="icon toolkit">
               <h1>Mozilla Curriculum Workshop</h1>
               <h2>Join us on the second Tuesday of each month at 8 PM ET!</h2>
           </Illustration>
          </section>

          <p>
          Co-hosts Amira Dhalla and Chad Sansing, along with producers Kristina Gorr and Paul Oh, help participants answer the question, <em>"How can I use the web to teach and learn what’s important to me?"</em> Join us as we prototype teaching and learning materials live on-air and think out-loud through the curriculum design process.
          </p>

          <section className="callout-box">
            <h2>Upcoming Workshop</h2>
            <p className="date">May 10th - 7 AM PT, 10 AM ET, 2 PM GMT</p>
            <h1>Youth Civic Engagement</h1>
            <p className="description">
              With Rafranz Davis, Jeremy Dean, and D.C. Vito
            </p>
          </section>

          <p>
            On our May episode of the Mozilla Curriculum Workshop, Rafranz Davis, Jeremy Dean, and D.C. Vito will help us learn about youth civic engagement. We’ll talk about compelling examples of youth organization and leadership before we prototype resources that might help foster both. Join the work on our shared etherpad and help us build something useful to youth near you!
          </p>

          <p>
            You can also join the discussion on <LinkAnchorSwap to="https://discourse.webmaker.org/c/mozilla-curriculum-workshop">our community forum</LinkAnchorSwap> or <LinkAnchorSwap to="https://github.com/MozillaFoundation/curriculum-workshop">GitHub</LinkAnchorSwap>.
          </p>

          <h3>Workshop Video Stream</h3>

          <div className="video-wrapper">
            <iframe width="560" height="315" src="//www.youtube.com/embed/dReBsw0oiy0" frameborder="0" allowfullscreen></iframe>
          </div>
          <h4>
            Open Agenda
            <a title="Open the agenda in a new tab" className="fa fa-external-link open-etherpad" href="https://public.etherpad-mozilla.org/p/curriculum-workshop-may-10-2016">
            </a>
          </h4>

          <iframe className="etherpad" src="https://public.etherpad-mozilla.org/p/curriculum-workshop-may-10-2016"></iframe>

          <h2>Upcoming Workshops</h2>

          <ul className="upcoming-workshops">
            <li>
              <p className="date">June 14, 2016 - 10am PT / 1pm ET / 5pm GMT</p>
              <h2>Summer Learning</h2>
              <p>
                Join co-hosts Amira Dhalla and Chad Sansing broadcasting live from Mozilla's all-hands work week. Invited guests and drop-in Mozillians will talk shop about summer learning and curriculum development for the web.
              </p>
            </li>
          </ul>

          <h2>Past Workshops</h2>

          <ul className="past-workshops">
            <li>
              <p className="date">March 8th, 2016</p>
              <h2>International Women's Day</h2>
              <p>
                On our inaugural, International Women’s Day episode, Ingrid Dahl, Claire Shorall, Kim Wilkens and friends prototype teaching and learning materials addressing women’s issues, rights, and accomplishments. Viewers can ask questions and share ideas and prototypes of their own through the embedded agenda and chat.
              </p>
              <p className="watch-archive">
                <LinkAnchorSwap to="/community/curriculum-workshop/march-8-2016/">Watch the Replay</LinkAnchorSwap>
              </p>
            </li>
            <li>
              <p className="date">April 12th, 2016</p>
              <h2>Physical Computing</h2>
              <p>
                On our April episode of the Mozilla Curriculum Workshop, <LinkAnchorSwap to="http://scholarslab.org/people/jeremy-boggs/">Jeremy Boggs</LinkAnchorSwap>, <LinkAnchorSwap to="http://www.nataliefreed.com/">Natalie Freed</LinkAnchorSwap>, <LinkAnchorSwap to="http://andregarzia.com/pages/en/blog/">Andre Garzia</LinkAnchorSwap>, and <LinkAnchorSwap to="http://technolojie.com/">Jie Qi</LinkAnchorSwap> will help us understand physical computing as a gateway into the Internet of Things (IoT), the network of connected devices embedded in everyday objects. An in-depth episode on IoT will follow this summer.
              </p>
              <p className="watch-archive">
                <LinkAnchorSwap to="/community/curriculum-workshop/april-12-2016/">Watch the Replay</LinkAnchorSwap>
              </p>
            </li>
          </ul>
        </div>
    );
  }
});

module.exports = CurriculumWorkshop;
