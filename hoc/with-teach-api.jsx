// This is a Higher Order Component that can wrap any Component such that
// it receives a teachAPI property.
//
//   var withTeachAPI = require('./with-teach-api.jsx');
//
//   var Foo = React.createClass({
//     ...
//     render: function() {
//       return <div>I am {this.props.teachAPI.getUserName()}</div>;
//     }
//   });
//
//   module.exports = withTeachAPI(Foo);
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
    statics: {
      getComponent: function() {
        return Component;
      }
    },

    getInitialState: function() {
      return {
        teachAPI: this.props.teachAPI || new TeachAPI()
      };
    },

    getComponent: function() {
      return this.refs.component;
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
        var method = this.refs.component[methodName];

        if (methodName === 'forceUpdate') {
          method = this._autoboundForceUpdate;
        }
        if (typeof method === 'function') {
          this.state.teachAPI.removeListener(eventName, method);
        }
      }, this);
    },

    render: function() {
      return <Component ref="component" {...this.props} teachAPI={this.state.teachAPI} />;
    }
  });
};
