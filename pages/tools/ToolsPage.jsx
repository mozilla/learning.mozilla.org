var React = require('react');
var Link = require('react-router').Link;
var HeroUnit = require('../../components/hero-unit.jsx');
var IconLinks = require('../../components/icon-links.jsx');
var IconLink = require('../../components/icon-link.jsx');

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
    return (
      <div>
        <HeroUnit>
          <h1>Tools</h1>
          <h2>Open source software to teach and learn the Web</h2>
        </HeroUnit>

        {ToolsIntro}

        <ToolsSection/>

        <section>
          <div className="row">
            <div className="col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">
              <p className="callout-heading">Visit our <Link to={"/" + this.context.intl.locale + "/activities"}>Teaching Activities page</Link> for more examples of how to use these tools in your practice.</p>
            </div>
          </div>
        </section>

        <div className="horizontal-divider"/>

        <section>
          <IconLinks>
            <IconLink
              link="http://mzl.la/TTWpodcasts"
              imgSrc="/img/pages/tools/svg/icon-listen.svg"
              head="Listen"
              subhead="Subscribe to our podcast."
              highlightedText="podcast"
            />
            <IconLink
              link="/web-literacy"
              imgSrc="/img/pages/tools/svg/icon-learn.svg"
              head="Explore"
              subhead="Learn more about the Web Literacy Map."
              highlightedText="Web Literacy Map"
            />
            <IconLink
              link="https://discourse.webmaker.org/t/if-youre-new-to-the-community-please-introduce-yourself"
              imgSrc="/img/pages/tools/svg/icon-connect.svg"
              head="Say Hello"
              subhead="Meet the community on the Discourse forum."
              highlightedText="Discourse forum"
            />
          </IconLinks>
        </section>
      </div>
    );
  }
});

module.exports = ToolsPage;
