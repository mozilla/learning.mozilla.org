var _ = require('underscore');
var React = require('react');
var ReactDOM = require('react-dom');

var withTeachAPI = require('../../hoc/with-teach-api.jsx');

var HeroUnit = require('../../components/hero-unit.jsx');
var Map = require('../../components/map.jsx');
var ModalAddOrChangeYourClub = require('../../components/modal-clubs.jsx');
var ModalRemoveYourClub = require('../../components/modal-clubs-remove.jsx');
var IconLinks = require('../../components/icon-links.jsx');
var IconLink = require('../../components/icon-link.jsx');

var ClubList = require('./ClubList.jsx');
var ClubLists = require('./ClubLists.jsx');

var fixLocation = require('../../lib/fix-location.js');

var ClubsListPage = React.createClass({
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
  contextTypes: {
    location: React.PropTypes.object
  },
  componentWillMount: function() {
    fixLocation(this.context.location);
  },
  componentDidMount: function() {
    this.props.teachAPI.updateClubs();
    if (this.context.location.search.modal === "add") {
      this.showAddYourClubModal();
    }
  },
  showAddYourClubModal: function() {
    this.props.showModal(ModalAddOrChangeYourClub, {
      onSuccess: this.handleZoomToClub,
      hideModal: this.props.hideModal
    });
  },
  handleZoomToClub: function(club) {
    ReactDOM.findDOMNode(this.refs.map).scrollIntoView();
    this.refs.map.focusOnClub(club);
  },
  handleClubDelete: function(url, clubName) {
    var teachAPI = this.props.teachAPI;
    var hideModal = this.props.hideModal;
    this.props.showModal(ModalRemoveYourClub, {
      url: url,
      name: clubName,
      hideModal: function() {
        teachAPI.updateClubs(hideModal);
      }
    });
  },
  handleClubEdit: function(url) {
    var club = _.findWhere(this.props.teachAPI.getClubs(), {
      url: url
    });
    this.props.showModal(ModalAddOrChangeYourClub, {
      club: club,
      onSuccess: this.handleZoomToClub,
      hideModal: this.props.hideModal
    });
  },
  render: function() {
    var teachAPI = this.props.teachAPI;
    var clubs = teachAPI.getClubs();
    var username = teachAPI.getUsername();
    return (
      <div>
        <HeroUnit>
          <h1>Mozilla Clubs</h1>
          <h2>Local groups teaching the Web around the world</h2>
          <div><a className="btn" onClick={this.showAddYourClubModal}>Apply to be a Club Captain</a></div>
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
                link="/activities/web-lit-basics"
                imgSrc="/img/pages/clubs/svg/icon-curriculum.svg"
                head="Start Teaching"
                subhead="Use our remixable Web Literacy curriculum."
                highlightedText="Web Literacy curriculum"
              />
              <IconLink
                link="https://discourse.webmaker.org/c/mozilla-clubs"
                imgSrc="/img/pages/clubs/svg/icon-connect.svg"
                head="Connect"
                subhead="Connect with other Club Leaders."
                highlightedText="Connect"
              />
              <IconLink
                link="http://mozilla.github.io/learning-networks/clubs/"
                imgSrc="/img/pages/clubs/svg/icon-tips.svg"
                head="Get Help"
                subhead="Resources for running your Club."
                highlightedText="Resources"
              />
            </IconLinks>
          </section>
        </div>
      </div>
    );
  }
});

module.exports = withTeachAPI(ClubsListPage);
