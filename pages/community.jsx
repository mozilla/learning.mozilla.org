var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var Link = require('react-router').Link;
var OutboundLink = require('react-ga').OutboundLink;
var HeroUnit = require('../components/hero-unit.jsx');
var Illustration = require('../components/illustration.jsx');
var IconLinks = require('../components/icon-links.jsx');
var IconLink = require('../components/icon-link.jsx');
var config = require('../lib/config');
var util = require('../lib/util');

var Intro = React.createClass({
  render: function() {
    return (
      <section className="intro intro-after-banner">
        <Illustration
          height={204} width={204}
          src1x="/img/pages/community/svg/icon-circle-community.svg"
          alt="icon toolkit">
          <h1>Connect with Others</h1>
          <h2>Introduce yourself in the Mozilla Learning Network discussion forum, help test out the latest curriculum modules, or start a new thread about a related issue or challenge you care about.</h2>
          <a href="https://discourse.webmaker.org/" className="btn btn-awsm">Join the Discussion <i className="fa fa-external-link"></i></a>
        </Illustration>
      </section>
    );
  }
});

var VerticalCard = React.createClass({
  render: function() {
    return (
      <Illustration
        src1x={this.props.imgSrc1x}
        src2x={this.props.imgSrc2x}
        className="vertical-layout"
        alt="">
        <h2>{this.props.header}</h2>
        <p>{this.props.description}</p>
        <a href={this.props.linkUrl}>{this.props.linkText}</a>
      </Illustration>
    );
  }
});

var validateSignupForm = function(signUpFormState) {
  var errors = [];
  if ( !util.isValidEmail(signUpFormState.email) ) {
    errors.push("Please enter an email address.");
  }
  return errors;
};

var SignupForm = React.createClass({
  mixins: [LinkedStateMixin],
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
        !process.env.PLEDGE_MAILINGLIST_URL) {
      e.preventDefault();
      alert("PLEDGE_MAILINGLIST_URL is not defined. Simulating " +
            "a successful pledge signup now.");
      window.location = "?pledge=thanks";
    }
  },
  renderValidationErrors: function() {
    if (this.state.validationErrors.length) {
      return (
        <div className="alert alert-danger" role="alert">
          <p className="error-msg">Please enter an email address.</p>
        </div>
      );
    }
  },
  render: function() {
    var idPrefix = this.props.idPrefix;
    return (
      <form className="mailinglist-signup" action={process.env.PLEDGE_MAILINGLIST_URL} method="POST" onSubmit={this.handleSubmit}>
        <fieldset>
          <label htmlFor={idPrefix+"email"} className="sr-only">email</label>
          <div className="icon-field-container">
            <i className="fa fa-envelope"></i>
            <input id={idPrefix+"email"} name="email" type="email" size="30" placeholder="email@example.com" valueLink={this.linkState("email")} required />
          </div>
          <label htmlFor={idPrefix+"privacy"} className="sr-only">I'm okay with you handling this info as you explain in your <a href="https://www.mozilla.org/en-US/privacy/websites/">privacy policy</a></label>
          <input id={idPrefix+"privacy"} name={process.env.PLEDGE_MAILINGLIST_PRIVACY_NAME} type="checkbox" className="sr-only" checked readOnly required />
          <p className="pp-note">&#10003; I'm okay with you handling this info as you explain in your <a href="https://www.mozilla.org/en-US/privacy/websites/">privacy policy</a>.</p>
          {this.renderValidationErrors()}
        </fieldset>
        <input type="submit" value="Sign Up" className="btn btn-awsm" />
      </form>
    )
  }
});

var CommunityPage = React.createClass({
  statics: {
    pageTitle: 'Community',
    pageClassName: 'community-page',
    SignupForm: SignupForm,
    validateSignupForm: validateSignupForm
  },
  communities: [
    {
      imgSrc1x: '/img/pages/community/clubs.jpg',
      imgSrc2x: '/img/pages/community/clubs@2x.jpg',
      header: 'Clubs Open Office Hours',
      description: 'Have questions about Mozilla Clubs? Want to discuss what Mozilla Clubs looks like in your community? Want to share what your Mozilla Club is doing or or where you need help? Join us at our monthly office hours.',
      linkText: 'Find upcoming office hour dates.',
      linkUrl: 'http://mozilla.github.io/learning-networks/clubs/#officehours'
    },
    {
      imgSrc1x: '/img/pages/community/hive.jpg',
      imgSrc2x: '/img/pages/community/hive@2x.jpg',
      header: 'Hive Learning Networks',
      description: 'Hive Learning Networks are a growing constellation of communities around the globe that are championing digital skills and web literacy through connected learning.',
      linkText: "Find out if there's one near you.",
      linkUrl: 'https://hivelearningnetworks.org/'
    }
  ],
  render: function () {
    return (
      <div>
        <HeroUnit>
          <h1>Community</h1>
          <h2>Join a global community of people teaching the Web</h2>
        </HeroUnit>
        <div className="inner-container">
          <Intro/>
          <section>
            <div className="horizontal-divider full-width"></div>
          </section>
          <section className="communities-info">
            {
              this.communities.map(function(community) {
                return <VerticalCard {...community} key={community.header} />
              })
            }
          </section>
          <div className="vertical-divider"></div>
          <section className="text-center">
            <h2>Get the latest teaching activities, tips, and news in your inbox every month. Sign up for the MLN Community Newsletter.</h2>
            <SignupForm idPrefix="signup-form-"/>
          </section>
          <section>
            <div className="horizontal-divider full-width"></div>
          </section>
          <section>
          <IconLinks>
            <IconLink
              href="https://twitter.com/mozteach"
              imgSrc="/img/pages/community/svg/icon-community-twitter.svg"
              head="Connect on Twitter"
              subhead="We're @mozteach on Twitter and our community uses #teachtheweb"
              width={70}
            />
            <IconLink
              href="https://docs.google.com/a/mozillafoundation.org/forms/d/1bOXV1OiF2EKS5KprlnzfFpwaoVNwxLAwN_UEq6hGKqU/viewform"
              imgSrc="/img/pages/community/svg/icon-community-story.svg"
              head="Share Your Story"
              subhead="If you teach the Web we'd love to hear about it! Share your story using this form."
            />
            <IconLink
              href="mailto:teachtheweb@mozillafoundation.org"
              imgSrc="/img/pages/community/svg/icon-community-question.svg"
              head="Have a Question?"
              subhead="Want to be connected with one of our staff or volunteers? Email us."
              width={80}
            />
          </IconLinks>
        </section>
        </div>

      </div>
    );
  }
});

module.exports = CommunityPage;
