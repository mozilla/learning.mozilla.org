var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ga = require('react-ga');
var OutboundLink = ga.OutboundLink;
var Illustration = require('../components/illustration.jsx');
var IconLinks = require('../components/icon-links.jsx');
var IconLink = require('../components/icon-link.jsx');
var config = require('../lib/config');

var ToolsIntro = React.createClass({
  render: function() {
    return (
      <div>
        <section className="intro">
          <Illustration
            height={204} width={204}
            src1x="/img/pages/tools/svg/icon-teach-like-mozilla-tools.svg"
            alt="icon toolkit"
            className="illustration-img-circle">
            <h1>Tools to Teach and Learn the Web</h1>
            <h2>These tools are free and open source, and can be used in a variety of ways to teach learners how to read, write, and participate on the Web.</h2>
          </Illustration>
        </section>
      </div>
    );
  }
});

var ToolsColumn = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    link: React.PropTypes.string.isRequired,
    src1x: React.PropTypes.string.isRequired,
    src2x: React.PropTypes.string,
    activityTitle: React.PropTypes.string,
    activityLink: React.PropTypes.string
  },
  render: function() {
    var sampleActivity = null;
    if (this.props.activityTitle && this.props.activityLink) {
      sampleActivity =
        <div className="sample-activity">
          <div className="label-container"><div className="label label-success">Sample Activity</div></div>
          <a href={this.props.activityLink}>{this.props.activityTitle}</a>
        </div>;
    }
    return (
      <div className="col-sm-4 col-md-4 col-lg-4 tools-col">
        <Illustration
          link={this.props.link}
          height={150} width={200}
          src1x={this.props.src1x}
          src2x={this.props.src2x}
          alt=""
          className="vertical-layout"
          externalLink>
          <h2><OutboundLink to={this.props.link} eventLabel={this.props.link}>{this.props.name}</OutboundLink></h2>
          <p>{this.props.description}</p>
        </Illustration>
        {sampleActivity}
      </div>
    );
  }
});

var ToolsSection = React.createClass({
  tools: [
    {
      name: "X-Ray Goggles",
      description: "This code inspector lets you view and remix the code of your favorite web pages.",
      link: config.XRAY_GOGGLES_LINK,
      src1x: "/img/pages/tools/xray-goggles.png",
      src2x: "/img/pages/tools/xray-goggles@2x.png",
      activityTitle: "Hack the News",
      activityLink: "http://mozilla.github.io/webmaker-curriculum/WebLiteracyBasics-I/session02-hackthenews.html"
    },
    {
      name: "Thimble",
      description: "This code editor helps you learn HTML and CSS by creating and remixing Web projects.",
      link: config.THIMBLE,
      src1x: "/img/pages/tools/thimble.png",
      src2x: "/img/pages/tools/thimble@2x.png",
      activityTitle: "Keep Calm and Carry On",
      activityLink: "https://thimble.mozilla.org/projects/72/remix"
    },
    {
      name: "Webmaker",
      description: "Webmaker lets you create, discover and share content in your language on your mobile device.",
      link: "https://webmaker.org",
      src1x: "/img/pages/tools/svg/webmaker.svg",
      activityTitle: "Create a Webmaker Project",
      activityLink: "http://mozilla.github.io/webmaker-curriculum/MobileWeb/create-webmaker-project.html"
    }
  ],
  render: function() {
    return (
      <section>
        <div className="row">
          { this.tools.map(function(tool, i) {
              return <ToolsColumn {...tool} key={i} />;
            })
          }
        </div>
      </section>
    )
  }
});

var ToolsPage = React.createClass({
  statics: {
    pageTitle: 'Tools',
    pageClassName: 'tools-page'
  },
  render: function(){
    return (
      <div className="inner-container">
        <ToolsIntro/>
        <ToolsSection/>
        <section>
          <div className="row">
            <div className="col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">
              <p className="callout-heading">Visit our <Link to="activities">Teaching Activities page</Link> for more examples of how to use these tools in your practice.</p>
            </div>
          </div>
        </section>
        <img src="/img/pages/tools/svg/icon-horizontal-divider.svg" width={292} alt="" className="center-block horizontal-divider"/>
        <section>
          <IconLinks>
            <IconLink
              href="http://mzl.la/TTWpodcasts"
              imgSrc="/img/pages/teach-like-mozilla/svg/icon-listen.svg"
              head="Listen"
              subhead="Subscribe to our podcast"
            />
            <IconLink
              linkTo="web-literacy"
              imgSrc="/img/pages/teach-like-mozilla/svg/icon-learn.svg"
              head="Understand"
              subhead="Learn more about the Web Literacy Map"
            />
            <IconLink
              href="http://discourse.webmaker.org/category/meet"
              imgSrc="/img/pages/teach-like-mozilla/svg/icon-connect.svg"
              head="Say Hello"
              subhead="Meet the teach community"
            />
          </IconLinks>
        </section>
      </div>
    );
  }
});

module.exports = ToolsPage;
