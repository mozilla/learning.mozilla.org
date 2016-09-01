import React from 'react';
import { Link } from 'react-router';

var EventsNav = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function() {

    return (
      <div className="inner-container">
        <div className="mui-tab-switcher">
          <div className="tabs">
            <Link className="btn" activeClassName="active" to={"/" + this.context.intl.locale + "/events"}>
              {this.context.intl.formatMessage({id: 'overview'})}
            </Link>
            <Link className="btn" activeClassName="active" to={"/" + this.context.intl.locale + "/events/resources"}>
              {this.context.intl.formatMessage({id: 'host_resources'})}
            </Link>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = EventsNav;
