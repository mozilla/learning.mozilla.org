var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Carousel = ReactBootstrap.Carousel;
var CarouselItem = ReactBootstrap.CarouselItem;

var HeroUnit = require('../components/hero-unit.jsx');
var PageEndCTA = require('../components/page-end-cta.jsx');
var IconLinks = require('../components/icon-links.jsx');
var IconLink = require('../components/icon-link.jsx');
var Illustration = require('../components/illustration.jsx');

var CAROUSEL_IMG_PROPS = {
  width: 800,
  height: 533
};

var EventsPage = React.createClass({
  statics: {
    pageClassName: 'events'
  },
  handleSubmit: function(e) {
    e.preventDefault();
    window.alert("Sorry, this feature has not yet been implemented.");
  },
  render: function() {
    return (
      <div>
        <HeroUnit image="/img/events-page/hero-events.png"
                  image2x="/img/events-page/hero-events@2x.png">
          <h1>Host a Maker Party</h1>
          <h2>Celebrate teaching and learning with others</h2>
        </HeroUnit>
        <section>
          <h2>Join the Global Movement</h2>
          <p>Since its inauguration in 2012, Maker Party has become Mozilla's largest celebration of making and learning on the web. From getting the hang of HTML to building robots to learning about remixing using paper and scissors, people of all ages and from all backgrounds have come together to joyfully explore the culture, mechanics and citizenship of the web.</p>
          <Illustration
          height={183} width={156}
          src1x="/img/events-page/maker-party-logo.svg"
          alt="Maker Party logo"
          >
            <h2>
              Join us for the worldwide Maker Party on July 15-31, 2015 and add your events to <a href="https://events.webmaker.org/">our global list</a> any time of year.
            </h2>
          </Illustration>
          <div className="row">
            <div className="videoContainer">
              <iframe src="https://www.youtube.com/embed/oko6TzPQE6Y" frameBorder="0" allowFullScreen className="video"></iframe>
            </div>
          </div>
          <div className="carousel-holder">
            <Carousel>
              <CarouselItem>
                <img {...CAROUSEL_IMG_PROPS} alt="2014 Hive NYC Summer Quest Maker Party" src="//c3.staticflickr.com/3/2915/14592256638_55ec5cf36b_b.jpg"/>
                <div className="carousel-caption sr-only">
                  <h3><a href="https://www.flickr.com/photos/mozilladrumbeat/14592256638/in/set-72157647305286970">2014 Hive NYC Summer Quest Maker Party</a></h3>
                </div>
              </CarouselItem>
              <CarouselItem>
                <img {...CAROUSEL_IMG_PROPS} alt="Appmaking" src="//c2.staticflickr.com/6/5587/15213220651_9055dffbe6.jpg"/>
                <div className="carousel-caption sr-only">
                  <h3><a href="https://www.flickr.com/photos/mozilladrumbeat/15213220651/in/album-72157647305286970/">Appmaking</a></h3>
                </div>
              </CarouselItem>
            </Carousel>
          </div>
          <PageEndCTA>
            <div>
              <p>Check out the highlights from  Maker Party and see more photos in our <a href="">Flickr gallery</a>.</p>
              <img className="divider" src="/img/events-page/line-divider.svg" alt="line divider" />
              <p>Sign up to get Maker Party updates:</p>
              <form className="maker-party-signup" onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="form-group col-sm-7 col-sm-offset-1 col-lg-4 col-lg-offset-3">
                    <label className="sr-only">Email</label>
                    <input type="email" required className="form-control" placeholder="Your email address" />
                  </div>
                  <div className="col-sm-3 col-lg-2">
                    <button type="submit" className="btn btn-awsm btn-block">Submit Email</button>
                  </div>
                </div>
              </form>
            </div>
          </PageEndCTA>
          <section>
            <IconLinks>
              <IconLink
                linkTo="event-resources"
                imgSrc="/img/events-page/icon-curriculum.svg"
                imgAlt="icon resources"
                head="Event Resources"
                subhead="Plan a unique event"
              />
              <IconLink
                href="http://discourse.webmaker.org/category/maker-party"
                imgSrc="/img/events-page/icon-connect.svg"
                imgAlt="icon connect"
                head="Join the Conversation"
                subhead="Talk to others about your event"
              />
              <IconLink
                href="https://events.webmaker.org/"
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
