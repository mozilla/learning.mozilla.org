var React = require('react');

var Pontoon = React.createClass({
  render: function() {
    if (process.env.ENABLE_PONTOON) {
      return (
        <script src='https://pontoon.mozilla.org/pontoon.js'></script>
      );
    }
    return null;
  }
});

module.exports = Pontoon;
