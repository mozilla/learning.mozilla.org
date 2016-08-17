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
  getInitialState: function() {
    this.clubData = {};
    return {
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

  render: function() {
    var teachAPI = this.props.teachAPI;
    var username = teachAPI.getUsername();

    return (
      <div className="clubs-form">
        <div className="inner-container">
          <section className="intro intro-after-banner">
            <Illustration
              height={""} width={204}
              src1x="/img/pages/clubs/svg/icon-circle-clubs-form.svg"
              alt="">
              <h1>{ this.state.titles[this.state.currentStep] }</h1>
              <h2>{ username ? this.state.headings[this.state.currentStep] : this.state.loginHeading }</h2>
            </Illustration>
          </section>
          { username ? this.renderSteps() : this.renderLoginRequest() }
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
        />
      </div>
    );
  },

  updateProgress: function(progress) {
    // we do not currently render the progress
  },

  submitForm: function(formData) {
    var teachAPI = this.props.teachAPI;
    var clubState = formData;

    // Massage the form data a little so that it matches the
    // model that we use in the TeachAPI.

    clubState.longitude = clubState.location.longitude;
    clubState.latitude = clubState.location.latitude;
    clubState.location = clubState.location.location;

    var freq = clubState.frequency;

    if (freq === 'Other') { freq = clubState.frequencyOther; }

    clubState.frequency = freq;

    var age = clubState.ageRange.join(', ');

    if (clubState.ageRange.indexOf('Other')) {
      age = age.replace('Other', 'Other: ' + clubState.ageRangeOther);
    }

    clubState.age_range = age;

    clubState.club_size = clubState.clubSize;
    clubState.member_occupation = clubState.audienceType;
    clubState.club_topics = clubState.meetingSubjects;

    console.log(clubState);

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
  }
});


module.exports = withTeachAPI(ClubForm);
