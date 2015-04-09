var React = require('react');

var ClubView = React.createClass({
  render: function() {
    return (
      <div>
        <h4><a href={club.website}>{club.name}</a></h4>
        <p><em>{club.location.split(',')[0]}</em></p>
        <p><small>Led by <a href={"https://webmaker.org/en-US/search?type=user&q=" + club.owner}>{club.owner}</a></small></p>
      </div>
    );
  }
});

module.exports = ClubView;
