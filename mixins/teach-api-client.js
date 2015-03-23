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

module.exports = {
  contextTypes: {
    teachAPI: React.PropTypes.object.isRequired
  },
  getTeachAPI: function() {
    return this.context.teachAPI;
  },
  // It seems the forceUpdate() method is not auto-bound to a component,
  // so we'll make our own wrapper here.
  _autoboundForceUpdate: function() {
    this.forceUpdate();
  },
  componentDidMount: function() {
    var displayName = this.constructor.displayName;
    var events = this.constructor.teachAPIEvents;

    if (events) {
      Object.keys(events).forEach(function(event) {
        var methodName = events[event];
        var method = this[methodName];

        if (methodName == 'forceUpdate') {
          method = this._autoboundForceUpdate;
        }
        if (typeof(method) != 'function') {
          console.warn('method ' + displayName + '::' + methodName +
                       ' does not exist');
          return;
        }
        this.context.teachAPI.on(event, method);
      }, this);
    }
  },
  componentWillUnmount: function() {
    var events = this.constructor.teachAPIEvents;

    if (events) {
      Object.keys(events).forEach(function(event) {
        var methodName = events[event];
        var method = this[methodName];

        if (methodName == 'forceUpdate') {
          method = this._autoboundForceUpdate;
        }
        if (typeof(method) == 'function') {
          this.context.teachAPI.removeListener(event, method);
        }
      }, this);
    }
  }
};
