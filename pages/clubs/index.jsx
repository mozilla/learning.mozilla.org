var React = require('react');
var TabSwitcher = require('mofo-ui').TabSwitcher;
var HeroUnit = require('../../components/hero-unit.jsx');

var About = require('./About.jsx');
var Running = require('./Running.jsx');
var Start = require('./Start.jsx');
var Coordinators = require('./Coordinators.jsx');

var Link = require('react-router').Link;

var ClubsGuides = React.createClass({
  getInitialState: function(){
    return {};
  },
  statics: {
    pageTitle: 'Clubs Guides & Resources',
    pageClassName: 'clubs',
    teachAPIEvents: {
      'clubs:change': 'forceUpdate',
      'username:change': 'forceUpdate'
    }
  },
  contextTypes: {
    intl: React.PropTypes.object
  },
  handleTabChange: function (event) {
    let tabID = event.slug;

    this.props.history.pushState(this.props.state, `/${this.context.intl.locale}/clubs/${tabID}`);
  },
  componentDidUpdate: function () {
    this.refs.tabSwitcher.setState({
      activeTab: this.refs.tabSwitcher.getSlugIndex(this.props.params.tab)
    });
  },
  render: function () {
    return (
      <div>
        <HeroUnit>
          <h1>Mozilla Clubs</h1>
          <h2>Local groups that read, write, and participate on the web</h2>
        </HeroUnit>
        <div className="inner-container">
          <TabSwitcher className="clubs-tabswitcher" ref="tabSwitcher" initialTab={this.props.params.tab || `about`} onChange={this.handleTabChange}>
            <div slug="about" name="About Mozilla Clubs" iconDefault="/img/pages/clubs/tab-icons/tab-icon-info-inactive.svg" iconActive="/img/pages/clubs/tab-icons/tab-icon-info-active.svg"><About/></div>
            <div slug="start" name="Start a Club" iconDefault="/img/pages/clubs/tab-icons/tab-icon-flag-inactive.svg" iconActive="/img/pages/clubs/tab-icons/tab-icon-flag-active.svg"><Start/></div>
            <div slug="running" name="Running Your Club" iconDefault="/img/pages/clubs/tab-icons/tab-icon-book-inactive.svg" iconActive="/img/pages/clubs/tab-icons/tab-icon-book-active.svg"><Running/></div>
            <div slug="coordinators" name="Coordinators"><Coordinators/></div>
          </TabSwitcher>
        </div>
      </div>
    );
  }
});

module.exports = ClubsGuides;
