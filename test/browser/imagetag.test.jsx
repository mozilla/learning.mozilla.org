var should = require('should');
var stubContext = require('./stub-context.jsx');

var ImageTag = require('../../components/imagetag.jsx');

describe('ImageTag', function () {
  var
      imagetag;

  beforeEach(function() {
    imagetag = stubContext.render(ImageTag, {
      alt: 'Foo',
      src1x: 'foo1x.jpg',
      src2x: 'foo2x.jpg'
    });
  });

  afterEach(function() {
    stubContext.unmount(imagetag);
  });

  it('should set primary src based on the window’s pixel density', function () {
    if (window.devicePixelRatio > 1.5) {
      imagetag.getDOMNode().getAttribute('src').should.equal('foo2x.jpg');
    } else {
      imagetag.getDOMNode().getAttribute('src').should.equal('foo1x.jpg');
    }
  });
});
