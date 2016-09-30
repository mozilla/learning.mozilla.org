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
            <p className="date">September 29th - 7am PT / 10am ET / 2pm UTC</p>
            <h1>Maker Party & Copyright</h1>
          </section>

          <p>
           Join us on September 29th as co-hosts Amira Dhalla and Chad Sansing and invited guests dig into this year’s Maker Party campaign around copyright and political action, especially in the EU. Learn about the copyright reform issues at play in Europe and how they connect to - or might impact - your local community and others around the world. Help us develop teaching and learning materials that make copyright, open licensing, and public domain clear and compelling to learners wherever you live.
          </p>

          <p>
            You can also join the discussion on <LinkAnchorSwap to="https://discourse.webmaker.org/c/mozilla-curriculum-workshop">our community forum</LinkAnchorSwap> or <LinkAnchorSwap to="https://github.com/MozillaFoundation/curriculum-workshop">GitHub</LinkAnchorSwap>.
          </p>

          <h3>Workshop Video Stream</h3>

          <div className="video-wrapper">
            <iframe className="workshop-video" width="560" height="315" src="//www.youtube.com/embed/uIh91sa4K4k" frameBorder="0" allowFullScreen></iframe>
          </div>

          <h4>
            Open Agenda
            <a title="Open the agenda in a new tab" className="fa fa-external-link open-etherpad" href="https://public.etherpad-mozilla.org/p/curriculum-workshop-september-13-2016">
            </a>
          </h4>

          <iframe className="etherpad" src="https://public.etherpad-mozilla.org/p/curriculum-workshop-september-13-2016"></iframe>


        </div>
    );
  }
});

module.exports = CurriculumWorkshop;
