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
            <p className="date">April 20, 11 AM ET, 4pm UTC, 5pm CET, 9:30pm IST</p>
            <h1>Internet of Things</h1>
            <p className="description">
              Featured speakers from Quicksand and the University of Dundee
            </p>
          </section>

          <p>
          The Internet is a global, public resource that should be open and accessible to all. As the Internet evolves, it must remain a public resource. It will also offer opportunity for creativity and innovation beyond the screens of our computers and phones.
          </p>

          <p>
          In this call, we’ll explore how we’d like to control our personal data in the home, especially as homes become increasingly connected. We’ll compare how people from India, Scotland, Germany, the UK and beyond are engaging with these questions and how we can build provocative prototypes that bring these ideas to life.
          </p>

          <p>
            Viewers can ask questions and share ideas and feedback of their own through the embedded agenda and chat.
          </p>

          <h3>Workshop Video Stream</h3>

          <div className="video-wrapper">
            <iframe className="workshop-video" width="560" height="315" src="//www.youtube.com/embed/d3YJUZVoYws" frameBorder="0" allowFullScreen></iframe>
          </div>

          <h4>
            Open Agenda
            <a title="Open the agenda in a new tab" className="fa fa-external-link open-etherpad" href="https://public.etherpad-mozilla.org/p/mozcommunitycallApril16">
            </a>
          </h4>

          <iframe className="etherpad" src="https://public.etherpad-mozilla.org/p/mozcommunitycallApril16"></iframe>

        </div>
    );
  }
});

module.exports = CommunityCallPage;
