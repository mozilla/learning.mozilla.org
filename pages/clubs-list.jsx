var _ = require('underscore');
var React = require('react');
var ModalManagerMixin = require('../mixins/modal-manager');
var TeachAPIClientMixin = require('../mixins/teach-api-client');
var HeroUnit = require('../components/hero-unit.jsx');
var Map = require('../components/map.jsx');
var ModalAddOrChangeYourClub = require('../components/modal-clubs.jsx');
var ModalRemoveYourClub = require('../components/modal-clubs-remove.jsx');
var IconLinks = require('../components/icon-links.jsx');
var IconLink = require('../components/icon-link.jsx');

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
          <button className="btn btn-default btn-xs" onClick={this.props.onEdit.bind(null, club.url)}>
            <span className="glyphicon glyphicon-pencil"></span>Edit
          </button>
          <button className="btn btn-default btn-xs" onClick={this.props.onDelete.bind(null, club.url, club.name)}>
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

var ClubList = React.createClass({
  COLUMNS: 2,
  GRID_COLUMNS_PER_ROW: 12,
  propTypes: {
    clubs: React.PropTypes.array.isRequired,
    username: React.PropTypes.string,
    onDelete: React.PropTypes.func,
    onEdit: React.PropTypes.func,
    onZoomToLocation: React.PropTypes.func.isRequired
  },
  statics: {
    Item: ClubListItem
  },
  renderColumn: function(key, clubs) {
    var colClass = 'col-xs-' + (this.GRID_COLUMNS_PER_ROW / this.COLUMNS);
    return (
      <div className={colClass} key={key}>
        <ul className="list-unstyled colored-list">
          {clubs.map(function(club, i) {
            return  <ClubListItem key={i} club={club}
                                  username={this.props.username}
                                  onEdit={this.props.onEdit}
                                  onDelete={this.props.onDelete}
                                  onZoomToLocation={this.props.onZoomToLocation} />;
          }, this)}
        </ul>
      </div>
    );
  },
  render: function() {
    var clubs = _.sortBy(this.props.clubs, 'name');
    var itemsPerColumn = Math.ceil(this.props.clubs.length / this.COLUMNS);
    var columns = _.range(this.COLUMNS).map(function(i) {
      return this.renderColumn(i, clubs.slice(
        i * itemsPerColumn,
        (i + 1) * itemsPerColumn
      ));
    }, this);

    return <div className="row">{columns}</div>;
  }
});

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

var ClubsListPage = React.createClass({
  mixins: [ModalManagerMixin, TeachAPIClientMixin],
  contextTypes: {
    router: React.PropTypes.func
  },
  statics: {
    ClubList: ClubList,
    ClubLists: ClubLists,
    teachAPIEvents: {
      'clubs:change': 'forceUpdate',
      'username:change': 'forceUpdate'
    },
    pageTitle: 'Clubs List',
    pageClassName: 'clubs-list-page'
  },
  componentDidMount: function() {
    this.getTeachAPI().updateClubs();

    if (this.context.router.getCurrentQuery().modal === 'add') {
      this.showAddYourClubModal();
    }
  },
  showAddYourClubModal: function() {
    this.showModal(ModalAddOrChangeYourClub, {
      onSuccess: this.handleZoomToClub
    });
  },
  handleZoomToClub: function(club) {
    this.refs.map.getDOMNode().scrollIntoView();
    this.refs.map.focusOnClub(club);
  },
  handleClubDelete: function(url, clubName) {
    this.showModal(ModalRemoveYourClub, {
      url: url,
      name: clubName
    });
  },
  handleClubEdit: function(url) {
    var club = _.findWhere(this.getTeachAPI().getClubs(), {
      url: url
    });
    this.showModal(ModalAddOrChangeYourClub, {
      club: club,
      onSuccess: this.handleZoomToClub
    });
  },
  render: function() {
    var teachAPI = this.getTeachAPI();
    var clubs = teachAPI.getClubs();
    var username = teachAPI.getUsername();
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
            <div className="mapDiv" id="mapDivID">
              <Map ref="map" className="mapDivChild"
               clubs={clubs}
               username={username}
               onDelete={this.handleClubDelete}
               onEdit={this.handleClubEdit}/>
            </div>
            <ClubLists clubs={clubs}
             username={username}
             onDelete={this.handleClubDelete}
             onEdit={this.handleClubEdit}
             onZoomToLocation={this.handleZoomToClub} />
          </section>
          <section>
            <IconLinks>
              <IconLink
                linkTo="web-lit-basics"
                imgSrc="/img/pages/clubs/svg/icon-curriculum.svg"
                head="Curriculum"
                subhead="Modular Web Literacy curriculum"
              />
              <IconLink
                href="http://discourse.webmaker.org/category/meet"
                imgSrc="/img/pages/clubs/svg/icon-connect.svg"
                head="Connect"
                subhead="Connect with other Club Leaders"
              />
              <IconLink
                href="http://mozilla.github.io/learning-networks/clubs/"
                imgSrc="/img/pages/clubs/svg/icon-tips.svg"
                head="Helpful Tips"
                subhead="Tips for running your Club"
              />
            </IconLinks>
          </section>
        </div>    
      </div>
    );
  }
});

module.exports = ClubsListPage;
