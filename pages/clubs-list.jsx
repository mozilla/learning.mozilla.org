var React = require('react');
var HeroUnit = require('../components/hero-unit.jsx');

var ClubsListPage = React.createClass({
  statics: {
    pageTitle: 'Clubs List',
    pageClassName: 'clubs-list'
  },
  render: function() {
    return (
      <div>
        <HeroUnit>
          <h1>Mozilla Clubs</h1>
          <h2>Local groups teaching the Web around the world</h2>
          <div><a className="btn btn-awsm" onClick={this.showAddYourClubModal}>Apply to be a Club Captain</a></div>
        </HeroUnit>
        <div className="inner-container">
          <section>
            <h2>Where in the World are Mozilla Clubs?</h2>
          </section>
        </div>    
      </div>
    );
  }
});

module.exports = ClubsListPage;
