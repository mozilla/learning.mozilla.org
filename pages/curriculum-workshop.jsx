var React = require('react');
var HeroUnit = require('../components/hero-unit.jsx');
// use this LinkAnchorSwap component for hyperlinks
var LinkAnchorSwap = require('../components/link-anchor-swap.jsx');
var Illustration = require('../components/illustration.jsx');

var CurriculumWorkshop = React.createClass({
  statics: {
    pageClassName: 'curriculum-workshop'
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
          Co-hosts Amira Dhalla and Chad Sansing, along with producer Paul Oh, help participants answer the question, <em>"How can I use the web to teach and learn what’s important to me?"</em> Join us as we prototype teaching and learning materials live on-air and think out-loud through the curriculum design process.
          </p>

          <section className="callout-box">
            <h2>Upcoming Workshop</h2>
            <p className="date">March 8th - 5 PM PT, 8 PM ET, 10 PM BRT</p>
            <h1>International Women's Day</h1>
            <p className="description">
              With Ingrid Dahl, Claire Shorall, Kim Wilkens, and friends.
            </p>
          </section>

          <p>
            On our inaugural, International Women’s Day episode, Ingrid Dahl, Claire Shorall, Kim Wilkens and friends prototype teaching and learning materials addressing women’s issues, rights, and accomplishments. Viewers can ask questions and share ideas and prototypes of their own through the embedded agenda and chat.
          </p>

          <p>
            You can also join the discussion on <a href="https://discourse.webmaker.org/c/mozilla-curriculum-workshop">our community forum</a> or <a href="https://github.com/MozillaFoundation/curriculum-workshop">GitHub</a>.
          </p>

          <h3>Workshop Video Stream</h3>

          <div className="video-wrapper">
            <iframe className="workshop-video" width="560" height="315" src="//www.youtube.com/embed/WqLgWloYvHk" frameborder="0" allowfullscreen></iframe>
          </div>

          <h4>
            Open Agenda
            <a title="Open the agenda in a new tab" className="fa fa-external-link open-etherpad" href="https://public.etherpad-mozilla.org/p/curriculum-workshop">
            </a>
          </h4>

          <iframe className="etherpad" src="https://public.etherpad-mozilla.org/p/curriculum-workshop"></iframe>

          <h2>Upcoming Workshops</h2>

          <ul className="upcoming-workshops">
            <li>
              <p className="date">Tuesday, April 12 - 5 PM PT, 8 PM ET, 9 PM BRT</p>
              <h2>Internet of Things</h2>
              <p>
                Consider how the Internet of Things might impact our lives and learning and prototype resources to teach about the ways wearables and household items connect to the web.
              </p>
            </li>
            <li>
              <p className="date">Tuesday, May 10 -  5 PM PT, 8 PM ET, 9 PM BRT</p>
              <h2>Letters to the Next President</h2>
              <p>
                Take a look at the National Writing Project’s Letters to the Next President (#2nextprez) campaign, remix suggested activities from campaign partners Hypothes.is and Mozilla, and prototype new pathways for youth civic engagement online.
              </p>
            </li>
          </ul>

        </div>
    );
  }
});

module.exports = CurriculumWorkshop;
