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
var ModalPledge = require('./ModalPledge.jsx');
var ThankYouModal = require('./ThankYouModal.jsx');
var PledgeSignupForm = require('./PledgeSignupForm.jsx');
var validateSignupForm = require('./validateSignupForm');
var BlogSection = require('./BlogSection.jsx');

var fixLocation = function(location) {
  var search = location.search.replace('?','');
  location.search = {};
  if(search) {
    search.split('&')
          .map(function(v) { return v.split('='); })
          .forEach(function(pair) {
            search[pair[0]] = pair[1];
          });
  }
}

var HomePage = React.createClass({
  statics: {
    pageClassName: 'home-page',
    ModalPledge: ModalPledge,
    PledgeSignupForm: PledgeSignupForm,
    validateSignupForm: validateSignupForm,
    BlogSection: BlogSection
  },
  contextTypes: {
    history: React.PropTypes.object,
    location: React.PropTypes.object
  },
  componentWillMount: function() {
    fixLocation(this.context.location);
  },
  componentDidMount: function() {
    // auto pops up the Pledge modal if the user is visiting
    // the homepage for the first time
    var disableModal = "disableAutoPledgeModal";
    if (!localStorage[disableModal]) {
      this.handlePledgeBtnClick();
      localStorage.setItem(disableModal, "disabled");
    }

    if (this.context.location.search.pledge === "thanks") {
      this.props.showModal(ThankYouModal, {
        hideModal: this.props.hideModal
      });
      // Optimizely conversion tracking
      window.optimizely = window.optimizely || [];
      window.optimizely.push(['trackEvent', 'pledgeFormSubmitted']);
    }
  },
  handlePledgeBtnClick: function() {
    ga.event({ category: 'Clicked Home CTA', action: 'Pledge to Teach' });
    this.props.showModal(ModalPledge, {
      hideModal: this.props.hideModal
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
          <IconButtons>
            <IconButton
              imgSrc="/img/pages/home/svg/icon-pledge.svg"
              head="Pledge to Teach"
              onClick={this.handlePledgeBtnClick}
              className={"pledge"}
            />
            <IconButton
              linkTo="activities"
              imgSrc="/img/pages/home/svg/icon-teachanactivity.svg"
              head="Teach an Activity"
              onClick={this.handleTeachBtnClick}
            />
            <IconButton
              linkTo="mozilla-clubs"
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
                height={190} width={190}
                src1x="/img/pages/home/thimble-vertical-lockup.png" src2x="/img/pages/home/thimble-vertical-lockup@2x.png"
                alt="">
                  <p>Try Mozilla Thimble, a more powerful way to teach web literacy. It's designed for educators and classrooms everywhere. Start teaching the Web.</p>
                  <OutboundLink className="btn" to={config.THIMBLE} eventLabel={config.THIMBLE}>Start teaching</OutboundLink>
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

        <div className="row quote">
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
