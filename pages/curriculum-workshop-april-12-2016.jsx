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

          <section className="callout-box past-workshop">
            <h2>Past Workshop</h2>
            <p className="date">April 12th - 5 PM PT, 8 PM ET, 10 PM BRT</p>
            <h1>Physical Computing</h1>
            <p className="description">
              With Jeremy Boggs, Natalie Freed, Andre Garzia, and Jie Qi.
            </p>
          </section>

          <p>
            On our April episode of the Mozilla Curriculum Workshop, <LinkAnchorSwap to="http://scholarslab.org/people/jeremy-boggs/">Jeremy Boggs</LinkAnchorSwap>, <LinkAnchorSwap to="http://www.nataliefreed.com/">Natalie Freed</LinkAnchorSwap>, <LinkAnchorSwap to="http://andregarzia.com/pages/en/blog/">Andre Garzia</LinkAnchorSwap>, and <LinkAnchorSwap to="http://technolojie.com/">Jie Qi</LinkAnchorSwap> will help us understand physical computing as a gateway into the Internet of Things (IoT), the network of connected devices embedded in everyday objects. An in-depth episode on IoT will follow this summer. 
          </p>

          <p>
            You can also join the discussion on <LinkAnchorSwap to="https://discourse.webmaker.org/c/mozilla-curriculum-workshop">our community forum</LinkAnchorSwap> or <LinkAnchorSwap to="https://github.com/MozillaFoundation/curriculum-workshop">GitHub</LinkAnchorSwap>.
          </p>

          <h3>Workshop Video Stream</h3>

          <div className="video-wrapper">
            <iframe className="workshop-video" width="560" height="315" src="//www.youtube.com/embed/XjyMkGPP3R0" frameBorder="0" allowFullScreen></iframe>
          </div>

          <h4>
            Open Agenda
            <a title="Open the agenda in a new tab" className="fa fa-external-link open-etherpad" href="https://public.etherpad-mozilla.org/p/curriculum-workshop-april-12-2016">
            </a>
          </h4>

          <iframe className="etherpad" src="https://public.etherpad-mozilla.org/p/curriculum-workshop-april-12-2016"></iframe>


        </div>
    );
  }
});

module.exports = CurriculumWorkshop;
