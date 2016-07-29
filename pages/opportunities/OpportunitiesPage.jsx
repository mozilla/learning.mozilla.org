var React = require('react');
var HeroUnit = require('../../components/hero-unit.jsx');
var IconLinks = require('../../components/icon-links.jsx');
var IconLink = require('../../components/icon-link.jsx');
var config = require('../../config/config');

var SectionList = require('./sectionlist.jsx');

var OpportunitiesPage = React.createClass({
  statics: {
    pageTitle: 'Leadership Opportunities',
    pageClassName: 'opportunities-page'
  },
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function(){
    var formatMessage = this.context.intl.formatMessage;
    var twitterHandle = config.TWITTER_HANDLE;
    var ourTwitterHandle = formatMessage({id: 'ourTwitterHandle'}, {twitterHandle: twitterHandle})
    return (
      <div>
        <HeroUnit>
          <h1>{formatMessage({id: 'leadership_opportunities'})}</h1>
          <h2>{formatMessage({id: 'explore_loadership_opportunities'})}</h2>
        </HeroUnit>

        <div className="inner-container">
          <SectionList/>

          <section>
            <IconLinks>
              <IconLink
                link={config.TWITTER_LINK}
                imgSrc="/img/pages/opportunities/svg/icon-leadership-twitter.svg"
                width={60}
                head={formatMessage({id: 'follow_us'})}
                subhead={ourTwitterHandle}
                highlightedText={ config.TWITTER_HANDLE }
              />
              <IconLink
                link="https://discourse.webmaker.org/"
                imgSrc="/img/pages/opportunities/svg/icon-leadership-hello.svg"
                head={formatMessage({id: 'say_hello'})}
                subhead={formatMessage({id: 'connect_on_discourse'})}
                highlightedText={formatMessage({id: 'discourse_forum'})}
              />
              <IconLink
                link={"mailto:"+config.TEACH_THE_WEB_EMAIL}
                imgSrc="/img/pages/opportunities/svg/icon-leadership-question.svg"
                width={60}
                head={formatMessage({id: 'have_a_question'})}
                subhead={formatMessage({id: 'want_to_connect_with_staff'})}
                className="mailto"
                highlightedText={formatMessage({id: 'email_us'})}
              />
            </IconLinks>
          </section>
        </div>
      </div>
    );
  }
});

module.exports = OpportunitiesPage;
