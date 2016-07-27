var React = require('react');
var Link = require('react-router').Link;
var HeroUnit = require('../../components/hero-unit.jsx');
var IconLinks = require('../../components/icon-links.jsx');
var IconLink = require('../../components/icon-link.jsx');
var FormattedMessage = require('react-intl').FormattedMessage;
var FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;

var ToolsIntro = require('./ToolsIntro.jsx');
var ToolsSection = require('./ToolsSection.jsx');

var ToolsPage = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  statics: {
    pageTitle: 'Tools',
    pageClassName: 'tools-page'
  },
  render: function(){
    var teachingActivitiesPageLink = (<Link to={"/" + this.context.intl.locale + "/activities"}>{this.context.intl.formatMessage({id: 'teaching_activities_page'})}</Link>);

    return (
      <div>
        <HeroUnit>
          <h1><FormattedMessage id='tools' /></h1>
          <h2><FormattedMessage id='tools_intro' /></h2>
        </HeroUnit>

        {ToolsIntro}

        <ToolsSection/>

        <section>
          <div className="row">
            <div className="col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">
              <p className="callout-heading"><FormattedMessage id='tools_cta_with_link' values={{teachingActivitiesPageLink: teachingActivitiesPageLink}} /></p>
            </div>
          </div>
        </section>

        <div className="horizontal-divider"/>

        <section>
          <IconLinks>
            <IconLink
              link="http://mzl.la/TTWpodcasts"
              imgSrc="/img/pages/tools/svg/icon-listen.svg"
              head={this.context.intl.formatMessage({id: 'listen'})}
              subhead={this.context.intl.formatMessage({id: 'subscribe_to_our_podcast'})}
              highlightedText={this.context.intl.formatMessage({id: 'podcast'})}
            />
            <IconLink
              link="/web-literacy"
              imgSrc="/img/pages/tools/svg/icon-learn.svg"
              head={this.context.intl.formatMessage({id: 'explore'})}
              subhead={this.context.intl.formatMessage({id: 'learn_more_about_web_lit_map'})}
              highlightedText={this.context.intl.formatMessage({id: 'web_lit_map' })}
            />
            <IconLink
              link="https://discourse.webmaker.org/t/if-youre-new-to-the-community-please-introduce-yourself"
              imgSrc="/img/pages/tools/svg/icon-connect.svg"
              head={this.context.intl.formatMessage({id: 'say_hello'})}
              subhead={this.context.intl.formatMessage({id: 'meet_community_discourse'})}
              highlightedText={this.context.intl.formatMessage({id: 'discourse_forum'})}
            />
          </IconLinks>
        </section>
      </div>
    );
  }
});

module.exports = ToolsPage;
