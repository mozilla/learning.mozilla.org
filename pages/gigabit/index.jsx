var React = require('react');
var TabSwitcher = require('mofo-ui').TabSwitcher;
var HeroUnit = require('../../components/hero-unit.jsx');

var About = require('./About.jsx');
var Portfolio = require('./Portfolio.jsx');
var Apply = require('./Apply.jsx');
var Events = require('./Events.jsx');
var Terms = require('./Terms.jsx');

module.exports = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  statics: {
    pageClassName: 'gigabit-section',
    pageTitle: 'Gigabit'
  },
  handleTabChange(event) {
    let tabID = event.slug;

    this.props.history.pushState(this.props.state, `/${this.context.intl.locale}/gigabit/${tabID}`);
  },
  componentDidUpdate() {
    this.refs.tabSwitcher.setState({
      activeTab: this.refs.tabSwitcher.getSlugIndex(this.props.params.tab)
    });
  },
  render() {
    var applyGuts;

    if (this.props.params.tab === 'apply') {
      if (!this.props.params.subview) {
        applyGuts = <Apply></Apply>;
      } else if (this.props.params.subview === 'terms') {
        applyGuts = <Terms></Terms>;
      }
    }

    return (
      <div>
        <HeroUnit>
          <h1>Gigabit Community Fund</h1>
          <h2>Next-generation networks with the power to transform learning.</h2>
        </HeroUnit>
        <div>
          <TabSwitcher ref="tabSwitcher" initialTab={this.props.params.tab || `about`} onChange={this.handleTabChange}>
            <div slug="about" name="About" iconDefault="/img/pages/clubs/tab-icons/tab-icon-info-inactive.svg" iconActive="/img/pages/gigabit/glyphs/tab-icon-info-active.svg">
              <About></About>
            </div>
            <div slug="portfolio" name="Portfolio" iconDefault="/img/pages/gigabit/glyphs/portfolio-stroke.svg" iconActive="/img/pages/gigabit/glyphs/portfolio-stroke-active.svg">
              <Portfolio project={this.props.params.tab === 'portfolio' ? this.props.params.subview : null}></Portfolio>
            </div>
            <div slug="apply" name="Apply" iconDefault="/img/pages/gigabit/glyphs/apply-stroke.svg" iconActive="/img/pages/gigabit/glyphs/apply-stroke-active.svg">
              {applyGuts}
            </div>
            <div slug="events" name="Events" iconDefault="/img/pages/gigabit/glyphs/events-stroke.svg" iconActive="/img/pages/gigabit/glyphs/events-stroke-active.svg">
              <Events></Events>
            </div>
          </TabSwitcher>
        </div>
      </div>
    );
  }
});
