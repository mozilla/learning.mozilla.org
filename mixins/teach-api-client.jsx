// FIXME: THE FOLLOWING IS THE DESCRIPTION OF WHEN THIS WAS STILL A MIXIN INSTEAD OF HOC

// TeachAPIClientMixin is a React mixin that can be used by any component
// that needs direct access to the Teach API.
//
// The component can access the Teach API via the getTeachAPI() method.
//
// If the component defines a static object called 'teachAPIEvents' like so:
//
// var Foo = React.createClass({
//   statics: {
//     teachAPIEvents: {
//       'logout': 'handleLogout'
//     }
//   }
//
// The mixin will ensure that the handleLogout() method is called whenever
// the 'logout' event occurs in the Teach API. The mixin takes care of
// unbinding the event listener when the component unmounts.

var React = require('react');
var TeachAPI = require('../lib/teach-api');

module.exports = function withTeachAPI(Component) {
  var displayName = Component.displayName;
  var events = Component.teachAPIEvents || {};
  var eventNames = Object.keys(events);

  return React.createClass({
    getInitialState: function() {
      return {
        teachAPI: this.props.teachAPI || new TeachAPI()
      };
    },

    // It seems the forceUpdate() method is not auto-bound to a component,
    // so we'll make our own wrapper here.
    _autoboundForceUpdate: function() {
      this.refs.component.forceUpdate();
    },

    componentDidMount: function() {
      eventNames.forEach(function(eventName) {
        var methodName = events[eventName];
        var method = this.refs.component[methodName];

        if (methodName === 'forceUpdate') {
          method = this._autoboundForceUpdate;
        }
        if (typeof(method) !== 'function') {
          return console.warn('method ' + displayName + '::' + methodName + ' does not exist');
        }
        this.state.teachAPI.on(eventName, method);
      }, this);
    },

    componentWillUnmount: function() {
      eventNames.forEach(function(eventName) {
        var methodName = events[eventName];
        var method = this[methodName];

        if (methodName === 'forceUpdate') {
          method = this._autoboundForceUpdate;
        }
        if (typeof method === 'function') {
          this.context.teachAPI.removeListener(eventName, method);
        }
      }, this);
    },

    render: function() {
      return <Component ref="component" {...this.props} teachAPI={this.state.teachAPI} />;
    }
  });
};
