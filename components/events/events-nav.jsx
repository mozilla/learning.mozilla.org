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
          <div className="mui-tabs">
            <Link className="mui-btn" activeClassName="mui-active" to={"/" + this.context.intl.locale + "/events"}>
              {this.context.intl.formatMessage({id: 'overview'})}
            </Link>
            <Link className="mui-btn" activeClassName="mui-active" to={"/" + this.context.intl.locale + "/events/resources"}>
              {this.context.intl.formatMessage({id: 'host_resources'})}
            </Link>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = EventsNav;
