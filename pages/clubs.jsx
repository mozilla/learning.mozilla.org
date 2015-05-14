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
var LoginLink = require('../components/login.jsx').LoginLink;
var ga = require('react-ga');

var Illustration = require('../components/illustration.jsx');

var ClubListItem = React.createClass({
  propTypes: {
    club: React.PropTypes.object.isRequired,
    username: React.PropTypes.string,
    onDelete: React.PropTypes.func.isRequired,
    onEdit: React.PropTypes.func.isRequired
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
        <h4>{clubName}</h4>
        <p><em>{club.location.split(',')[0]}</em></p>
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
    onDelete: React.PropTypes.func.isRequired,
    onEdit: React.PropTypes.func.isRequired
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
                                  onDelete={this.props.onDelete} />;
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
              imgSrc="/img/pages/clubs/mikko-finland.png" imgSrc2x="/img/pages/clubs/mikko-finland@2x.png" imgAlt="Mikko Finland Quote">

            <p>The idea of teachers and students learning at the same time is what makes me excited about this work.</p>
          </Blockquote>
        </div>
      </div>
    );
  }
});

var ModalRemoveYourClub = React.createClass({
  mixins: [ModalManagerMixin, Router.Navigation, TeachAPIClientMixin],
  propTypes: {
    url: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired
  },
  STEP_CONFIRM: 1,
  STEP_WAIT_FOR_NETWORK: 2,
  STEP_SHOW_RESULT: 3,
  getInitialState: function() {
    return {
      step: this.STEP_CONFIRM,
      networkError: null
    };
  },
  handleConfirm: function() {
    this.setState({
      step: this.STEP_WAIT_FOR_NETWORK,
      networkError: false
    });
    this.getTeachAPI().deleteClub(this.props.url, this.handleNetworkResult);
  },
  handleNetworkResult: function(err) {
    if (!this.isMounted()) {
      return;
    }
    this.setState({
      networkError: !!err,
      step: err ? this.STEP_CONFIRM : this.STEP_SHOW_RESULT
    });
  },
  render: function() {
    var content, isFormDisabled;

    if (this.state.step !== this.STEP_SHOW_RESULT) {
      isFormDisabled = (this.state.step === this.STEP_WAIT_FOR_NETWORK);
      content = (
        <div>
          {this.state.networkError
           ? <div className="alert alert-danger">
               <p>Unfortunately, an error occurred when trying to remove your club.</p>
               <p>Please try again later.</p>
             </div>
           : null}
          <p>Are you sure you want to remove your club <strong>{this.props.name}</strong>?</p>
          <button className="btn btn-primary btn-block"
           disabled={isFormDisabled}
           onClick={this.handleConfirm}>
             {isFormDisabled
              ? <span>Removing <strong>{this.props.name}</strong>&hellip;</span>
              : <span>Yes, remove <strong>{this.props.name}</strong></span>}
           </button>
        </div>
      );
    } else {
      content = (
        <div className="text-center">
          <p><img className="globe" src="/img/pages/clubs/svg/globe-without-pin.svg"/></p>
          <h2>Your club has been removed.</h2>
        </div>
      );
    }

    return (
      <Modal modalTitle="Remove Your Club">
        {content}
      </Modal>
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

var ModalAddOrChangeYourClub = React.createClass({
  mixins: [React.addons.LinkedStateMixin, ModalManagerMixin,
           TeachAPIClientMixin],
  contextTypes: {
    router: React.PropTypes.func
  },
  propTypes: {
    // If club is provided, then we're a 'change' dialog, otherwise
    // we're an 'add' dialog.
    club: React.PropTypes.object,
    idPrefix: React.PropTypes.string,
    onSuccess: React.PropTypes.func.isRequired
  },
  getDefaultProps: function() {
    return {
      idPrefix: 'ModalAddOrChangeYourClub_'
    };
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
      networkError: false,
      validationErrors: []
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
    var clubState = normalizeClub(_.pick(this.state,
      'name', 'website', 'description', 'location', 'latitude', 'longitude'
    ));
    var validationErrors = validateClub(clubState);
    e.preventDefault();

    if (validationErrors.length) {
      this.setState({validationErrors: validationErrors});
      return;
    }

    this.setState({
      step: this.STEP_WAIT_FOR_NETWORK,
      networkError: false,
      validationErrors: []
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
  renderValidationErrors: function() {
    if (this.state.validationErrors.length) {
      return (
        <div className="alert alert-danger">
          <p>Unfortunately, your submission has some problems:</p>
          <ul>
          {this.state.validationErrors.map(function(text,i) {
            return <li key={i}>{text}</li>;
          })}
          </ul>
        </div>
      );
    }
  },
  render: function() {
    var content, isFormDisabled;
    var isAdd = !this.props.club;
    var action = isAdd ? "add" : "change";
    var modalTitle = isAdd ? "Add Your Club To The Map"
                           : "Change Your Club";
    var idPrefix = this.props.idPrefix;

    if (this.state.step == this.STEP_AUTH) {
      content = (
        <div>
          <p>Before you can {action} your club, you need to log in.</p>
          <LoginLink callbackSearch="?modal=add" className="btn btn-primary btn-block">Log In</LoginLink>
          <LoginLink callbackSearch="?modal=add" action="signup" className="btn btn-default btn-block">Create an account</LoginLink>
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
          {this.renderValidationErrors()}
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <label htmlFor={idPrefix + "name"}>What is the name of your Club?</label>
              <input type="text" id={idPrefix + "name"} placeholder="We love creative Club names"
               disabled={isFormDisabled}
               required
               valueLink={this.linkState('name')} />
            </fieldset>
            <fieldset>
              <label>Where are you located?</label>
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

               // The Mapbox geocoding service is automatically filtering
               // out irrelevant results for us, so show all autocomplete
               // options. Otherwise the default filtering
               // algorithm will actually cull out valid options!
               filterOption={function() { return true; }}

               asyncOptions={Map.getAutocompleteOptions}
               onChange={this.handleLocationChange} />
            </fieldset>
            <fieldset>
              <label htmlFor={idPrefix + "website"}>What is your Club&lsquo;s website?</label>
              <input type="text" placeholder="www.myclubwebsite.com"
               id={idPrefix + "website"}
               disabled={isFormDisabled}
               valueLink={this.linkState('website')} />
            </fieldset>
            <fieldset>
              <label htmlFor={idPrefix + "description"}>What do you focus your efforts on?</label>
              <textarea rows="5" placeholder="Please provide a brief description of your Club."
               id={idPrefix + "description"}
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
          <p><img className="globe" src="/img/pages/clubs/svg/globe-with-pin.svg"/></p>
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

var ClubsPage = React.createClass({
  mixins: [ModalManagerMixin, TeachAPIClientMixin],
  contextTypes: {
    router: React.PropTypes.func
  },
  statics: {
    normalizeClub: normalizeClub,
    validateClub: validateClub,
    ClubList: ClubList,
    ModalAddOrChangeYourClub: ModalAddOrChangeYourClub,
    ModalRemoveYourClub: ModalRemoveYourClub,
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
      onSuccess: this.handleAddClubSuccess
    });
  },
  handleAddClubSuccess: function(club) {
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
      onSuccess: this.handleAddClubSuccess
    });
  },
  render: function() {
    var teachAPI = this.getTeachAPI();
    var clubs = teachAPI.getClubs();
    var username = teachAPI.getUsername();

    return (
      <div>
        <HeroUnit image="/img/pages/clubs/hero-clubs.png"
                  image2x="/img/pages/clubs/hero-clubs@2x.png">
          <h1>Mozilla Clubs</h1>
          <div><a className="btn btn-awsm" onClick={this.showAddYourClubModal}>Add Your Club</a></div>
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
            <ClubList
             clubs={clubs}
             username={username}
             onDelete={this.handleClubDelete}
             onEdit={this.handleClubEdit}/>
          </section>
          <section>
            <Quote/>
          </section>
          <section>
            <IconLinks>
              <IconLink
                linkTo="clubs-curriculum"
              imgSrc="/img/pages/clubs/svg/icon-curriculum.svg"
                imgAlt="icon curriculum"
                head="Curriculum"
                subhead="Modular Web Literacy curriculum"
              />
              <IconLink
                href="http://discourse.webmaker.org/category/meet"
                imgSrc="/img/pages/clubs/svg/icon-connect.svg"
                imgAlt="icon connect"
                head="Connect"
                subhead="Connect with other Club Leaders"
              />
              <IconLink
                linkTo="clubs-toolkit"
                imgSrc="/img/pages/clubs/svg/icon-tips.svg"
                imgAlt="icon tips"
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
