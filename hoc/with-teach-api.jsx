// This is a Higher Order Component that can wrap any Component such that
// it receives a teachAPI property for communicating with the teach-api
// server that runs in conjunction with the teach.mozilla.org site.
//
// Its use is straight-forward:
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
//   var Wrapped = withTeachAPI(Foo);
//   module.exports = Wrapped;
//
// Then simply use the component like any other JSX: <Wrapped/>
//
// As this is an H.O.C, the wrapped component's own API gets masked
// by the wrapper. If direct access to the wrapped component's API
// is necessary (e.g. for unit test) the instance.getComponent()
// function will return the mounted component, whereas calling
// the wrapped class definition Wrapped.getComponent() retrieves
// the original component's class definition.
//
var React = require('react');
var TeachAPI = require('../lib/teach-api');

module.exports = function withTeachAPI(Component) {
  var displayName = Component.displayName;
  var events = Component.teachAPIEvents || {};
  var eventNames = Object.keys(events);

  return React.createClass({
    statics: {
      getClass: function() {
        if (Component.getClass) {
          return Component.getClass();
        }
        return Component;
      },
      pageTitle: Component.pageTitle,
      pageClassName: Component.pageClassName
    },

    getInitialState: function() {
      return {
        teachAPI: this.props.teachAPI || new TeachAPI()
      };
    },

    getComponent: function() {
      var component = this.refs.component;
      if (component.getComponent) {
        return component.getComponent();
      }
      return component;
    },

    // It seems the forceUpdate() method is not auto-bound to a component,
    // so we'll make our own wrapper here.
    _autoboundForceUpdate: function() {
      this.getComponent().forceUpdate();
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
