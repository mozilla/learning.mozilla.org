var React = require('react');

var PlaceholderPage = require('./placeholder-page.jsx');

var FixmePage = React.createClass({
  render: function() {
    return <PlaceholderPage
      title="[FIXME] Reminder to fix your broken links"
    />;
  }
});

module.exports = FixmePage;
