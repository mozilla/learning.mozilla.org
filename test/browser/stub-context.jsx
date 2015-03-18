// This is based on:
// https://github.com/rackt/react-router/blob/master/docs/guides/testing.md

var _ = require('underscore');
var React =require('react/addons');
var TestUtils = React.addons.TestUtils;

var StubTeachAPI = require('./stub-teach-api');

var stubContext = function(Component, props, stubs) {
  var func = React.PropTypes.func;
  var noop = function() {};

  return React.createClass({
    childContextTypes: {
      makePath: func,
      makeHref: func,
      transitionTo: func,
      replaceWith: func,
      goBack: func,
      getCurrentPath: func,
      getCurrentRoutes: func,
      getCurrentPathname: func,
      getCurrentParams: func,
      getCurrentQuery: func,
      isActive: func,
      teachAPI: React.PropTypes.object
    },

    getChildContext: function() {
      return _.extend({
        makePath: noop,
        makeHref: noop,
        transitionTo: noop,
        replaceWith: noop,
        goBack: noop,
        getCurrentPath: noop,
        getCurrentRoutes: noop,
        getCurrentPathname: noop,
        getCurrentParams: noop,
        getCurrentQuery: noop,
        isActive: noop,
        teachAPI: new StubTeachAPI()
      }, stubs);
    },

    render: function() {
      return <Component {...props} ref="unstubbed" />;
    }
  });
};

stubContext.render = function(Component, props, stubs) {
  var Stubbed = stubContext(Component, props, stubs);
  return TestUtils.renderIntoDocument(<Stubbed/>).refs.unstubbed;
};

stubContext.unmount = function(unstubbed) {
  React.unmountComponentAtNode(unstubbed.getDOMNode().parentNode);
};

module.exports = stubContext;
