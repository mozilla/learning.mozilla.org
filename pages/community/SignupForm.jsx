var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var validateSignupForm = require('./validateSignupForm');

var SignupForm = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function() {
    return {
      email: "",
      validationErrors: []
    };
  },
  handleSubmit: function(e) {
    var validationErrors = validateSignupForm(_.pick(this.state,"email"));

    if (validationErrors.length) {
      e.preventDefault();
      this.setState({validationErrors: validationErrors});
      return;
    }

    if (process.env.NODE_ENV !== 'production' &&
        !process.env.PLEDGE_MAILINGLIST_URL) {
      e.preventDefault();
      alert("PLEDGE_MAILINGLIST_URL is not defined. Simulating " +
            "a successful pledge signup now.");
      window.location = "?pledge=thanks";
    }
  },
  renderValidationErrors: function() {
    if (this.state.validationErrors.length) {
      return (
        <div className="alert alert-danger" role="alert">
          <p className="error-msg">Please enter an email address.</p>
        </div>
      );
    }
  },
  render: function() {
    var idPrefix = this.props.idPrefix;
    return (
      <form className="mailinglist-signup" action={process.env.PLEDGE_MAILINGLIST_URL} method="POST" onSubmit={this.handleSubmit}>
        <fieldset>
          <label htmlFor={idPrefix+"email"} className="sr-only">email</label>
          <div className="icon-field-container">
            <i className="fa fa-envelope"></i>
            <input id={idPrefix+"email"} name="email" type="email" size="30" placeholder="email@example.com" valueLink={this.linkState("email")} required />
          </div>
          <label htmlFor={idPrefix+"privacy"} className="sr-only">I'm okay with you handling this info as you explain in your <a href="https://www.mozilla.org/en-US/privacy/websites/">privacy policy</a></label>
          <input id={idPrefix+"privacy"} name={process.env.PLEDGE_MAILINGLIST_PRIVACY_NAME} type="checkbox" className="sr-only" checked readOnly required />
          <p className="pp-note">&#10003; I'm okay with you handling this info as you explain in your <a href="https://www.mozilla.org/en-US/privacy/websites/">privacy policy</a>.</p>
          {this.renderValidationErrors()}
        </fieldset>
        <input type="submit" value="Sign Up" className="btn btn-awsm" />
      </form>
    )
  }
});

module.exports = SignupForm;
