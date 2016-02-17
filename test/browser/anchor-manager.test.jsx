var React = require('react');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-addons-test-utils');
var should = require('should');
var sinon = window.sinon;

var withAnchorManager = require('../../hoc/with-anchor-manager.jsx');
var StubAnchorManager = require('./stub-anchor-manager');

describe('AnchorManager', function() {
  var manager;

  var fakeAnchor = function(anchorId) {
    return {
      props: {anchorId: anchorId},
      handleNavigateFromAnchor: sinon.spy(),
      handleNavigateToAnchor: sinon.spy()
    };
  };

  beforeEach(function() {
    manager = StubAnchorManager();
  });

  it('should initialize itself only upon registration', function() {
    manager.initialized.should.be.false;
    manager.register(fakeAnchor('foo'));
    manager.initialized.should.be.true;
    manager.initialize.callCount.should.equal(1);
  });

  it('should not initialize itself multiple times', function() {
    manager.register(fakeAnchor('foo'));
    manager.register(fakeAnchor('bar'));
    manager.initialize.callCount.should.equal(1);
  });

  it('should add to anchorMap on registration', function() {
    var anchor = manager.register(fakeAnchor('foo'));
    manager.anchorMap.should.eql({'foo': anchor});
  });

  it('should remove from anchorMap on unregistration', function() {
    var anchor = manager.register(fakeAnchor('foo'));
    manager.unregister(anchor);
    manager.anchorMap.should.eql({});
  });

  it('should reset currentAnchor on unregister if needed', function() {
    var anchor = manager.register(fakeAnchor('foo'));
    manager.currentAnchor = anchor;
    manager.unregister(anchor);
    should(manager.currentAnchor).be.null;
  });

  it('should not reset currentAnchor on unregister if unneeded', function() {
    var anchor = manager.register(fakeAnchor('foo'));
    var otherAnchor = manager.register(fakeAnchor('bar'));
    manager.currentAnchor = otherAnchor;
    manager.unregister(anchor);
    manager.currentAnchor.should.equal(otherAnchor);
  });

  it('should warn when registering duplicate anchor name', function() {
    sinon.stub(console, 'warn');

    manager.register(fakeAnchor('foo'));
    console.warn.callCount.should.equal(0);

    manager.register(fakeAnchor('foo'));
    console.warn.callCount.should.equal(1);
    console.warn.getCall(0).args.should.eql([
      'Anchor for #foo already registered.'
    ]);
    console.warn.restore();
  });

  it('should warn when unregistering nonexistent anchor name', function() {
    sinon.stub(console, 'warn');

    manager.unregister(fakeAnchor('foo'));
    console.warn.callCount.should.equal(1);
    console.warn.getCall(0).args.should.eql([
      'Anchor for #foo does not exist.'
    ]);
    console.warn.restore();
  });

  it('should warn when unregistering invalid anchor component', function() {
    sinon.stub(console, 'warn');

    manager.register(fakeAnchor('foo'));
    manager.unregister(fakeAnchor('foo'));
    console.warn.callCount.should.equal(1);
    console.warn.getCall(0).args.should.eql([
      'Anchor mismatch for #foo.'
    ]);
    console.warn.restore();
  });

  it('should no-op if hash changes between unmatched anchors', function() {
    var anchor = manager.register(fakeAnchor('foo'));
    manager.simulateHashChange('blah');
    anchor.handleNavigateFromAnchor.callCount.should.equal(0);
    anchor.handleNavigateToAnchor.callCount.should.equal(0);
    should(manager.currentAnchor).be.null;
  });

  it('should no-op if hash matches current anchor', function() {
    var anchor = manager.register(fakeAnchor('foo'));
    manager.currentAnchor = anchor;
    manager.simulateHashChange('foo');
    anchor.handleNavigateFromAnchor.callCount.should.equal(0);
    anchor.handleNavigateToAnchor.callCount.should.equal(0);
    manager.currentAnchor.should.equal(anchor);
  });

  it('should navigate from unmatched anchor to matched anchor', function() {
    var anchor = manager.register(fakeAnchor('foo'));
    manager.simulateHashChange('foo');
    anchor.handleNavigateFromAnchor.callCount.should.equal(0);
    anchor.handleNavigateToAnchor.callCount.should.equal(1);
    manager.currentAnchor.should.equal(anchor);
  });

  it('should navigate from old anchor to unmatched anchor', function() {
    var fooAnchor = manager.register(fakeAnchor('foo'));
    manager.currentAnchor = fooAnchor;
    manager.simulateHashChange('blah');
    fooAnchor.handleNavigateFromAnchor.callCount.should.equal(1);
    fooAnchor.handleNavigateToAnchor.callCount.should.equal(0);
    should(manager.currentAnchor).be.null;
  });

  it('should navigate from old anchor to matched anchor', function() {
    var fooAnchor = manager.register(fakeAnchor('foo'));
    var barAnchor = manager.register(fakeAnchor('bar'));
    manager.currentAnchor = fooAnchor;
    manager.simulateHashChange('bar');
    fooAnchor.handleNavigateFromAnchor.callCount.should.equal(1);
    fooAnchor.handleNavigateToAnchor.callCount.should.equal(0);
    barAnchor.handleNavigateFromAnchor.callCount.should.equal(0);
    barAnchor.handleNavigateToAnchor.callCount.should.equal(1);
    manager.currentAnchor.should.equal(barAnchor);
  });
});

describe('AnchorManagerHOC', function() {
  var manager, anchors, clock;

  var SampleAnchor = React.createClass({
    render: function() {
      return <div></div>;
    }
  });

  SampleAnchorClass = withAnchorManager(SampleAnchor);

  var renderAnchor = function(props) {
    var anchor = ReactTestUtils.renderIntoDocument(
      <SampleAnchorClass anchorManager={manager} {...props}/>
    );
    anchors.push(anchor);
    return anchor;
  };

  var unmountAnchor = function(anchor) {
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(anchor).parentNode);
    anchors.splice(anchors.indexOf(anchor), 1);
  };

  beforeEach(function() {
    clock = sinon.useFakeTimers();
    manager = StubAnchorManager();
    anchors = [];
  });

  afterEach(function() {
    anchors.slice().forEach(unmountAnchor);
    anchors.length.should.equal(0);
    clock.restore();
  });

  it('should not do anything if anchorId is not defined', function() {
    renderAnchor();
    Object.keys(manager.anchorMap).should.eql([]);
    manager.initialized.should.be.false;
  });

  it('should register w/ anchor manager if anchorId is defined', function() {
    renderAnchor({anchorId: 'foo'});
    Object.keys(manager.anchorMap).should.eql(['foo']);
  });

  it('should unregister w/ anchor manager on unmount', function() {
    var a = renderAnchor({anchorId: 'foo'});
    unmountAnchor(a);
    Object.keys(manager.anchorMap).should.eql([]);
  });

  it('should use singleton anchor manger by default', function() {
    var m1 = SampleAnchorClass.getDefaultProps().anchorManager;
    var m2 = SampleAnchorClass.getDefaultProps().anchorManager;

    m1.should.be.an.Object;
    m1.should.equal(m2);
  });

  it('logs warning if props.anchorId changes', function() {
    var a = renderAnchor({anchorId: 'foo'});
    sinon.stub(console, 'warn');
    a.componentDidUpdate({anchorId: 'bar'});
    console.warn.callCount.should.equal(1);
    console.warn.getCall(0).args.should.eql([
      '"anchorId" prop is expected to be constant, but changed.'
    ]);
    console.warn.restore();
  });

  it('cancels attract timeout on unmount', function() {
    var a = renderAnchor({anchorId: 'foo'});
    sinon.spy(a, 'cancelAttractAttention');
    a.attractAttention();
    a.cancelAttractAttention.callCount.should.equal(0);
    unmountAnchor(a);
    a.cancelAttractAttention.callCount.should.equal(1);
    clock.tick(999999999);
    a.cancelAttractAttention.callCount.should.equal(1);
    a.cancelAttractAttention.restore();
  });

  it('does not attract attention to anchor when mounted', function() {
    var a = renderAnchor({anchorId: 'foo'});
    a.state.attractAttentionToAnchor.should.be.false;
  });

  it('attracts attention to anchor when navigated to', function() {
    var a = renderAnchor({anchorId: 'foo'});
    manager.simulateHashChange('foo');
    a.state.attractAttentionToAnchor.should.be.true;
  });

  it('stops attracting attention to anchor after some time', function() {
    var a = renderAnchor({anchorId: 'foo'});
    manager.simulateHashChange('foo');
    clock.tick(manager.DEFAULT_ATTRACT_DURATION + 1);
    a.state.attractAttentionToAnchor.should.be.false;
  });

  it('waits ATTRACT_ATTENTION_TO_ANCHOR_DURATION if defined', function() {
    var a = renderAnchor({anchorId: 'foo'});
    a.ATTRACT_ATTENTION_TO_ANCHOR_DURATION = 10;
    a.attractAttention();
    a.state.attractAttentionToAnchor.should.be.true;
    clock.tick(11);
    a.state.attractAttentionToAnchor.should.be.false;
  });

  it('calls handleAttractAttention() if defined', function() {
    var a = renderAnchor({anchorId: 'foo'});
    var c = a.getComponent();
    c.handleAttractAttentionToAnchor = sinon.spy();
    a.attractAttention();
    c.handleAttractAttentionToAnchor.callCount.should.equal(1);
  });
});
