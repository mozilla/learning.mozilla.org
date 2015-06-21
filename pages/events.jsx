var React = require('react');
var Router = require('react-router');
var request = require('superagent');
var HeroUnit = require('../components/hero-unit.jsx');
var Modal = require('../components/modal.jsx');
var ModalManagerMixin = require('../mixins/modal-manager');
var IconLinks = require('../components/icon-links.jsx');
var IconLink = require('../components/icon-link.jsx');
var Illustration = require('../components/illustration.jsx');
var ImageTag = require('../components/imagetag.jsx');
var PageEndCTA = require('../components/page-end-cta.jsx');
var util = require('../lib/util');

var UniqeIdMixin = require('unique-id-mixin');

var validateSignupForm = function(signUpFormState) {
  var errors = [];
  if (!util.isValidEmail(signUpFormState.email)) {
    errors.push("Please enter an email address.");
  }

  return errors;
};

var FormMailingListSignup = React.createClass({
  mixins: [
    React.addons.LinkedStateMixin,
    UniqeIdMixin
  ],
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
    var identifierPrefix = "mailinglist-signup-";
    var emailFieldID = this.getNextUid(identifierPrefix+"email");
    var privacyFieldID = this.getNextUid(identifierPrefix+"privacy");
    return (
      <form className="mailinglist-signup center-block" action={process.env.MAILINGLIST_URL} method="POST" onSubmit={this.handleSubmit}>
        <div className="fieldset-container">
          <fieldset>
            <label htmlFor={emailFieldID} className="sr-only">email</label>
            <input id={emailFieldID} name="email" type="email" size="30" placeholder="Your email address" valueLink={this.linkState("email")} required />
          </fieldset>
          <fieldset>
            <label htmlFor={privacyFieldID} className="sr-only">I'm okay with you handling this info as you explain in your <a href="https://www.mozilla.org/en-US/privacy/websites/">privacy policy</a></label>
            <input id={privacyFieldID} name={process.env.MAILINGLIST_PRIVACY_NAME} type="checkbox" className="sr-only" checked readOnly required />
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
        </div>
        <div className="row mp-activities-banner">
          <section>
            <div className="btn-container">
              <a className="btn btn-awsm" href="">Get the 2015 Maker Party Activities</a>
            </div>
          </section>
        </div>
        <div className="inner-container">
          <section>
            <Illustration
              height={225} width={225}
              src1x="/img/pages/events/MP-yellow-globe.png"
              src1x="/img/pages/events/MP-yellow-globe@2x.png"
              alt="Maker Party logo"
            >
              <h2>What does a Maker Party look like?</h2>
              <p>Maker Parties are held in schools, cafes, community spaces, or even around kitchen tables. They range from the very large (hundreds of participants) to the very small (two people). They are great for kids and adults, and for beginners or experienced pros. Check out these examples of fantastic Maker Parties.</p>
            </Illustration>
          </section>
          <div className="row text-center">
            <div className="col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8 center">
              <ImageTag className="image-tag"
                src1x="/img/pages/events/MP-photo-strip.png"
                src2x="/img/pages/events/MP-photo-strip@2x.png"
                alt=""
              />
              <p className="callout-heading">See more event photos in our <a href="https://www.flickr.com/photos/mozilladrumbeat/galleries/72157643962655534/">Flickr gallery</a></p>
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
        </div>
      </div>
    );
  }
});

module.exports = EventsPage;
