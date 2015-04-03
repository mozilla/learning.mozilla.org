var React = require('react');

var OAuth2Callback = React.createClass({

  mixins: [
    require('../lib/teach-api')
  ],

  // The only thing this page does is take in the callback arguments,
  // and verify they are in fact valie. If so, the teach-api function
  // for continued login should redirect the user once authenticated
  // or rejected.
  componentDidMount: function() {
    this.getTeachAPI().continueLogin();
    ga.event({ category: 'Login', action: 'Continue Login' });
  },

  render: function() {
    return <div>validating oauth2 callback information...</div>;
  }
});

module.exports = OAuth2Callback;
