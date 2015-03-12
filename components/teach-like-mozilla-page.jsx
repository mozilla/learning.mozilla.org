var React = require('react');

var PlaceholderPage = require('./placeholder-page.jsx');

var TeachLikeMozillaPage = React.createClass({
  statics: {
    pageClassName: 'teach-like-mozilla'
  },
  render: function() {
    return <PlaceholderPage
      title="Teach Like Mozilla"
      githubIssue={37}
    />;
  }
});

module.exports = TeachLikeMozillaPage;
