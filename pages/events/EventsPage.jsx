var React = require('react');
var Router = require('react-router');
var Link = require('react-router').Link;

var HeroUnit = require('../../components/hero-unit.jsx');
var IconLinks = require('../../components/icon-links.jsx');
var IconLink = require('../../components/icon-link.jsx');
var Illustration = require('../../components/illustration.jsx');
var ImageTag = require('../../components/imagetag.jsx');

var config = require('../../config/config');

var MakerPartyExamples = require('./MakerPartyExamples.jsx');

var EventsPage = React.createClass({
  statics: {
    pageTitle: 'Events',
    pageClassName: 'events'
  },
  render: function() {
    return (
      <div>
        <HeroUnit>
          <h1>Host a Maker Party</h1>
          <h2>Host a one-time event or workshop</h2>
        </HeroUnit>

        <div className="inner-container">
          <section className="join-global-movement">
            <Illustration
            height={183} width={156}
            src1x="/img/pages/events/svg/maker-party-logo.svg"
            alt="Maker Party logo"
            className="content-first"
            >
              <h2>Join the Global Movement</h2>
              <p>Since its inauguration in 2012, Maker Party has become Mozilla's largest celebration of making and learning on the web. From getting the hang of HTML to building robots to learning about remixing using paper and scissors, people of all ages and from all backgrounds have come together to joyfully explore the culture, mechanics and citizenship of the web.</p>
            </Illustration>
          </section>

          <div className="row mp-activities-banner">
            <section>
              <div className="btn-container">
                <Link to="maker-party-2015" className="btn btn-awsm">Get the 2015 Maker Party Activities</Link>
              </div>
            </section>
          </div>
        </div>

        <div className="inner-container">
          <section>
            <Illustration
              height={244} width={244}
              src1x="/img/pages/events/MP-yellow-globe.png"
              src1x="/img/pages/events/MP-yellow-globe@2x.png"
              alt="Maker Party logo"
            >
              <h2>What does a Maker Party look like?</h2>
              <p>Maker Parties are held in schools, cafes, community spaces, or even around kitchen tables. They range from the very large (hundreds of participants) to the very small (two people). They are great for kids and adults, and for beginners or experienced pros. Check out these examples of fantastic Maker Parties.</p>
            </Illustration>
          </section>

          <section>
            <div className="row text-center">
              <div className="col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8 center">
                <a href={config.FLICKR_MAKER_PARTY}>
                  <ImageTag className="image-tag"
                    src1x="/img/pages/events/MP-photo-strip.png"
                    src2x="/img/pages/events/MP-photo-strip@2x.png"
                    alt=""
                    className="contained"
                  />
                </a>
                <p className="callout-heading">See more event photos in our <a href={config.FLICKR_MAKER_PARTY}>Flickr gallery</a></p>
              </div>
            </div>
          </section>

          <section>
            {MakerPartyExamples}
          </section>

          <section>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <h2>What is a Maker Party?</h2>
                <div className="video-container">
                  <iframe src="https://www.youtube.com/embed/oko6TzPQE6Y" frameBorder="0" allowFullScreen className="video" title="Maker Party Video"></iframe>
                </div>
              </div>
            </div>
          </section>

          <section>
            <IconLinks>
              <IconLink
                link="event-resources"
                imgSrc="/img/pages/events/svg/icon-help.svg"
                head="Get Help"
                subhead="Find resources to help you plan a unique event."
                highlightedText="resources"
              />
              <IconLink
                link="https://discourse.webmaker.org/c/events"
                imgSrc="/img/pages/events/svg/icon-join.svg"
                head="Join the Conversation"
                subhead="Talk to others about your event."
                highlightedText="Talk"
              />
            </IconLinks>
          </section>
        </div>
      </div>
    );
  }
});

module.exports = EventsPage;
