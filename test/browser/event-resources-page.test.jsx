var should = require('should');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var stubContext = require('./stub-context.jsx');
var EventResourcesPage = require('../../pages/event-resources.jsx');

describe("EventResourcesPage.LogoAsset", function() {
  var asset, hover;

  beforeEach(function() {
    asset = stubContext.render(EventResourcesPage.LogoAsset, {
      alt: '',
      src1x: ''
    });
    hover = TestUtils.findRenderedDOMComponentWithClass(asset, 'logo-asset-hover');
  });

  afterEach(function() {
    stubContext.unmount(asset);
  });

  it('does not have .has-keyboard-focus by default', function() {
    ReactDOM.findDOMNode(hover).className.trim()
      .should.equal("logo-asset-hover");
  });

  it('adds .has-keyboard-focus when focused', function() {
    TestUtils.Simulate.focus(hover);
    ReactDOM.findDOMNode(hover).className.trim()
      .should.equal("logo-asset-hover has-keyboard-focus");
  });

  it('removes .has-keyboard-focus when blurred', function() {
    TestUtils.Simulate.focus(hover);
    TestUtils.Simulate.blur(hover);
    ReactDOM.findDOMNode(hover).className.trim()
      .should.equal("logo-asset-hover");
  });
});
