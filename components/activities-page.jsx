var React = require('react');

var PlaceholderPage = require('./placeholder-page.jsx');

var ActivitiesPage = React.createClass({
  statics: {
    pageClassName: 'teaching-materials'
  },
  render: function() {
    return <PlaceholderPage
      title="Teaching Activities"
      githubIssue={36}
    />;
  }
});

module.exports = ActivitiesPage;
