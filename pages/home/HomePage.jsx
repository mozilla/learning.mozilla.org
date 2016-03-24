var React = require('react');
var Link = require('react-router').Link;
var ga = require('react-ga');
var OutboundLink = ga.OutboundLink;

var HeroUnit = require('../../components/hero-unit.jsx');
var Illustration = require('../../components/illustration.jsx');
var IconLinks = require('../../components/icon-links.jsx');
var IconLink = require('../../components/icon-link.jsx');
var IconButtons = require('../../components/icon-buttons.jsx');
var IconButton = require('../../components/icon-button.jsx');

var config = require('../../config/config');

var CaseStudies = require('./CaseStudies.jsx');
var ModalEmail = require('./ModalEmail.jsx');
var ThankYouModal = require('./ThankYouModal.jsx');
var validateSignupForm = require('../../components/newsletter-signup/validateSignupForm');
var BlogSection = require('./BlogSection.jsx');

var fixLocation = require('../../lib/fix-location.js');

var HomePage = React.createClass({
  statics: {
    pageClassName: 'home-page',
    validateSignupForm: validateSignupForm,
    BlogSection: BlogSection
  },
  contextTypes: {
    location: React.PropTypes.object
  },
  componentWillMount: function() {
    fixLocation(this.context.location);
  },
  componentDidMount: function() {
    if (this.context.location.search.signup === "thanks") {
      this.props.showModal(ThankYouModal, {
        hideModal: this.props.hideModal
      });
      // Optimizely conversion tracking
      window.optimizely = window.optimizely || [];
      window.optimizely.push(['trackEvent', 'NewsletterFormSubmitted']);
    }
  },
  handleEmailBtnClick: function() {
    ga.event({ category: 'Clicked Home CTA', action: 'Get Email Updates' });
    this.props.showModal(ModalEmail, {
      hideModal: this.props.hideModal,
      sourceUrl: this.props.currentPath
    });
  },
  handleTeachBtnClick: function() {
    ga.event({ category: 'Clicked Home CTA', action: 'Teach an Activity' });
  },
  handleClubBtnClick: function() {
    ga.event({ category: 'Clicked Home CTA', action: 'Start A Mozilla Club' });
  },
  render: function() {
    return (
      <div>
        <HeroUnit>
          <h1>The Mozilla Learning Network</h1>
          <Link to='/preview/test-published'>aa</Link>
          <IconButtons>
            <IconButton
              imgSrc="/img/pages/home/svg/icon-newsletter.svg"
              head="Get Email Updates"
              onClick={this.handleEmailBtnClick}
              className={"newsletter"}
            />
            <IconButton
              link="/activities"
              imgSrc="/img/pages/home/svg/icon-teachanactivity.svg"
              head="Teach an Activity"
              onClick={this.handleTeachBtnClick}
            />
            <IconButton
              link="/clubs"
              imgSrc="/img/pages/home/svg/icon-startamozillaclub.svg"
              head="Start A Mozilla Club"
              onClick={this.handleClubBtnClick}
            />
          </IconButtons>
        </HeroUnit>

        <div className="row full-row promo-banner">
          <div className="inner-container">
            <section>
              <Illustration
                width={430} height={75}
                src1x="/img/pages/home/svg/encrypt.svg"
                alt="">
                  <p>Your online privacy depends on encryption. Learn more about how encryption works, why it’s essential to a strong Web, and why it’s worth protecting.</p>
                  <OutboundLink className="external-link" to={config.ENCRYPT_CAMPAIGN_URL} eventLabel={config.ENCRYPT_CAMPAIGN_URL}>Learn more</OutboundLink>
              </Illustration>
            </section>
          </div>
        </div>

        <div className="inner-container">
          <section>
            <div className="about-us">
              <Illustration
                height={200} width={200}
                src1x="/img/pages/home/svg/icon-circle-home.svg"
                alt="">
                  <h2>About Us</h2>
                  <p>We want more people to see themselves as citizens of the web. The Mozilla Learning Network offers programs and a global community dedicated to helping people learn the most important skills of our age: <em>the ability to read, write and participate in the digital world.</em> <Link to="about" className="more">Learn more</Link></p>
              </Illustration>
            </div>
          </section>
          <section>
            <BlogSection/>
          </section>
        </div>

        <div className="row full-row quote">
          <section>
            {CaseStudies}
          </section>
        </div>

        <div className="inner-container">
          <IconLinks>
            <IconLink
              link={config.TWITTER_LINK}
              imgSrc="/img/pages/about/svg/icon-twitter-blue.svg"
              width={60}
              head="Follow Us"
              subhead="Start a conversation on Twitter."
              highlightedText="Twitter"
            />
            <IconLink
              link={"mailto:"+config.TEACH_THE_WEB_EMAIL}
              imgSrc="/img/pages/about/svg/icon-get-help-blue.svg"
              head="Get Help"
              subhead="Email us anytime."
              highlightedText="Email us"
            />
            <IconLink
              link="https://discourse.webmaker.org/t/if-youre-new-to-the-community-please-introduce-yourself"
              imgSrc="/img/pages/about/svg/icon-connect-blue.svg"
              head="Say Hello"
              subhead="Connect on the Discourse forum."
              highlightedText="Discourse forum"
            />
          </IconLinks>
        </div>
      </div>
    );
  }
});

module.exports = HomePage;
