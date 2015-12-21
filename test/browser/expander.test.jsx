var _ = require('underscore');
var should = require('should');
var React = require('react');
var TestUtils = require('react-addons-test-utils');
var sinon = window.sinon;

var stubContext = require('./stub-context.jsx');
var StubAnchorManager = require('./stub-anchor-manager');
var Expander = require('../../components/expander.jsx');

describe("Expander", function() {
  var expander, itemContainer, itemHeader, anchorManager, clock;

  var isAttractingAttention = function() {
    return TestUtils.scryRenderedDOMComponentsWithClass(
      expander,
      'attract-attention'
    ).length === 1;
  };

  var createExpander = function(props) {
    clock = sinon.useFakeTimers();
    anchorManager = StubAnchorManager();
    expander = stubContext.render(Expander, _.extend({
      head: 'heading text',
      anchorManager: anchorManager
    }, props));
    itemContainer = TestUtils.findRenderedDOMComponentWithClass(
      expander,
      'expand-div'
    );
    itemHeader = TestUtils.findRenderedDOMComponentWithClass(
      expander,
      'expander-header'
    );
    return expander;
  };

  beforeEach(function() {
    expander = itemContainer = itemHeader = null;
  });

  afterEach(function() {
    if (expander) {
      stubContext.unmount(expander);
    }
    clock.restore();
  });

  it('should hide collapsed content by default', function() {
    createExpander();
    expander.state.expanded.should.be.false;
  });

  it('should hide collapsible content', function() {
    createExpander();
    itemContainer.getAttribute("class").should.not.match(/expanded/);
  });

  it('should toggle collapsible content on mouse down', function() {
    createExpander();
    TestUtils.Simulate.mouseDown(itemHeader);
    itemContainer.getAttribute("class").should.match(/expanded/);
    TestUtils.Simulate.mouseDown(itemHeader);
    itemContainer.getAttribute("class").should.not.match(/expanded/);
  });

  it('should not show permalink if anchorId does not exist', function() {
    createExpander();
    TestUtils.scryRenderedDOMComponentsWithClass(
      expander,
      'expander-permalink'
    ).length.should.equal(0);
  });

  it('should show permalink if anchorId exists', function() {
    createExpander({anchorId: 'sup'});
    TestUtils.findRenderedDOMComponentWithClass(
      expander,
      'expander-permalink'
    ).getAttribute("href").should.equal('#sup');
  });

  it('should not attract attention to content by default', function() {
    createExpander();
    isAttractingAttention().should.be.false;
  });

  it('should attract user to content when focused via kbd', function() {
    createExpander();
    TestUtils.Simulate.keyUp(itemHeader, {which: 9});
    expander.state.expanded.should.be.true;
    isAttractingAttention().should.be.true;
    clock.tick(99999);
    isAttractingAttention().should.be.false;
  });

  it('should attract user to content when navigated to', function() {
    createExpander({anchorId: 'sup'});
    anchorManager.simulateHashChange('sup');
    expander.state.expanded.should.be.true;
    isAttractingAttention().should.be.true;
    clock.tick(99999);
    isAttractingAttention().should.be.false;
  });
});
