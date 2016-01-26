var React = require('react');
var HeroUnit = require('../../components/hero-unit.jsx');
var IconLinks = require('../../components/icon-links.jsx');
var IconLink = require('../../components/icon-link.jsx');
var config = require('../../config/config');

var sections = require('./sectionlist.jsx');

var OpportunitiesPage = React.createClass({
  statics: {
    pageTitle: 'Leadership Opportunities',
    pageClassName: 'opportunities-page'
  },
  render: function(){
    return (
      <div>
        <HeroUnit>
          <h1>Leadership Opportunities</h1>
          <h2>Explore leadership opportunities in the movement towards a free and open Web.</h2>
        </HeroUnit>

        <div className="inner-container">
          {sections}

          <section>
            <IconLinks>
              <IconLink
                link={config.TWITTER_LINK}
                imgSrc="/img/pages/opportunities/svg/icon-leadership-twitter.svg"
                width={60}
                head="Follow Us"
                subhead="We're @mozteach on Twitter and our community uses #teachtheweb"
                highlightedText="@mozteach"
              />
              <IconLink
                link="https://discourse.webmaker.org/"
                imgSrc="/img/pages/opportunities/svg/icon-leadership-hello.svg"
                head="Say Hello"
                subhead="Connect on the Discourse forum."
                highlightedText="Discourse forum"
              />
              <IconLink
                link={"mailto:"+config.TEACH_THE_WEB_EMAIL}
                imgSrc="/img/pages/opportunities/svg/icon-leadership-question.svg"
                width={60}
                head="Have a Question?"
                subhead="Want to be connected with one of our staff or volunteers? Email us."
                className="mailto"
                highlightedText="Email us"
              />
            </IconLinks>
          </section>
        </div>
      </div>
    );
  }
});

module.exports = OpportunitiesPage;
