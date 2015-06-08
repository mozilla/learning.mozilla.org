var _ = require('underscore');
var React = require('react/addons');
var should = require('should');
var sinon = window.sinon;

var AnchorManagerMixin = require('../../mixins/anchor-manager');

var createAnchorManager = function() {
  var manager = new AnchorManagerMixin.AnchorManager();

  // Stub out the methods that access the window object.
  manager.initialize = sinon.stub();
  manager.getHash = sinon.stub();

  manager.simulateHashChange = function(hash) {
    manager.getHash.returns(hash);
    manager.handleHashChange();
  };
  return manager;
};

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
    manager = createAnchorManager();
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

describe('AnchorManagerMixin', function() {
  var manager, anchors;

  var SampleAnchorClass = React.createClass({
    mixins: [AnchorManagerMixin],
    render: function() {
      return <div></div>;
    }
  });

  var renderAnchor = function(props) {
    var anchor = React.addons.TestUtils.renderIntoDocument(
      <SampleAnchorClass anchorManager={manager} {...props}/>
    );
    anchors.push(anchor);
    return anchor;
  };

  var unmountAnchor = function(anchor) {
    React.unmountComponentAtNode(anchor.getDOMNode().parentNode);
    anchors.splice(anchors.indexOf(anchor, 1));
  };

  beforeEach(function() {
    manager = createAnchorManager();
    anchors = [];
  });

  afterEach(function() {
    anchors.slice().forEach(unmountAnchor);
    anchors.length.should.equal(0);
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
});
