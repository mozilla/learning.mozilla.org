var should = require('should');
var stubContext = require('./stub-context.jsx');
var ReactDOM = require('react-dom');

var ImageTag = require('../../components/imagetag.jsx');

describe('ImageTag', function () {
  var imagetag;

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
    ReactDOM.findDOMNode(imagetag).querySelector("img").getAttribute('srcset').should.equal('foo2x.jpg 2x');
  });

  it('should set primary src to 1x resolution', function () {
    ReactDOM.findDOMNode(imagetag).querySelector("img").getAttribute('src').should.equal('foo1x.jpg');
  });
});
