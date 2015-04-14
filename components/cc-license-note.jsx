var React = require('react');

var CCLicenseNote = React.createClass({
  render: function() {
    return (
      <p className="CC-license-note">All featured content, unless otherwise noted, is covered under the <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA license</a>.</p>
    );
  }
});

module.exports = CCLicenseNote;
