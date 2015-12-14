var React = require('react');

var Select = require('react-select');
var _ = require('underscore');
var Modal = require('../components/modal.jsx');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var ModalManagerMixin = require('../mixins/modal-manager');
var TeachAPIClientMixin = require('../mixins/teach-api-client');
var LoginLink = require('../components/login.jsx').LoginLink;
var Map = require('../components/map.jsx');

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
  mixins: [LinkedStateMixin, ModalManagerMixin, TeachAPIClientMixin],
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
    normalizeClub: normalizeClub,
    validateClub: validateClub,
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
      hasReadFactSheet: false,
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

    if (!this.props.club && !this.state.hasReadFactSheet) {
      validationErrors.push("You must read the Mozilla Clubs Fact Sheet.");
    }

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
    var modalTitle = isAdd ? "Get matched with a Regional Coordinator"
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
          <p>We have a waiting list for Regional Coordinators. Fill out the information below, and we’ll match you as soon as we can.</p>
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <label htmlFor={idPrefix + "name"}>Who is your Mozilla Club affiliated with?</label>
              <input type="text" id={idPrefix + "name"} placeholder="Name of organization, school, group"
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
              <label htmlFor={idPrefix + "website"}>What is your Club&lsquo;s website?<span className="optional-text">optional</span></label>
              <input type="text" placeholder="www.myclubwebsite.com"
               id={idPrefix + "website"}
               disabled={isFormDisabled}
               valueLink={this.linkState('website')} />
            </fieldset>
            <fieldset>
              <label htmlFor={idPrefix + "description"}>How do you teach the Web?</label>
              <textarea rows="5" placeholder="Please provide a brief description of your Club activities."
               id={idPrefix + "description"}
               disabled={isFormDisabled}
               required
               valueLink={this.linkState('description')} />
            </fieldset>
            {isAdd ? <div className="checkbox">
              <label>
                <input type="checkbox"
                 disabled={isFormDisabled}
                 checkedLink={this.linkState('hasReadFactSheet')}
                 required /> I have read the <a href="http://mozilla.github.io/learning-networks/clubs/" target="_blank">Mozilla Clubs Fact Sheet</a>.
              </label>
            </div> : null}
            <input type="submit" className="btn"
             disabled={isFormDisabled}
             value={isFormDisabled
                    ? (isAdd ? "Submitting Your Club Application..."
                             : "Changing Your Club...")
                    : (isAdd ? "Apply"
                             : modalTitle )} />
          </form>
        </div>
      );
    } else if (this.state.step == this.STEP_SHOW_RESULT) {
      content = (
        <div className="text-center">
          <p><img className="globe" src="/img/pages/clubs/svg/globe-with-pin.svg"/></p>
          {isAdd
           ? <div>
               <h2>Thanks for your interest!</h2>
               <p>We&lsquo;ll be in touch when we start the next round. In the meantime, your Club will only be visible to you.</p>
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

module.exports = ModalAddOrChangeYourClub;
