var _ = require('underscore');
var React = require('react/addons');
var should = require('should');
var sinon = window.sinon;

var AnchorManagerMixin = require('../../mixins/anchor-manager');

var SampleAnchorClass = React.createClass({
  mixins: [AnchorManagerMixin],
  render: function() {
    return <div></div>;
  }
});

describe('AnchorManagerMixin', function() {
  var manager, anchors;

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
    manager = new AnchorManagerMixin.AnchorManager();
    manager.initialize = sinon.spy();
    manager.getHash = sinon.spy();
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

  it('should use singleton anchor manger by default', function() {
    var m1 = SampleAnchorClass.getDefaultProps().anchorManager;
    var m2 = SampleAnchorClass.getDefaultProps().anchorManager;

    m1.should.be.an.Object;
    m1.should.equal(m2);
  });

  it('should lazily initialize anchor manager', function() {
    manager.initialized.should.be.false;
    renderAnchor({anchorId: 'bar'});
    manager.initialized.should.be.true;
    manager.initialize.callCount.should.equal(1);
  });

  it('should not initialize anchor manager multiple times', function() {
    renderAnchor({anchorId: 'foo'});
    renderAnchor({anchorId: 'bar'});
    manager.initialize.callCount.should.equal(1);
  });

  it('should log warnings when anchor names collide', function() {
    var foo1, foo2;

    sinon.stub(console, 'warn');

    foo1 = renderAnchor({anchorId: 'foo'});
    console.warn.callCount.should.equal(0);

    foo2 = renderAnchor({anchorId: 'foo'});
    console.warn.callCount.should.equal(1);
    console.warn.getCall(0).args.should.eql([
      'Anchor for #foo already registered.'
    ]);

    unmountAnchor(foo1);
    console.warn.callCount.should.equal(2);
    console.warn.getCall(1).args.should.eql([
      'Anchor mismatch for #foo.'
    ]);

    unmountAnchor(foo2);
    console.warn.callCount.should.equal(3);
    console.warn.getCall(2).args.should.eql([
      'Anchor for #foo does not exist.'
    ]);

    console.warn.restore();
  });
});
