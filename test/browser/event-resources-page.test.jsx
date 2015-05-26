var should = require('should');
var React =require('react/addons');
var TestUtils = React.addons.TestUtils;

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
    hover.getDOMNode().className.trim()
      .should.equal("logo-asset-hover");
  });

  it('adds .has-keyboard-focus when focused', function() {
    TestUtils.Simulate.focus(hover);
    hover.getDOMNode().className.trim()
      .should.equal("logo-asset-hover has-keyboard-focus");
  });

  it('removes .has-keyboard-focus when blurred', function() {
    TestUtils.Simulate.focus(hover);
    TestUtils.Simulate.blur(hover);
    hover.getDOMNode().className.trim()
      .should.equal("logo-asset-hover");
  });
});
