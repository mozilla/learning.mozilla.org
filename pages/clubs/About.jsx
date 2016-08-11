var _ = require('underscore');
var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;

var withTeachAPI = require('../../hoc/with-teach-api.jsx');

var fixLocation = require('../../lib/fix-location.js');

var HeroUnit = require('../../components/hero-unit.jsx');
var Map = require('../../components/map.jsx');
var IconLinks = require('../../components/icon-links.jsx');
var IconLink = require('../../components/icon-link.jsx');
var LoginLink = require('../../components/login.jsx').LoginLink;
var ModalAddOrChangeYourClub = require('../../components/modal-clubs.jsx');
var ModalRemoveYourClub = require('../../components/modal-clubs-remove.jsx');
var Illustration = require('../../components/illustration.jsx');
var ImageTag = require('../../components/imagetag.jsx');
var LinkAnchorSwap = require('../../components/link-anchor-swap.jsx');
var FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;


var Intro = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function(){
    return (
      <section className="intro intro-after-banner">
        <Illustration
          height={""} width={204}
          src1x="/img/pages/clubs/svg/icon-circle-clubs-form.svg"
          alt="">
          <h1>{this.context.intl.formatMessage({id: 'what_are_clubs_title'})}</h1>
          <p>{this.context.intl.formatMessage({id: 'what_are_clubs_message'})}</p>
        </Illustration>
      </section>
    )
  }
});


var WhyOrganize = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function(){
    return (
     <section>
       <section className="center-block">
         <h1>{this.context.intl.formatMessage({id: 'why_mozilla_clubs_title'})}</h1>
         <p>{this.context.intl.formatMessage({id: 'why_mozilla_clubs_message'})}</p>
       </section>
       <ul className="icon-list">
         <li className="icon-airplane">
           <FormattedHTMLMessage id='why_mozilla_clubs_interest_based_message' />
         </li>
         <li className="icon-book">
           <FormattedHTMLMessage id='why_mozilla_clubs_curriculum_message' />
         </li>
         <li className="icon-ribbon">
           <FormattedHTMLMessage id='why_mozilla_clubs_practices_message' />
         </li>
         <li className="icon-institution">
           <FormattedHTMLMessage id='why_mozilla_clubs_engagement_message' />
         </li>
       </ul>
     </section>
    )
  }
});

var ElementsOfClub = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function(){
    return (
      <section>
       <section className="center-block">
         <h1>{this.context.intl.formatMessage({id: 'elements_of_mozilla_club_title'})}</h1>
         <p>{this.context.intl.formatMessage({id: 'elements_of_mozilla_club_message'})}</p>
       </section>
       <ul className="elements-of-club">
         <li>
           <div className="image clubs-members"></div>
           <h1>{this.context.intl.formatMessage({id: 'recruit_members_title'})}</h1>
           <p>{this.context.intl.formatMessage({id: 'recruit_members_message'})}</p>
           <a className="secondary-button" href="https://d157rqmxrxj6ey.cloudfront.net/carot/26274/">{this.context.intl.formatMessage({id: 'see_example_link'})}</a>
         </li>
         <li>
           <div className="image clubs-venue"></div>
           <h1>{this.context.intl.formatMessage({id: 'find_venue_title'})}</h1>
           <p>
             <FormattedHTMLMessage id='find_venue_message' />
           </p>
           <a className="secondary-button" href="https://thimbleprojects.org/juliavallera/70909/">{this.context.intl.formatMessage({id: 'see_example_link'})}</a>
         </li>
         <li>
           <div className="image clubs-plan"></div>
           <h1>{this.context.intl.formatMessage({id: 'recruit_memebers_title'})}</h1>
           <p>{this.context.intl.formatMessage({id: 'recruit_memebers_message'})}</p>
           <a className="secondary-button" href="https://iteachtheweb.files.wordpress.com/2015/11/typical-session1.pdf">{this.context.intl.formatMessage({id: 'see_example_link'})}</a>
         </li>
       </ul>
      </section>
    )
  }
});

var FeaturedUpdates = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function(){
    return (
      <section>
        <h1 className="center-title">{this.context.intl.formatMessage({id: 'featured_updates_title'})}</h1>

        <ul className="featured-updates row">
          <li className="col-md-4">
            <div className="box">
              <h3>{this.context.intl.formatMessage({id: 'featured_case_study_title'})}</h3>
              <h1><a href="https://thimbleprojects.org/juliavallera/70909/">{this.context.intl.formatMessage({id: 'mozilla_club_lookout_hill_update_title'})}</a></h1>
              <p>{this.context.intl.formatMessage({id: 'mozilla_club_lookout_hill_update_message'})}</p>
            </div>
          </li>
          <li className="col-md-4">
            <div className="box">
              <h3>{this.context.intl.formatMessage({id: 'featured_report_title'})}</h3>
              <h1><a href="https://thimbleprojects.org/amira/72705/">{this.context.intl.formatMessage({id: 'leadership_training_update_title'})}</a></h1>
              <p>{this.context.intl.formatMessage({id: 'leadership_training_update_message'})}</p>
            </div>
          </li>
          <li className="col-md-4">
            <div className="box">
              <h3>{this.context.intl.formatMessage({id: 'featured_resource_title'})}</h3>
              <h1><a href="http://mozilla.github.io/learning-networks/clubs/difficult-discussions/#introduction">{this.context.intl.formatMessage({id: 'difficult_discussions_update_title'})}</a></h1>
              <p>{this.context.intl.formatMessage({id: 'difficult_discussions_update_message'})}</p>
            </div>
          </li>
        </ul>
      </section>
    )
  }
});

var ClubsPage = React.createClass({
  statics: {
    teachAPIEvents: {
      'clubs:change': 'forceUpdate',
      'username:change': 'forceUpdate'
    },
    pageTitle: "Clubs",
    pageClassName: "clubs"
  },
  contextTypes: {
    location: React.PropTypes.object,
    intl: React.PropTypes.object
  },
  componentWillMount: function() {
    fixLocation(this.context.location);
  },
  componentDidMount: function() {
    this.props.teachAPI.updateClubs();
    if (this.context.location.search.modal === 'add') {
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
    this.props.showModal(ModalRemoveYourClub, {
      url: url,
      name: clubName
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
        <div className="inner-container">
          <Intro></Intro>
          <WhyOrganize></WhyOrganize>
          <ElementsOfClub></ElementsOfClub>
          <FeaturedUpdates></FeaturedUpdates>
          <section>
            <h1 className="center-title">
              {this.context.intl.formatMessage({id: 'where_are_clubs_title'})}
            </h1>
            <div className="mapDiv" id="mapDivID">
              <Map ref="map" className="mapDivChild"
               clubs={clubs}
               username={username}
               onDelete={this.handleClubDelete}
               onEdit={this.handleClubEdit}/>
            </div>
            <div className="middle-button">
              <Link to={"/" + this.context.intl.locale + "/clubs/list/"} className="secondary-button">
                {this.context.intl.formatMessage({id: 'view_clubs_list_link'})}
              </Link>
            </div>
          </section>
        </div>
      </div>
    );
  }
});

module.exports = withTeachAPI(ClubsPage);
