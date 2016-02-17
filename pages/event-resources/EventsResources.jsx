var React = require('react');

var Tabs = require('./tabs.jsx');
var LogoAssets = require('./logoassets.jsx');
var eventItems = require('./eventitems.jsx');
var support = require('./support.jsx');

var PageLinker= require('./PageLinker.jsx');
var LogoAsset = require('./LogoAsset.jsx');
var Tabulator = require('./Tabulator.jsx');

var EventsResources = React.createClass({
  statics: {
    pageTitle: 'Event Resources',
    pageClassName: 'event-resources',
    LogoAsset: LogoAsset
  },
  render: function() {
    return (
      <div className="inner-container">
        <h1>Event Resources</h1>
        <p>Thank you for helping us celebrate webmaking around the world! These resources will help you plan a unique event tailored especially for your audience.</p>

        <div className="row">
          <ul className="caret-list">
            <PageLinker head="event guides" href="#event-guides"></PageLinker>
            <PageLinker head="logos & assets" href="#logo-assets"></PageLinker>
            <PageLinker head="event details" href="#event-details"></PageLinker>
            <PageLinker head="event support" href="#event-support"></PageLinker>
          </ul>
        </div>

        <h2 id="event-guides">Event Guides</h2>
        <p>No matter the size of your event, we have a guide for you.</p>

        {eventItems}

        <h2 id="logo-assets">Logos & Assets</h2>
        <p>Feel free to use these Maker Party graphics in any of you promotional materials:</p>

        {LogoAssets}

        <h2 id="event-details">Event Details</h2>
        <p>There are many details to consider when planning your event. Here's a list of what you need to know:</p>

        <Tabulator tabs={Tabs}/>

        <h2 id="event-support">Event Support</h2>
        <p>Get help from the community and our staff.</p>

        {support}

      </div>
    );
  }
});

module.exports = EventsResources;
