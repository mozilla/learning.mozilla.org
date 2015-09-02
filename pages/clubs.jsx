var _ = require('underscore');
var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;

var Page = require('../components/page.jsx');
var HeroUnit = require('../components/hero-unit.jsx');
var Map = require('../components/map.jsx');
var Blockquote = require('../components/blockquote.jsx');
var IconLinks = require('../components/icon-links.jsx');
var IconLink = require('../components/icon-link.jsx');
var ModalManagerMixin = require('../mixins/modal-manager');
var TeachAPIClientMixin = require('../mixins/teach-api-client');
var LoginLink = require('../components/login.jsx').LoginLink;
var ModalAddOrChangeYourClub = require('../components/modal-clubs.jsx');
var ModalRemoveYourClub = require('../components/modal-clubs-remove.jsx');

var ga = require('react-ga');

var Illustration = require('../components/illustration.jsx');

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
        <p>
          <button className="btn btn-default btn-xs" onClick={this.props.onEdit.bind(null, club.url)}>
            <span className="glyphicon glyphicon-pencil"></span> Edit
          </button>
          &nbsp;
          <button className="btn btn-default btn-xs" onClick={this.props.onDelete.bind(null, club.url, club.name)}>
            <span className="glyphicon glyphicon-trash"></span> Remove
          </button>
        </p>
      );
    }

    return (
      <li>
        <h4>{clubName} <Map.ClubStatusLabel showApproved={isOwned} status={club.status}/></h4>
        <p><span className="club-location" onClick={this.handleLocationClick}><span className="glyphicon glyphicon-map-marker"/> {club.location.split(',')[0]}</span></p>
        <p>{club.description}</p>
        <p><small>Led by <a href={"https://webmaker.org/en-US/search?type=user&q=" + club.owner}>{club.owner}</a></small></p>
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
        <ul className="list-unstyled">
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

var WebLitMap = React.createClass({
  render: function() {
    return(
      <div className="row">
        <div className="col-sm-12 col-md-12 col-lg-12">
          <h2>The Global Web Literacy Movement</h2>
        </div>
      </div>

    );
  }
});

var HowClubWorks = React.createClass({
  render: function() {
    return(
      <div className="list-with-illust">
        <Illustration
        width={182} height={237}
        src1x="/img/pages/clubs/svg/icon-how-do-clubs-work.svg"
        alt="icon how do Mozilla clubs work">
          <h2>How do Mozilla Clubs work?</h2>
          <ul>
            <li>Grow the web literacy of learners</li>
            <li>Meet regularly in classrooms, libraries, coffee shops &mdash; anywhere!</li>
            <li>Teach with open practices</li>
            <li>Guide people to learn by making</li>
            <li>Connect with local and global networks</li>
          </ul>
        </Illustration>
      </div>
    );
  }
});

var Quote = React.createClass({
  render: function() {
    return(
      <div className="row">
        <div className="col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">
          <Blockquote className="primary-quote" author="Mikko K, Helsinki, Finland"
              imgSrc="/img/pages/clubs/mikko-finland.png" imgSrc2x="/img/pages/clubs/mikko-finland@2x.png">

            <p>The idea of teachers and students learning at the same time is what makes me excited about this work.</p>
          </Blockquote>
        </div>
      </div>
    );
  }
});

var normalizeClub = function(clubState) {
  var state = _.extend({}, clubState);

  if (state.website && !/^https?:\/\//.test(state.website)) {
    state.website = 'http://' + state.website;
  }

  return state;
};

var validateClub = function(clubState) {
  var errors = [];

  if (!clubState.name) {
    errors.push("You must provide a name for your club.");
  }
  if (!clubState.description) {
    errors.push("You must provide a description for your club.");
  }
  if (!clubState.location) {
    errors.push("You must provide a location for your club.");
  }
  if (clubState.website && !/\./.test(clubState.website)) {
    errors.push("Your club's website must be a valid URL.");
  }

  return errors;
};

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

var ClubsPage = React.createClass({
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
    pageTitle: "Clubs",
    pageClassName: "clubs"
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
          <div><a className="btn btn-awsm" onClick={this.showAddYourClubModal}>Apply</a></div>
        </HeroUnit>
        <div className="inner-container">
          <section>
            <HowClubWorks/>
          </section>
          <section>
            <WebLitMap/>
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
            <Quote/>
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
                linkTo="clubs-toolkit"
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

module.exports = ClubsPage;
