var React = require('react');
var Map = require('../../components/map.jsx');

var ClubListItem = React.createClass({
  propTypes: {
    club: React.PropTypes.object.isRequired,
    username: React.PropTypes.string,
    onDelete: React.PropTypes.func,
    onEdit: React.PropTypes.func,
    onZoomToLocation: React.PropTypes.func.isRequired
  },
  handleLocationClick: function() {
    this.props.onZoomToLocation(this.props.club);
  },
  render: function() {
    var club = this.props.club;
    var clubName = club.website ? <a href={club.website}>{club.name}</a> : club.name;
    var isOwned = (club.owner === this.props.username);
    var ownerControls = null;

    if (isOwned) {
      ownerControls = (
        <p className="action-panel">
          <button className="btn" onClick={this.props.onEdit.bind(null, club.url)}>
            <span className="glyphicon glyphicon-pencil"></span>Edit
          </button>
          <button className="btn" onClick={this.props.onDelete.bind(null, club.url, club.name)}>
            <span className="glyphicon glyphicon-trash"></span>Remove
          </button>
        </p>
      );
    }

    return (
      <li>
        <h4>{clubName} <Map.ClubStatusLabel showApproved={isOwned} status={club.status}/></h4>
        <p><span className="club-location" onClick={this.handleLocationClick}><span className="glyphicon glyphicon-map-marker"/> {club.location.split(',')[0]}</span></p>
        <p>{club.description}</p>
        <p><small>Led by {club.owner}</small></p>
        {ownerControls}
      </li>
    );
  }
});

module.exports = ClubListItem;
