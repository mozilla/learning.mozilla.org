var React = require('react');

var HeroUnit = require('../components/hero-unit.jsx');
var PageEndCTA = require('../components/page-end-cta.jsx');
var IconLinks = require('../components/icon-links.jsx');
var IconLink = require('../components/icon-link.jsx');

var EventsPage = React.createClass({
  statics: {
    pageClassName: 'events'
  },
  render: function() {
    return (
      <div>
        <HeroUnit image="/img/events-page/events-hero-image.jpg"
                  image2x="/img/events-page/events-hero-image@2x.jpg">
          <h1>Host a Maker Party</h1>
          <h2>Celebrate teaching and learning with others</h2>
        </HeroUnit>
        <section>
          <h2>Join the Global Movement</h2>
          <p>Since its inauguration in 2012, Maker Party has become Mozilla's largest celebration of making and learning on the web. From getting the hang of HTML to building robots to learning about remix using paper and scissors, people of all ages and from all backgrounds have come together to joyfully explore the culture, mechanics and citizenship of the web.</p>
          <div className="values row">
            <div className="col-sm-3">
              <img src="/img/events-page/maker-party-logo.svg" className="img-scale-to-fit" alt="Maker Party logo"/>
            </div>
            <div className="col-sm-9 col-lg-8">
              Join us for the global Maker Party on July 15-31, 2015 and add your events to <a href="">our global list</a> any time of year.
            </div>
          </div>
          <img src="http://placehold.it/800x600" style={{display: 'block', width: '100%'}} alt="TODO: Put carousel here"/>
          <PageEndCTA>
            <div>
              <p>Check out the highlights from  Maker Party and see more photos in our <a href="">Flickr gallery</a>.</p>
              <img className="divider" src="/img/events-page/line-divider.svg" alt="line divider" />
              <p>Sign up to get Maker Party updates:</p>
              <p className="text-center">
                <img src="http://placehold.it/320x50" alt="TODO: Put sign-up form here."/>
              </p>
            </div>
          </PageEndCTA>
          <section>
            <IconLinks>
              <IconLink
                linkTo="fixme"
                imgSrc="/img/events-page/icon-curriculum.svg"
                imgAlt="icon resources"
                head="Event Resources"
                subhead="Plan a unique event"
              />
              <IconLink
                linkTo="fixme"
                imgSrc="/img/events-page/icon-connect.svg"
                imgAlt="icon connect"
                head="Join the Conversation"
                subhead="Talk to others about your event"
              />
              <IconLink
                linkTo="fixme"
                imgSrc="/img/events-page/icon-add-event.svg"
                imgAlt="icon add event"
                head="Add Your Event"
                subhead="Join the global movement"
              />
            </IconLinks>
          </section>
        </section>
      </div>
    );
  }
});

module.exports = EventsPage;
