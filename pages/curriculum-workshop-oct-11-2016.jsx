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
               <h2>Join us on the second Tuesday of each month!</h2>
           </Illustration>
          </section>

          <p>
            Co-hosts Amira Dhalla and Chad Sansing, along with producers Kristina Gorr and Paul Oh, help participants answer the question, <em>"How can I use the web to teach and learn what’s important to me?"</em> Join us as we prototype teaching and learning materials live on-air and think out-loud through the curriculum design process.
          </p>

          <section className="callout-box past-workshop">
            <h2>Past Workshop</h2>
            <p className="date">October 11th - 6 AM PT, 9 AM ET, 1 PM UTC</p>
            <h1>Ada Lovelace Day</h1>
          </section>

          <p>
           <a href="https://en.wikipedia.org/wiki/Ada_Lovelace">Ada Lovelace</a> is largely regarded as the first computer programmer, and her work and skills exemplified strength in STEM as she worked on the analytic engine, also known as an early mechanical general-purpose computer. Her work ethic and diligence in the field is an inspiration for women is to be celebrated and shared around the world. In our webcast this month, we’ll be recognizing the challenges, accomplishments and contributions of women leaders from the Mozilla Leadership Network around the globe. Join us to help build teaching and learning resources promoting women and the web.
          </p>

          <p>
            You can also join the discussion on <LinkAnchorSwap to="https://discourse.webmaker.org/c/mozilla-curriculum-workshop">our community forum</LinkAnchorSwap> or <LinkAnchorSwap to="https://github.com/MozillaFoundation/curriculum-workshop">GitHub</LinkAnchorSwap>.
          </p>

          <h3>Workshop Video Stream</h3>

          <div className="video-wrapper">
            <iframe className="workshop-video" width="560" height="315" src="https://air.mozilla.org/mozilla-curriculum-workshop-ada-lovelace-day-2016-10-11/video/" frameBorder="0" allowFullScreen></iframe>
          </div>

          <h4>
            Open Agenda
            <a title="Open the agenda in a new tab" className="fa fa-external-link open-etherpad" href="https://public.etherpad-mozilla.org/p/curriculum-workshop-october-11-2016">
            </a>
          </h4>

          <iframe className="etherpad" src="https://public.etherpad-mozilla.org/p/curriculum-workshop-october-11-2016"></iframe>


        </div>
    );
  }
});

module.exports = CurriculumWorkshop;
