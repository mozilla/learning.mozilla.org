var React = require('react');
var ReactDOM = require('react-dom');
var Illustration = require('../../components/illustration.jsx');
var Login = require('../../components/login');

var withTeachAPI = require('../../hoc/with-teach-api.jsx');

var ProgressBar = require('./ProgressBar.jsx');

var Form = require('./form/builder/Form.jsx');
var MultiPageForm = require('./form/builder/MultiPageForm.jsx');
var SubmitConfirmation = require('./form/SubmitConfirmation.jsx');

var STEP_SENDING_RESULTS = 1;
var STEP_SHOW_RESULT = 2;

var ClubForm = React.createClass({
  statics: {
    pageTitle: "Apply to be a Club Captain",
    pageClassName: "clubs"
  },

  getInitialState: function() {
    this.clubData = {};
    return {
      loggedIn: false,
      isInterestedStudent: undefined,
      progress: 0,
      currentStep: 0,
      titles: [
        "Apply to Become a Club Captain",
        "Apply to Become a Club Captain",
        "Thanks for Applying!"
      ],
      headings: [
        'Tell us more about you!',
        'About your Club...',
        'You just took the first step on your journey toward becoming a Mozilla Club Captain. Please check your email for further information.'
      ],
      loginHeading: 'You must be signed in to fill in the Club Captain application form.'
    };
  },

  componentDidMount: function() {
    this.updateProgress();
  },

  setStudentAnswer: function(event, field, value) {
    this.setState({
      isInterestedStudent: value === `Yes`
    });
  },

  render: function() {
    var teachAPI = this.props.teachAPI;
    var username = teachAPI.getUsername();

    var studentData = {
      type: "choiceGroup",
      label: "Are you currently a university or college student interested in starting a club at your university/college?",
      options: [ "Yes", "No" ],
      validator: {
        error: "You must say whether or not you're currently a university or college student interested in starting a club at your university/college."
      }
    };

    return (
      <div className="inner-container">
        <div className="row deprecation-blurb">
          <div className="inner-container">
            <section>
              <h2><i className="fa fa-hand-o-right"></i> Important Update</h2>
              <p>Mozilla has made a strategic decision to sunset its local digital literacy programs including Hive and Mozilla Clubs over the course of 2017/2018. You have been, and will continue to be, leaders within this movement for Internet health, and Mozilla will continue to find ways to support you and concrete ways for people from our local communities to plug into this work. We will honor all current commitments to our grantee partners and donors. Content on this site, including curriculum and other resources, will continue to be available and archived here for your use. Visit <a href="https://foundation.mozilla.org">foundation.mozilla.org</a> for more information or contact <a href="mailto:mozillaclubs@mozillafoundation.org">mozillaclubs@mozillafoundation.org</a> with any further questions.</p>
            </section>
          </div>
        </div>
      </div>
    );
  },

  renderSteps: function() {
    if (this.state.step === STEP_SHOW_RESULT) {
      return <SubmitConfirmation />;
    }

    var step1 = require('./form/data/step-one');
    var intent = require('./form/data/intent');
    var step2generator = require('./form/data/step-two');
    var step2 = {};

    /*
      This is a form in two "parts", with the
      first part being a regular old fieldset
      that needs to be filled out before the
      user can move on to the next part, and
      the second part is a "controlled" form,
      meaning that the user needs to first
      fill in one or more fields before they
      are shown the rest of the form. In our
      case they need to fill in their intent
      before we should them the fields for
      either signing up for a new club, or
      signing up their existing club into the
      Mozilla clubs program.
    */

    step2[intent.start] = step2generator.getStartFields();
    step2[intent.integrate] = step2generator.getIntegrateFields();

    return (
      <MultiPageForm
        submitting={this.state.submitting}
        formdata={[
          step1,
          [ intent.fields, step2 ],
        ]}
        onProgress={this.updateProgress}
        onSubmit={this.submitForm}
      />
    );
  },

  renderLoginRequest: function() {
    return (
      <div className="login-request">
        <Login
          loginBaseURL={this.props.teachAPI.baseURL}
          currentPath={this.props.currentPath}
          loginClass="btn"
          signupLabel="Create an account"
          onLoginChange={this.onLoginChange}
        />
      </div>
    );
  },

  onLoginChange: function(loggedIn) {
    this.setState({ loggedIn });
  },

  updateProgress: function(progress) {
    // Placeholder function: we do not currently render the progress
  },

  submitForm: function(formData) {
    var teachAPI = this.props.teachAPI;
    var clubState = this.rewriteDataForTeachAPI(formData);

    this.setState({
      submitting: true,
      networkError: false,
      step: STEP_SENDING_RESULTS
    }, () => {
      teachAPI.addClub(clubState, (err, data) => {
        if (err) {
          this.setState({
            submitting: false,
            networkError: !!err,
            result: err ? null : data
          });
        } else {
          this.setState({
            submitting: false,
            step: STEP_SHOW_RESULT,
            result: data
          });
        }
      });
    });
  },

  // Massage the form data a little so that it matches the
  // model that we use in the TeachAPI. Particularly
  rewriteDataForTeachAPI: function(data) {
    data.longitude = data.location.longitude;
    data.latitude = data.location.latitude;
    data.location = data.location.location;

    var freq = data.frequency;

    if (freq === 'Other') { freq = data.frequencyOther; }

    data.frequency = freq;

    var age = data.ageRange.join(', ');

    if (data.ageRange.indexOf('Other')) {
      age = age.replace('Other', 'Other: ' + data.ageRangeOther);
    }

    data.age_range = age;

    data.club_size = data.clubSize;
    data.member_occupation = data.audienceType;
    data.club_topics = data.meetingSubjects;
    data.hosting_reason = data.hostReason;
    data.how_they_heard = data.howDidYouHear;

    data.regional_coordinator = (data.regionalCoordinator === "Yes") ? data.coordinatorName : "No";
    data.intent = (data.intent.indexOf('Integrate') > -1) ? "integrate" : "start";

    return data;
  }
});


module.exports = withTeachAPI(ClubForm);
