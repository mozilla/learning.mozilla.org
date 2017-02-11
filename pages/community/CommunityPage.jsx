var React = require('react');

var HeroUnit = require('../../components/hero-unit.jsx');
var IconLinks = require('../../components/icon-links.jsx');
var IconLink = require('../../components/icon-link.jsx');

var Intro = require('./Intro.jsx');
var VerticalCard = require('./VerticalCard.jsx');

/* temporary hiding email signup from UI as per request https://github.com/mozilla/learning.mozilla.org/issues/2426
var SignupForm = require('../../components/newsletter-signup/SignupForm.jsx');
var validateSignupForm = require('../../components/newsletter-signup/validateSignupForm');
*/

var config = require('../../config/config.js');

var communityList = [
  {
    imgSrc1x: '/img/pages/community/clubs.jpg',
    imgSrc2x: '/img/pages/community/clubs@2x.jpg',
    header: 'Clubs Open Office Hours',
    description: 'Have questions about Mozilla Clubs? Want to discuss what Mozilla Clubs looks like in your community? Want to share what your Mozilla Club is doing or or where you need help? Join us at our monthly office hours.',
    linkText: 'Find upcoming office hour dates.',
    linkUrl: 'https://mozillaclubs.youcanbook.me/'
  },
  {
    imgSrc1x: '/img/pages/community/hive.jpg',
    imgSrc2x: '/img/pages/community/hive@2x.jpg',
    header: 'Hive Learning Networks',
    description: 'Hive Learning Networks are a growing constellation of communities around the globe that are championing digital skills and web literacy through connected learning.',
    linkText: "Find out if there's one near you.",
    linkUrl: 'https://hivelearningnetworks.org/'
  }
];

var communities = communityList.map(function(community) {
  return <VerticalCard {...community} key={community.header} />;
});

var CommunityPage = React.createClass({
  statics: {
    pageTitle: 'Community',
    pageClassName: 'community-page',
    // temporary hiding email signup from UI as per request https://github.com/mozilla/learning.mozilla.org/issues/2426
    // SignupForm: SignupForm,
    // validateSignupForm: validateSignupForm
  },
  render: function () {
    return (
      <div>
        <HeroUnit>
          <h1>Community</h1>
          <h2>Join a global community of people teaching the Web</h2>
        </HeroUnit>
        <div className="inner-container">
          {Intro}
          <section>
            <div className="horizontal-divider full-width"></div>
          </section>
          <section className="communities-info">
            {communities}
          </section>
          {/* temporary hiding email signup from UI as per request https://github.com/mozilla/learning.mozilla.org/issues/2426
          <div className="vertical-divider"></div>
          <section className="text-center">
            <h2>Get the latest teaching activities, tips, and news in your inbox every month. Sign up for the Mozilla Learning Newsletter.</h2>
            <SignupForm idPrefix="signup-form-" sourceUrl={this.props.currentPath} />
          </section>
          */}
          <section>
            <div className="horizontal-divider full-width"></div>
          </section>
          <section>
          <IconLinks>
            <IconLink
              link={ config.TWITTER_LINK }
              imgSrc="/img/pages/community/svg/icon-community-twitter.svg"
              width={60}
              head="Follow Us"
              subhead={"We're " + config.TWITTER_HANDLE + " on Twitter and our community uses #teachtheweb" }
              highlightedText={ config.TWITTER_HANDLE }
            />
            <IconLink
              link="https://docs.google.com/a/mozillafoundation.org/forms/d/1bOXV1OiF2EKS5KprlnzfFpwaoVNwxLAwN_UEq6hGKqU/viewform"
              imgSrc="/img/pages/community/svg/icon-community-story.svg"
              head="Share Your Story"
              subhead="If you teach the Web we'd love to hear about it! Share your story using this form."
              highlightedText="this form"
            />
            <IconLink
              link="mailto:teachtheweb@mozillafoundation.org"
              imgSrc="/img/pages/community/svg/icon-community-question.svg"
              width={60}
              head="Have a Question?"
              subhead="Want to be connected with one of our staff or volunteers? Email us."
              highlightedText="Email us"
            />
          </IconLinks>
        </section>
        </div>
      </div>
    );
  }
});

module.exports = CommunityPage;
