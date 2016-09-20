var React = require('react');
var TabSwitcher = require('mofo-ui').TabSwitcher;
var HeroUnit = require('../../components/hero-unit.jsx');

var About = require('./About.jsx');
var Portfolio = require('./Portfolio.jsx');
var Apply = require('./Apply.jsx');

module.exports = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
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
    return (
      <div>
        <HeroUnit>
          <h1>Gigabit Community Fund</h1>
          <h2>Next-generation networks with the power to transform learning.</h2>
        </HeroUnit>
        <div className="inner-container">
          <TabSwitcher ref="tabSwitcher" initialTab={this.props.params.tab || `about`} onChange={this.handleTabChange}>
            <div slug="about" name="About Mozilla Gigabit" iconDefault="#TODO" iconActive="#TODO">
              <About></About>
            </div>
            <div slug="portfolio" name="Portfolio" iconDefault="#TODO" iconActive="#TODO">
              <Portfolio></Portfolio>
            </div>
            <div slug="apply" name="Apply" iconDefault="#TODO" iconActive="#TODO">
              <Apply></Apply>
            </div>
          </TabSwitcher>
        </div>
      </div>
    );
  }
});
