var React = require('react');
var LinkedStateMixin = require('react-addons-linked-state-mixin');
var _ = require('underscore');

var CredlyLinkForm = React.createClass({
  mixins: [LinkedStateMixin],
  getInitialState: function() {
    return {
      email: "",
      password: "",
      validationErrors: [],
      pending: false,
      addendum: ""
    };
  },

  handleSubmit: function(e) {
    // Get the values, and then immediately forget them so
    // they don't hang around in this component's state.
    var email = this.state.email;
    var password = this.state.password;
    this.setState({
      pending: true
    });
    var self = this;
    this.props.linkAccounts(email, password, function(err, result) {
      if (err) {
        self.setState({
          password: "",
          pending: false,
          addendum: <p>Our attempt to link to your account has failed. Please make sure you used the correct email and password, and try again.</p>
        });
        return false;
      } else {
        self.setState(self.getInitialState());
        self.props.hideModal();
        return true;
      }
    });
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
    var enabled = (!this.state.pending && this.state.email && this.state.password);
    return (
      <div>
        { this.state.addendum ? this.state.addendum : null}

        <fieldset>
          <label className="sr-only">email</label>
          <input name="email" type="email" size="30" placeholder="email@example.com" valueLink={this.linkState("email")} required />
        </fieldset>

        <fieldset>
          <label className="sr-only">password</label>
          <input name="password" type="password" size="30" valueLink={this.linkState("password")} required />
        </fieldset>

        <p className="pp-note">
          <i className="fa fa-checkmark"></i>
          I understand that I am creating a Credly account according to their <a href="https://credly.com/privacy">privacy policy</a> and <a href="https://credly.com/tos">terms of service</a>.
          Mozilla will be allowed to deal with Credly on my behalf, but will not store my Credly credentials.
        </p>

        <input type="submit" disabled={!enabled} className="btn btn-awsm center-block" onClick={this.handleSubmit} value="Link accounts"/>
      </div>
    );
  }
});

module.exports = CredlyLinkForm;
