import React from 'react';
import HeroUnit from '../../components/hero-unit.jsx';
import { FormattedHTMLMessage } from 'react-intl';

var EventsHeader = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function() {

    return (
      <HeroUnit>
        <h1>
          {this.context.intl.formatMessage({id: 'join_maker_party'})}
        </h1>
        <h1>
          {this.context.intl.formatMessage({id: 'make_a_diff'})}
        </h1>
        <div>
          <a href="#" className="btn">
            {this.context.intl.formatMessage({id: 'get_started'})}
          </a>
        </div>
        <div>
          <FormattedHTMLMessage
            id="already_have_event"
          />
        </div>
      </HeroUnit>
    );
  }
});

module.exports = EventsHeader;
