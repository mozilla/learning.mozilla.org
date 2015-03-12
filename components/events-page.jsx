var React = require('react');

var PlaceholderPage = require('./placeholder-page.jsx');

var EventsPage = React.createClass({
  statics: {
    pageClassName: 'events'
  },
  render: function() {
    return <PlaceholderPage
      title="Events"
      githubIssue={35}
    />;
  }
});

module.exports = EventsPage;
