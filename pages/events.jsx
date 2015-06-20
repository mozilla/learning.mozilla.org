var React = require('react');
var Router = require('react-router');
var request = require('superagent');
var HeroUnit = require('../components/hero-unit.jsx');
var Modal = require('../components/modal.jsx');
var ModalManagerMixin = require('../mixins/modal-manager');
var IconLinks = require('../components/icon-links.jsx');
var IconLink = require('../components/icon-link.jsx');
var Illustration = require('../components/illustration.jsx');
var PageEndCTA = require('../components/page-end-cta.jsx');
var util = require('../lib/util');

var validateSignupForm = function(signUpFormState) {
  var errors = [];
  if (!util.isValidEmail(signUpFormState.email)) {
    errors.push("Please enter an email address.");
  }

  return errors;
};

var FormMailingListSignup = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {
      email: "",
      validationErrors: []
    };
  },
  handleSubmit: function(e) {
    var validationErrors = validateSignupForm(_.pick(this.state,"email"));

    if (validationErrors.length) {
      e.preventDefault();
      this.setState({validationErrors: validationErrors});
      return;
    }

    if (process.env.NODE_ENV !== 'production' &&
        !process.env.MAILINGLIST_URL) {
      e.preventDefault();
      alert("MAILINGLIST_URL is not defined. Simulating " +
            "a successful mailing list signup now.");
      window.location = "?mailinglist=thanks";
    }
  },
  renderValidationErrors: function() {
    if (this.state.validationErrors.length) {
      return (
        <div className="alert alert-danger">
          <p className="error-msg">Please enter an email address.</p>
        </div>
      );
    }
  },
  render: function() {
    return (
      <form className="mailinglist-signup center-block" action={process.env.MAILINGLIST_URL} method="POST" onSubmit={this.handleSubmit}>
        <div className="fieldset-container">
          <fieldset>
            <label htmlFor="mailinglist-email" className="sr-only">email</label>
            <input id="mailinglist-email" name="email" type="email" size="30" placeholder="Your email address" valueLink={this.linkState("email")} required />
          </fieldset>
          <fieldset>
            <label htmlFor="mailinglist-pp-note" className="sr-only">I'm okay with you handling this info as you explain in your <a href="https://www.mozilla.org/en-US/privacy/websites/">privacy policy</a></label>
            <input id="mailinglist-pp-note" name={process.env.MAILINGLIST_PRIVACY_NAME} type="checkbox" className="sr-only" checked readOnly required />
            <p className="pp-note">&#10003; I'm okay with you handling this info as you explain in your <a href="https://www.mozilla.org/en-US/privacy/websites/">privacy policy</a>.</p>
          </fieldset>
          {this.renderValidationErrors()}
        </div>
        <div className="btn-container">
          <input type="submit" value="Sign up" className="btn btn-awsm" />
        </div>
      </form>
    );
  }
});

var ThankYouModal = React.createClass({
  render: function() {
    return (
      <Modal>
        <p>Thanks for signing up!</p>
      </Modal>
    );
  }
});

var EventsPage = React.createClass({
  mixins: [ModalManagerMixin],
  statics: {
    pageTitle: 'Events',
    pageClassName: 'events',
    FormMailingListSignup: FormMailingListSignup,
    validateSignupForm: validateSignupForm
  },
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },
  componentDidMount: function() {
    if (this.context.router.getCurrentQuery().mailinglist === "thanks") {
      this.showModal(ThankYouModal);
    }
  },
  render: function() {
    return (
      <div>
        <HeroUnit>
          <h1>Host a Maker Party</h1>
          <h2>Join the global celebration from July 15-31</h2>
          <FormMailingListSignup/>
        </HeroUnit>
        <div className="inner-container">
          <section>
            <Illustration
            height={183} width={156}
            src1x="/img/pages/events/svg/maker-party-logo.svg"
            alt="Maker Party logo"
            className="content-first"
            >
              <h2>Join the Global Movement</h2>
            <p>Since its inauguration in 2012, Maker Party has become Mozilla's largest celebration of making and learning on the web. From getting the hang of HTML to building robots to learning about remixing using paper and scissors, people of all ages and from all backgrounds have come together to joyfully explore the culture, mechanics and citizenship of the web.</p>
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
            header=""
            dividerImgSrc="/img/pages/events/svg/line-divider.svg">
              <div className="row" id="mailinglist">
                <div>
                  <p>Sign up to get Maker Party updates:</p>
                  <FormMailingListSignup/>
                </div>
              </div>
            </PageEndCTA>
            <section>
              <IconLinks>
                <IconLink
                  linkTo="event-resources"
                  imgSrc="/img/pages/events/svg/icon-curriculum.svg"
                  head="Event Resources"
                  subhead="Plan a unique event"
                />
                <IconLink
                  href="http://discourse.webmaker.org/category/maker-party"
                  imgSrc="/img/pages/events/svg/icon-connect.svg"
                  head="Join the Conversation"
                  subhead="Talk to others about your event"
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
