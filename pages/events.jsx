var React = require('react');
var request = require('superagent');
var HeroUnit = require('../components/hero-unit.jsx');
var IconLinks = require('../components/icon-links.jsx');
var IconLink = require('../components/icon-link.jsx');
var Illustration = require('../components/illustration.jsx');

var FormMailingListSignup = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {
      formDest: "https://sendto.mozilla.org/page/s/maker-party-signup",
      email: "",
      privacyPolicyAgree: false
    };
  },
  handleSubmit: function(e) {
    e.preventDefault();
    console.log(this.state.email);
    console.log(this.state.privacyPolicyAgree);
    console.log(this.state.formDest);

    request
      .post(this.state.formDest)
      .withCredentials()
      .send({
        email: this.state.email,
        "custom-2517": this.state.privacyPolicyAgree
      })
      .end(function(err, res) {
        if (err) {
          console.log(err);
          window.alert("error encountered");
        }
      });
  },
  handleBtnClick: function(e) {
    window.alert("submit btn clicked");
  },
  render: function() {
    return (
      <form action={this.state.formDest} method="POST" onSubmit={this.handleSubmit}>
        <div className="col-sm-offset-1 col-sm-8 col-md-offset-1 col-md-8 col-lg-offset-1 col-lg-8">
          <fieldset>
            <input name="email" type="email" size="30" placeholder="Your email address" valueLink={this.linkState("email")} required />
          </fieldset>
          <fieldset>
            <input name="custom-2517" type="checkbox" checkedLink={this.linkState("privacyPolicyAgree")} required /> I'm okay with you handling this info as you explain in your <a href="https://www.mozilla.org/en-US/privacy/websites/">privacy policy</a>.
          </fieldset>
        </div>
        <div className="col-sm-2 col-md-2 col-lg-2 text-center">
          <input type="submit" value="Submit Email" className="btn btn-awsm" onClick={this.handleBtnClick} />
        </div>
      </form>
    );
  }
});

var EventsPage = React.createClass({
  statics: {
    pageTitle: 'Events',
    pageClassName: 'events'
  },
  handleSubmit: function(e) {
    e.preventDefault();
    window.alert("Sorry, this feature has not yet been implemented.");
  },
  render: function() {
    return (
      <div>
        <HeroUnit image="/img/pages/events/hero-events.png"
                  image2x="/img/pages/events/hero-events@2x.png">
          <h1>Host a Maker Party</h1>
          <h2>Celebrate teaching and learning with others</h2>
        </HeroUnit>
        <div className="inner-container">
          <section>
            <h2>Join the Global Movement</h2>
            <p>Since its inauguration in 2012, Maker Party has become Mozilla's largest celebration of making and learning on the web. From getting the hang of HTML to building robots to learning about remixing using paper and scissors, people of all ages and from all backgrounds have come together to joyfully explore the culture, mechanics and citizenship of the web.</p>
            <Illustration
            height={183} width={156}
            src1x="/img/pages/events/svg/maker-party-logo.svg"
            alt="Maker Party logo"
            >
              <h2>
                Join us for the worldwide Maker Party on July 15-31, 2015 and add your events to <a href="https://events.webmaker.org/">our global list</a> any time of year.
              </h2>
            </Illustration>
            <div className="row">
              <div className="col-sm-12 col-md-12 col-lg-12">
                <div className="video-container">
                  <iframe src="https://www.youtube.com/embed/oko6TzPQE6Y" frameBorder="0" allowFullScreen className="video"></iframe>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <a href="https://www.flickr.com/photos/mozilladrumbeat/14592256638/in/set-72157647305286970"><img alt="2014 Hive NYC Summer Quest Maker Party" src="//c3.staticflickr.com/3/2915/14592256638_55ec5cf36b_b.jpg" className="flickr-thumbnail" /></a>
              </div>
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <a href="https://www.flickr.com/photos/mozilladrumbeat/15213220651/in/album-72157647305286970/"><img alt="Appmaking" src="//c2.staticflickr.com/6/5587/15213220651_9055dffbe6.jpg" className="flickr-thumbnail" /></a>
              </div>
              <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <a href="https://www.flickr.com/photos/newyouthcity/14715964794/in/faves-mozilladrumbeat/"><img alt="2014 Hive NYC Summer Quest Maker Party" src="//c4.staticflickr.com/4/3905/14715964794_a9fa75002c_c.jpg" className="flickr-thumbnail" /></a>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">
                <p className="callout-heading">Check out the highlights from Maker Party and see more photos in our <a href="https://www.flickr.com/photos/mozilladrumbeat/galleries/72157643962655534/">Flickr gallery</a>.</p>
              </div>
            </div>
            <PageEndCTA
            header="Sign up to get Maker Party updates:"
            dividerImgSrc="/img/events-page/line-divider.svg">
              <div className="row">
                <FormMailingListSignup/>
              </div>
            </PageEndCTA>
            <section>
              <IconLinks>
                <IconLink
                  linkTo="event-resources"
                  imgSrc="/img/pages/events/svg/icon-curriculum.svg"
                  imgAlt="icon resources"
                  head="Event Resources"
                  subhead="Plan a unique event"
                />
                <IconLink
                  href="http://discourse.webmaker.org/category/maker-party"
                  imgSrc="/img/pages/events/svg/icon-connect.svg"
                  imgAlt="icon connect"
                  head="Join the Conversation"
                  subhead="Talk to others about your event"
                />
                <IconLink
                  href="https://events.webmaker.org/"
                  imgSrc="/img/pages/events/svg/icon-add-event.svg"
                  imgAlt="icon add event"
                  head="Add Your Event"
                  subhead="Join the global movement"
                />
              </IconLinks>
            </section>
          </section>
        </div>
      </div>
    );
  }
});

module.exports = EventsPage;
