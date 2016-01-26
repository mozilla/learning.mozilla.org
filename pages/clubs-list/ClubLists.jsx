var React = require('react');
var ClubList = require('./ClubList.jsx');

var ClubLists = React.createClass({
  propTypes: {
    clubs: React.PropTypes.array.isRequired,
    username: React.PropTypes.string,
    onDelete: React.PropTypes.func.isRequired,
    onEdit: React.PropTypes.func.isRequired,
    onZoomToLocation: React.PropTypes.func.isRequired
  },
  componentWillMount: function() {
    this.componentWillReceiveProps(this.props);
  },
  // TODO: why is this function used?
  componentWillReceiveProps: function(props) {
    var username = props.username;
    var userClubs = [];
    var otherClubs = [];
    var userHasUnapprovedClubs = false;

    props.clubs.forEach(function(club) {
      if (club.owner === username) {
        if (club.status !== 'approved') {
          userHasUnapprovedClubs = true;
        }
        userClubs.push(club);
      } else {
        otherClubs.push(club);
      }
    });

    this.setState({
      userClubs: userClubs,
      otherClubs: otherClubs,
      userHasUnapprovedClubs: userHasUnapprovedClubs
    });
  },
  render: function() {
    return (
      <div>
        {this.state.userClubs.length ? (
          <div>
            <h3>My Clubs</h3>
            <ClubList
             clubs={this.state.userClubs}
             username={this.props.username}
             onDelete={this.props.onDelete}
             onEdit={this.props.onEdit}
             onZoomToLocation={this.props.onZoomToLocation}/>
             {this.state.userHasUnapprovedClubs ? (
               <div className="alert alert-warning">
                 <strong>Note:</strong> All clubs pending approval or denied are not visible to other users.
               </div>
             ) : null}
          </div>
        ) : null}
        <h3>Club List</h3>
        <ClubList
         clubs={this.state.otherClubs}
         onZoomToLocation={this.props.onZoomToLocation}/>
      </div>
    );
  }
});

module.exports = ClubLists;
