// This is based on:
// https://github.com/rackt/react-router/blob/master/docs/guides/testing.md

var _ = require('underscore');
var React =require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var sinon = window.sinon;
var IntlProvider = require('react-intl').IntlProvider;
var locales = require('../../dist/locales.json');

var StubRouter = require('./stub-router');
var StubTeachAPI = require('./stub-teach-api');

var stubContext = function(Component, props, stubs) {
  var childContext;
  var func = React.PropTypes.func;
  var obj = React.PropTypes.object;

  // Normally these are imparted by Page.jsx, but we're bypassing that here.
  props = props || {};
  if (!props.showModal) props.showModal = sinon.spy();
  if (!props.hideModal) props.hideModal = sinon.spy();

  return React.createClass({
    childContextTypes: {
      router: func,
      location: obj
    },

    getChildContext: function() {
      if (!childContext) {
        childContext = _.extend({
          router: new StubRouter(),
          location: { search: '' }
        }, stubs);
      }
      return childContext;
    },

    render: function() {
      return <IntlProvider locale='en-US' messages={locales['en-US']}><Component {...props} ref="unstubbed"/></IntlProvider>;
    }
  });
};

stubContext.render = function(Component, props, stubs) {
  var Stubbed = stubContext(Component, props, stubs);
  return TestUtils.renderIntoDocument(<Stubbed/>).refs.unstubbed;
};

stubContext.unmount = function(unstubbed) {
  ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(unstubbed).parentNode);
};

module.exports = stubContext;
