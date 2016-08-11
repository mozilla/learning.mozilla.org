var React = require('react');
var TabSwitcher = require('mofo-ui').TabSwitcher;
var HeroUnit = require('../../components/hero-unit.jsx');

var About = require('./About.jsx');
var Running = require('./Running.jsx');
var Start = require('./Start.jsx');

var ClubForm = require('./ClubForm.jsx');

var ClubsGuides = React.createClass({
  getInitialState: function(){
    return {
      showApplication: false
    }
  },
  statics: {
    pageClassName: 'clubs-guides',
    pageTitle: 'Clubs Guides & Resources'
  },
  showApplication: function(){
    this.setState({
      showApplication: true
    });
  },
  render: function () {
    if(this.state.showApplication) {
      return (
        <ClubForm currentPath={this.props.currentPath}></ClubForm>
      )
    }
    return (
      <div>
        <HeroUnit>
          <h1>Mozilla Clubs</h1>
          <h2>Local groups that read, write, and participate on the web</h2>
        </HeroUnit>
        <div className="inner-container">
          <TabSwitcher initialTab={'about'}>
            <div slug="about" name="About Mozilla Clubs" iconDefault="/img/pages/clubs/tab-icons/tab-icon-info-inactive.svg" iconActive="/img/pages/clubs/tab-icons/tab-icon-info-active.svg"><About></About></div>
            <div slug="start" name="Start a Club" iconDefault="/img/pages/clubs/tab-icons/tab-icon-flag-inactive.svg" iconActive="/img/pages/clubs/tab-icons/tab-icon-flag-active.svg"><Start onClick={this.showApplication}></Start></div>
            <div slug="running" name="Running Your Club" iconDefault="/img/pages/clubs/tab-icons/tab-icon-book-inactive.svg" iconActive="/img/pages/clubs/tab-icons/tab-icon-book-active.svg"><Running></Running></div>
          </TabSwitcher>
        </div>
      </div>
    );
  }
});

module.exports = ClubsGuides;
