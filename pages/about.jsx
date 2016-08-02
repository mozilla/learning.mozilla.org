var React = require('react');

var ImageTag = require('../components/imagetag.jsx');
var IconLinks = require('../components/icon-links.jsx');
var IconLink = require('../components/icon-link.jsx');
var Illustration = require('../components/illustration.jsx');

var config = require('../config/config');

var Intro = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function() {
    return (
      <div>
        <h1>{this.context.intl.formatMessage({id: 'about_mln'})}</h1>
        <section className="intro">
          <Illustration width={226} height={226}
          src1x="/img/pages/about/hive-nyc-summer-quest.jpg"
          alt="HiveLearningNYC 2014 Hive NYC Summer Quest Maker Party">
            <p>
              {this.context.intl.formatMessage({id: 'about_mln_intro'})}
            </p>
          </Illustration>
        </section>
      </div>
    )
  }
});

var OurFocus = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function() {
    return (
      <section className="row list-with-illust">
        <Illustration width={199} height={199}
        src1x="/img/pages/home/svg/icon-circle-home.svg"
        alt="A graphic showing an illustration of a person, a book, some gears, a map pin, and a square acedemic cap">
          <ul className="colored-list">
            <li>{this.context.intl.formatMessage({id: 'our_focus_one'})}</li>
            <li>{this.context.intl.formatMessage({id: 'our_focus_two'})}</li>
            <li>{this.context.intl.formatMessage({id: 'our_focus_three'})}</li>
            <li>{this.context.intl.formatMessage({id: 'our_focus_four'})}</li>
          </ul>
        </Illustration>
      </section>
    )
  }
});

var OurGoal = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function() {
    return (
    <section className="row page-end our-goal">
      <div className="horizontal-divider"></div>
      <p className="learn-more">
        {this.context.intl.formatMessage({id: 'our_goal'})}
      </p>
      <div className="horizontal-divider"></div>
    </section>
    )
  }
});

var IconLinksSets = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function() {
    return (
      <IconLinks>
        <IconLink
          link={config.TWITTER_LINK}
          imgSrc="/img/pages/about/svg/icon-twitter-blue.svg"
          width={60}
          head={this.context.intl.formatMessage({id: 'follow_us'})}
          subhead={this.context.intl.formatMessage({id: 'start_conv_on_twitter'})}
          highlightedText={this.context.intl.formatMessage({id: 'twitter'})}
        />
        <IconLink
          link={"mailto:"+config.TEACH_THE_WEB_EMAIL}
          imgSrc="/img/pages/about/svg/icon-get-help-blue.svg"
          head={this.context.intl.formatMessage({id: 'get_help'})}
          subhead={this.context.intl.formatMessage({id: 'email_us_anytime'})}
          highlightedText={this.context.intl.formatMessage({id: 'email_us'})}
        />
        <IconLink
          link="https://discourse.webmaker.org/t/if-youre-new-to-the-community-please-introduce-yourself"
          imgSrc="/img/pages/about/svg/icon-connect-blue.svg"
          head={this.context.intl.formatMessage({id: 'say_hello'})}
          subhead={this.context.intl.formatMessage({id: 'connect_on_discourse'})}
          highlightedText={this.context.intl.formatMessage({id: 'discourse_forum'})}
        />
      </IconLinks>
    )
  }
});

var AboutPage = React.createClass({
  statics: {
    pageTitle: 'About',
    pageClassName: 'about-page'
  },
  render: function () {
    return (
      <div className="inner-container">
        <Intro/>
        <OurFocus/>
        <OurGoal/>
        <IconLinksSets/>
      </div>
    );
  }
});

module.exports = AboutPage;
