var React = require('react');

var PlaceholderPage = require('./placeholder-page.jsx');

var AboutPage = React.createClass({
  statics: {
    pageClassName: ''
  },
  render: function() {
    return <PlaceholderPage
      title="About"
      githubIssue={99}
    />;
  }
});

module.exports = AboutPage;
