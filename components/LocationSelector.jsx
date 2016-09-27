var React = require('react');
var Select = require('react-select');
var Map = require('../components/map.jsx');

var LocationSelector = React.createClass({
  getInitialState: function() {
    return {
      location: null
    };
  },
  render: function() {
    return (
      <Select
       disabled={this.props.disabled}
       placeholder={this.props.placeholder || "Type in a city or a country"}
       className={this.props.className}

       // We need to provide undefined instead of an empty
       // string in order for the placeholder text to show.
       value={this.state.location || undefined}

       // Even though we are not using multi={true}, the Select
       // component seems to split on the default multi delimiter,
       // which is ",". Since that delimiter appears in every
       // location string (e.g. "Brooklyn, NY US"), we want to
       // set it to something that never appears.
       delimiter={this.props.delimited || "|"}

       // We do not want any suggestions auto-loaded until
       // the user starts typing. Aside from that, though, tests
       // fail w/ a React Invariant Violation if we do not
       // disable this feature.
       autoload={this.props.autoload || false}

       // The Mapbox geocoding service is automatically filtering
       // out irrelevant results for us, so show all autocomplete
       // options. Otherwise the default filtering
       // algorithm will actually cull out valid options!
       filterOption={function() { return true; }}

       asyncOptions={Map.getAutocompleteOptions}
       onChange={this.handleLocationChange}
      />
    );
  },

  handleLocationChange: function(newValue) {
    try {
      newValue = JSON.parse(newValue);
    } catch (e) {
      newValue = {
        location: '',
        latitude: null,
        longitude: null
      };
    }
    this.setState(newValue);
    this.props.onChange(newValue);
  },
});

module.exports = LocationSelector;
