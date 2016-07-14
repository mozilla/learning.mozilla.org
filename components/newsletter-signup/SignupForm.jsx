var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var request = require('superagent');
var _ = require('underscore');

var config = require('../../config/config');

var SignupForm = React.createClass({
  mixins: [LinkedStateMixin],
  propTypes: {
    sourceUrl: React.PropTypes.string.isRequired,
  },
  getInitialState: function() {
    return {
      email: "",
      validationErrorType: null
    };
  },
  handleSubmit: function(e) {
    e.preventDefault();

    if (process.env.NODE_ENV !== 'production' && !process.env.NEWSLETTER_MAILINGLIST_URL) {
      alert("NEWSLETTER_MAILINGLIST_URL is not defined. Simulating a successful newsletter signup now.");
      window.location = "?signup=thanks";
    }

    var self = this;
    request
      .post(process.env.NEWSLETTER_MAILINGLIST_URL)
      .type('form')
      .send({
        newsletters: 'mozilla-learning-network',
        source_url: encodeURIComponent(this.props.sourceUrl),
        lang: 'en',
        email: this.state.email,
        trigger_welcome: 'N'
      })
      .end(function(err, res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          self.setState({validationErrorType: null}, function() {
            window.location = config.ORIGIN+"?signup=thanks";
          });
        } else {
          // for basket error code references, 
          // see https://github.com/mozilla/basket-client/blob/master/basket/errors.py
          var basketErrorType = JSON.parse(res.text).code == 2 ? "email" : "other";
          self.setState( {validationErrorType: basketErrorType} );
        }
      });

  },
  renderValidationErrors: function() {
    var errorType = this.state.validationErrorType;
    var errorMsg = "There's been a problem with our system. Please try again later.";
    if (!errorType) return;
    if (errorType === "email") {
      errorMsg = "Please enter a valid email address";
    }
    return (
      <div className="alert alert-danger" role="alert">
        <p className="error-msg">{errorMsg}</p>
      </div>
    );
  },
  render: function() {
    var idPrefix = this.props.idPrefix;
    return (
      <form className="mailinglist-signup" action={process.env.NEWSLETTER_MAILINGLIST_URL} method="POST" onSubmit={this.handleSubmit}>
        <fieldset>
          <label htmlFor={idPrefix+"privacy"} className="sr-only">
            I'm okay with you handling this info as you explain in your <a href="https://www.mozilla.org/en-US/privacy/websites/">privacy policy</a>
          </label>
          <input id={idPrefix+"privacy"} type="checkbox" className="sr-only" checked readOnly required />
          <p className="pp-note">
            &#10003; I'm okay with you handling this info as you explain in your <a href="https://www.mozilla.org/en-US/privacy/websites/">privacy policy</a>.
          </p>
          <label htmlFor={idPrefix+"email"} className="sr-only">email</label>
          <div className="icon-field-container">
            <i className="fa fa-envelope"></i>
            <input id={idPrefix+"email"} name="email" type="email" size="30" placeholder="email@example.com" valueLink={this.linkState("email")} required />
          </div>
          {this.renderValidationErrors()}
        </fieldset>
        <input type="submit" value="Sign Up" className="btn center-block" />
      </form>
    )
  }
});

module.exports = SignupForm;
