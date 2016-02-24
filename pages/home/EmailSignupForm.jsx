var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var validateSignupForm = require('./validateSignupForm');
var _ = require('underscore');

var EmailSignupForm = React.createClass({
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

    if (process.env.NODE_ENV !== 'production' && !process.env.NEWSLETTER_MAILINGLIST_URL) {
      e.preventDefault();
      alert("NEWSLETTER_MAILINGLIST_URL is not defined. Simulating a successful newsletter signup now.");
      window.location = "?signup=thanks";
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
      <form className="mailinglist-signup" action={process.env.NEWSLETTER_MAILINGLIST_URL} method="POST" onSubmit={this.handleSubmit}>
        <fieldset>
          <label htmlFor={idPrefix+"email"} className="sr-only">email</label>
          <div className="icon-field-container">
            <i className="fa fa-envelope"></i>
            <input id={idPrefix+"email"} name="email" type="email" size="30" placeholder="email@example.com" valueLink={this.linkState("email")} required />
          </div>
          <label htmlFor={idPrefix+"privacy"} className="sr-only">
            I'm okay with you handling this info as you explain in your <a href="https://www.mozilla.org/en-US/privacy/websites/">privacy policy</a>
          </label>
          <input id={idPrefix+"privacy"} name={process.env.NEWSLETTER_MAILINGLIST_PRIVACY_NAME} type="checkbox" className="sr-only" checked readOnly required />
          <p className="pp-note">
            &#10003; I'm okay with you handling this info as you explain in your <a href="https://www.mozilla.org/en-US/privacy/websites/">privacy policy</a>.
          </p>
          {this.renderValidationErrors()}
        </fieldset>
        <input type="submit" value="Sign Up" className="btn btn-awsm center-block" />
      </form>
    )
  }
});

module.exports = EmailSignupForm;
