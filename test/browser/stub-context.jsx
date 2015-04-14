// This is based on:
// https://github.com/rackt/react-router/blob/master/docs/guides/testing.md

var _ = require('underscore');
var React =require('react/addons');
var TestUtils = React.addons.TestUtils;
var sinon = window.sinon;

var StubRouter = require('./stub-router');
var StubTeachAPI = require('./stub-teach-api');

var stubContext = function(Component, props, stubs) {
  var childContext;
  var func = React.PropTypes.func;

  return React.createClass({
    childContextTypes: {
      router: func,
      showModal: func,
      hideModal: func,
      teachAPI: React.PropTypes.object
    },

    getChildContext: function() {
      if (!childContext) {
        childContext = _.extend({
          router: new StubRouter(),
          showModal: sinon.spy(),
          hideModal: sinon.spy(),
          teachAPI: new StubTeachAPI()
        }, stubs);
      }
      return childContext;
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
