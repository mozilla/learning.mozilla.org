var _ = require('underscore');
var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;
var Select = require('react-select');

var Page = require('../components/page.jsx');
var HeroUnit = require('../components/hero-unit.jsx');
var Map = require('../components/map.jsx');
var Blockquote = require('../components/blockquote.jsx');
var IconLinks = require('../components/icon-links.jsx');
var IconLink = require('../components/icon-link.jsx');
var PageEndCTA = require('../components/page-end-cta.jsx');
var Modal = require('../components/modal.jsx');
var ModalManagerMixin = require('../mixins/modal-manager');
var TeachAPIClientMixin = require('../mixins/teach-api-client');
var ga = require('../lib/googleanalytics.js');

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
      <div className="row list-with-illust">
        <div className="col-sm-4 col-md-4 col-lg-4">
          <img src="/img/icon-how-do-clubs-work.svg" alt="icon how do web clubs work" />
        </div>
        <div className="col-sm-8 col-md-8 col-lg-8">
          <h2>How do Web Clubs work?</h2>
          <ul>
            <li>Grow the web literary of leaners</li>
            <li>Meet regularly in classrooms, libraries, coffee shops &mdash; anywhere!</li>
            <li>Teach with open practices</li>
            <li>Guide people to learn by making</li>
            <li>Connect with local and global networks</li>
          </ul>
        </div>
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
              imgSrc="/img/mikko-finland@1x.png" imgSrc2x="/img/mikko-finland@2x.png" imgAlt="Mikko Finland Quote">

            <p>The idea of teachers and students learning at the same time is what makes me excited about this work.</p>
          </Blockquote>
        </div>
      </div>
    );
  }
});

var BottomCTA = React.createClass({
  render: function() {
    return(
      <div className="row">
        <div className="col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">
          <PageEndCTA linkTo={this.props.ctaLink}>
            <div>
              <img className="divider" src="/img/clubs-line-divider.svg" alt="line divider" />
              <p>Do you meet regularly with a group of learners to increase web literacy skills?</p>
              <a className="btn btn-awsm" onClick={this.props.onClick}>Add your club to the map</a>
            </div>
          </PageEndCTA>
        </div>
      </div>
    );
  }
});


var ModalAddOrChangeYourClub = React.createClass({
  mixins: [React.addons.LinkedStateMixin, ModalManagerMixin,
           Router.Navigation, TeachAPIClientMixin],
  propTypes: {
    // If club is provided, then we're a 'change' dialog, otherwise
    // we're an 'add' dialog.
    club: React.PropTypes.object,
    onSuccess: React.PropTypes.func.isRequired
  },
  statics: {
    teachAPIEvents: {
      'username:change': 'handleUsernameChange',
    }
  },
  STEP_AUTH: 1,
  STEP_FORM: 2,
  STEP_WAIT_FOR_NETWORK: 3,
  STEP_SHOW_RESULT: 4,
  getInitialState: function() {
    var clubState = {
      name: '',
      website: '',
      description: '',
      location: '',
      latitude: null,
      longitude: null
    };
    if (this.props.club) {
      _.extend(clubState, _.pick(this.props.club,
        'name', 'website', 'description', 'location', 'latitude',
        'longitude'
      ));
    }
    return _.extend(clubState, {
      step: this.getStepForAuthState(!!this.getTeachAPI().getUsername()),
      result: null,
      networkError: false
    });
  },
  getStepForAuthState: function(isLoggedIn) {
    return isLoggedIn ? this.STEP_FORM : this.STEP_AUTH;
  },
  handleUsernameChange: function(username) {
    this.setState({step: this.getStepForAuthState(!!username)});
  },
  handleLocationChange: function(newValue) {
    try {
      newValue = JSON.parse(newValue);
    } catch (e) {
      newValue = {
        location: '',
        latitude: null,
        longitude: null
      };
    }
    this.setState(newValue);
  },
  handleSubmit: function(e) {
    var teachAPI = this.getTeachAPI();
    var clubState = _.pick(this.state,
      'name', 'website', 'description', 'location', 'latitude', 'longitude'
    );
    e.preventDefault();

    if (!this.state.location) {
      window.alert("Please provide a location for your club.");
      return;
    }

    this.setState({
      step: this.STEP_WAIT_FOR_NETWORK,
      networkError: false
    });
    if (this.props.club) {
      clubState = _.extend({}, this.props.club, clubState);
      teachAPI.changeClub(clubState, this.handleNetworkResult);
    } else {
      teachAPI.addClub(clubState, this.handleNetworkResult);
    }
  },
  handleNetworkResult: function(err, data) {
    if (!this.isMounted()) {
      return;
    }
    this.setState({
      networkError: !!err,
      step: err ? this.STEP_FORM : this.STEP_SHOW_RESULT,
      result: err ? null : data
    });
  },
  handleSuccessClick: function() {
    this.hideModal();
    this.props.onSuccess(this.state.result);
  },
  handleJoinClick: function() {
    this.hideModal();
    this.transitionTo('join');
  },
  render: function() {
    var content, isFormDisabled;
    var isAdd = !this.props.club;
    var action = isAdd ? "add" : "change";
    var modalTitle = isAdd ? "Add Your Club To The Map"
                           : "Change Your Club";

    if (this.state.step == this.STEP_AUTH) {
      content = (
        <div>
          <p>Before you can {action} your club, you need to log in.</p>
          <button className="btn btn-primary btn-block"
           onClick={this.getTeachAPI().startLogin}>Log In</button>
          <button className="btn btn-default btn-block"
           onClick={this.handleJoinClick}>Create an account</button>
        </div>
      );
    } else if (this.state.step == this.STEP_FORM ||
               this.state.step == this.STEP_WAIT_FOR_NETWORK) {
      isFormDisabled = (this.state.step == this.STEP_WAIT_FOR_NETWORK);
      content = (
        <div>
          {this.state.networkError
           ? <div className="alert alert-danger">
               <p>Unfortunately, an error occurred when trying to {action} your club.</p>
               <p>Please try again later.</p>
             </div>
           : null}
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <label>What is the name of your Club?</label>
              <input type="text" placeholder="We love creative Club names"
               disabled={isFormDisabled}
               required
               valueLink={this.linkState('name')} />
            </fieldset>
            <fieldset>
              <label>Where does it take place?</label>
              <Select
               disabled={isFormDisabled}
               placeholder="Type in a city or a country"

               // We need to provide undefined instead of an empty
               // string in order for the placeholder text to show.
               value={this.state.location || undefined}

               // Even though we are not using multi={true}, the Select
               // component seems to split on the default multi delimiter,
               // which is ",". Since that delimiter appears in every
               // location string (e.g. "Brooklyn, NY US"), we want to
               // set it to something that never appears.
               delimiter="|"

               // We do not want any suggestions auto-loaded until
               // the user starts typing. Aside from that, though, tests
               // fail w/ a React Invariant Violation if we do not
               // disable this feature.
               autoload={false}

               asyncOptions={Map.getAutocompleteOptions}
               onChange={this.handleLocationChange} />
            </fieldset>
            <fieldset>
              <label>What is your Club&lsquo;s website?</label>
              <input type="url" placeholder="http://www.myclubwebsite.com"
               disabled={isFormDisabled}
               valueLink={this.linkState('website')} />
            </fieldset>
            <fieldset>
              <label>What do you focus your efforts on?</label>
              <textarea rows="5" placeholder="Give us a brief description about what your Club is about."
               disabled={isFormDisabled}
               required
               valueLink={this.linkState('description')} />
            </fieldset>
            <input type="submit" className="btn"
             disabled={isFormDisabled}
             value={isFormDisabled
                    ? (isAdd ? "Adding Your Club..."
                             : "Changing Your Club...")
                    : modalTitle} />
          </form>
        </div>
      );
    } else if (this.state.step == this.STEP_SHOW_RESULT) {
      content = (
        <div className="text-center">
          <p><img className="globe" src="/img/globe-with-pin.svg"/></p>
          {isAdd
           ? <div>
               <h2>We've added your Club!</h2>
               <p>Your club is now displayed on our map. Go ahead, take a look!</p>
             </div>
           : <h2>Your club has been changed.</h2>}
          <button className="btn btn-block"
           onClick={this.handleSuccessClick}>
            Take Me To My Club
          </button>
        </div>
      );
    }

    return(
      <Modal modalTitle={modalTitle}>
        {content}
      </Modal>
    );
  }
});


var ModalLearnMore = React.createClass({
  handleSubmit: function(e) {

    // Once this is wired up, the GA tracking should be fired after validation
    ga.event({ category: 'Enquiries', action: 'Request to Find Out More' });

    e.preventDefault();
    window.alert("Sorry, this functionality has not yet been implemented.");
  },
  render: function() {
    return(
      <Modal modalTitle="Learn More About Hive Learning Clubs">
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <label>What is your first name?</label>
            <input type="text" placeholder="We're a friendly bunch, promise!" />
          </fieldset>
          <fieldset>
            <label>Where does it take place?</label>
            <input type="text" placeholder="Type in a city or a country" />
          </fieldset>
          <fieldset>
            <label>What is your e-mail?</label>
            <p className="small">A member of our team will personally reach out to you.</p>
            <input type="email" placeholder="email@example.com" />
          </fieldset>
          <input type="submit" className="btn" value="Find Out More" />
        </form>
      </Modal>
    );
  }
});


var ClubsPage = React.createClass({
  mixins: [ModalManagerMixin, TeachAPIClientMixin],
  statics: {
    ModalAddOrChangeYourClub: ModalAddOrChangeYourClub,
    ModalLearnMore: ModalLearnMore,
    teachAPIEvents: {
      'clubs:change': 'forceUpdate',
      'username:change': 'forceUpdate'
    },
    pageClassName: "clubs"
  },
  componentDidMount: function() {
    this.getTeachAPI().updateClubs();
  },
  showAddYourClubModal: function() {
    this.showModal(ModalAddOrChangeYourClub, {
      onSuccess: this.handleAddClubSuccess
    });
  },
  showLearnMoreModal: function() {
    this.showModal(ModalLearnMore);
  },
  handleAddClubSuccess: function(club) {
    this.refs.map.focusOnClub(club);
  },
  handleClubDelete: function(url, clubName) {
    var confirmed = window.confirm(
      "Are you sure you want to delete the club \"" + clubName + "\"? " +
      "This action cannot be undone!"
    );
    if (!confirmed) {
      return;
    }
    this.getTeachAPI().deleteClub(url, function(err) {
      if (err) {
        console.log(err);
        window.alert("An error occurred! Please try again later.");
      }
      window.alert("Your club has been removed.");
    });
  },
  handleClubEdit: function(url) {
    var club = _.findWhere(this.getTeachAPI().getClubs(), {
      url: url
    });
    this.showModal(ModalAddOrChangeYourClub, {
      club: club,
      onSuccess: this.handleAddClubSuccess
    });
  },
  render: function() {
    var teachAPI = this.getTeachAPI();
    var clubs = teachAPI.getClubs();
    var username = teachAPI.getUsername();

    return (
      <div>
        <HeroUnit image="/img/hero-clubs.jpg">
          <h1>Mozilla Web Clubs</h1>
          <div><a className="btn btn-awsm" onClick={this.showAddYourClubModal}>Add Your Club</a></div>
          <div><p className="learn-more">or <a onClick={this.showLearnMoreModal}>find out more</a> about us</p></div>
        </HeroUnit>
        <section>
          <WebLitMap/>
          <div className="mapDiv" id="mapDivID">
            <Map ref="map" className="mapDivChild"
             clubs={clubs}
             username={username}
             onDelete={this.handleClubDelete}
             onEdit={this.handleClubEdit}/>
          </div>
        </section>
        <section>
          <HowClubWorks/>
        </section>
        <section>
          <Quote/>
        </section>
        <section>
          <IconLinks>
            <IconLink
              linkTo="fixme"
              imgSrc="/img/icon-curriculum.svg"
              imgAlt="icon curriculum"
              head="Curriculum"
              subhead="Modular Web Literacy curriculum"
            />
            <IconLink
              linkTo="fixme"
              imgSrc="/img/icon-connect.svg"
              imgAlt="icon connect"
              head="Connect"
              subhead="Connect with other Club Leaders"
            />
            <IconLink
              linkTo="fixme"
              imgSrc="/img/icon-tips.svg"
              imgAlt="icon tips"
              head="Helpful Tips"
              subhead="Tips for running your Club"
            />
          </IconLinks>
        </section>
        <section>
          <BottomCTA onClick={this.showAddYourClubModal} />
        </section>
      </div>
    );
  }
});

module.exports = ClubsPage;
