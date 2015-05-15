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

  it('should set srcset attribute', function () {
    imagetag.getDOMNode().getAttribute('srcset').should.equal('foo2x.jpg 2x');
  });

  it('should set primary src to 1x resolution', function () {
    imagetag.getDOMNode().getAttribute('src').should.equal('foo1x.jpg');
  });
});
