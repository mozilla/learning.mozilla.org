var React = require('react');
var ReactDOM = require('react-dom');
var Illustration = require('../../components/illustration.jsx');
var Login = require('../../components/login');

var withTeachAPI = require('../../hoc/with-teach-api.jsx');

var ProgressBar = require('./ProgressBar.jsx');
var StepOne = require('./StepOne.jsx');
var StepTwo = require('./StepTwo.jsx');
var StepThree = require('./StepThree.jsx');

var STEP_AUTH = 1;
var STEP_FORM = 2;
var STEP_WAIT_FOR_NETWORK = 4;
var STEP_SHOW_RESULT = 16;


var ClubForm = React.createClass({
  getInitialState: function() {
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
    return [
      <StepOne   key="step1" ref="step1" onChange={this.updateProgress} hidden={this.state.currentStep !== 0 }/>,
      <StepTwo   key="step2" ref="step2" onChange={this.updateProgress} hidden={this.state.currentStep !== 1 }/>,
      <StepThree key="step3" ref="step3" hidden={this.state.currentStep !== 2 }/>,
      this.generateButtons()
    ];
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

  generateButtons: function() {
    if (this.state.currentStep === 2) return null;

    var buttons = [];
    if (this.state.currentStep > 0) {
      buttons.push(
        <button key={'back'} className="back btn" disabled={this.state.submitting} onClick={!this.state.submitting && this.prevStep}>Back</button>
      );
    }

    var buttonClass = 'btn';
    var buttonLabel = 'Next';
    if (this.state.currentStep === 1) {
      buttonLabel = "Submit";
    }
    if (this.state.submitting) {
      buttonClass += ' submitting';
      buttonLabel = 'Submitting...';
    }

    buttons.push(
      <button key={'continue'} className={buttonClass} disabled={this.state.submitting} onClick={!this.state.submitting && this.nextStep}>{buttonLabel}</button>
    );

    return (
      <div key="buttons" className="proceed">
        <div>{buttons}</div>
        { (this.state.currentStep < 2) ? <ProgressBar value={this.state.progress}/> : null }
      </div>
    );
  },

  updateProgress: function() {
    var r1 = this.refs.step1;
    var r2 = this.refs.step2;
    if (!r1 || !r2) return 0;
    var total = r1.getTotal() + r2.getTotal();
    var filled = r1.getFilled() + r2.getFilled();
    var percent = (100*filled/total) | 0;
    this.setState({ progress: percent });
  },

  prevStep: function() {
    this.setState({
      currentStep: Math.max(this.state.currentStep - 1, 0)
    });
  },

  nextStep: function() {
    var refname = 'step' + (this.state.currentStep+1);
    var curRef = this.refs[refname];
    var validates = curRef.validates();
    if (validates) {
      var nextStep = Math.min(this.state.currentStep + 1, 2);
      var goToNext = function() {
        this.setState({ currentStep: nextStep });
      }.bind(this);
      if (this.state.currentStep == 1) {
        this.submitForm(goToNext);
      } else {
        goToNext();
      }
    }
  },

  submitForm: function(next) {
    var teachAPI = this.props.teachAPI;

    // new form data as object

    var clubState = this.getClubData();
    clubState.longitude = clubState.location.longitude;
    clubState.latitude = clubState.location.latitude;
    clubState.location = clubState.location.location;

    // send to Teach-API and wait for response via the callback
    var networkHandler = this.handleNetworkResult;
    this.setState({
      submitting: true,
      step: this.STEP_WAIT_FOR_NETWORK,
      networkError: false,
    }, function() {
      teachAPI.addClub(clubState, function(err, data) {
       networkHandler(err, data, next);
      });
    });
  },

  handleNetworkResult: function(err, data, next) {
    if (err) {
      // FIXME: TODO: we can deal with this more gracefully
      console.log("handleNetworkResult", err, data);
    }

    this.setState({
      networkError: !!err,
      step: err ? this.STEP_FORM : this.STEP_SHOW_RESULT,
      result: err ? null : data
    }, function() {
      if (!err) next();
    });
  },

  getClubData: function() {
    var r1 = this.refs.step1;
    var r2 = this.refs.step2;
    if (!r1 || !r2) return 0;
    return Object.assign({}, r1.getClubData(), r2.getClubData());
  }
});

module.exports = withTeachAPI(ClubForm);
