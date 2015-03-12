var should = require('should');
var stubRouterContext = require('./stub-router-context.jsx');

var ImageTag = require('../../components/imagetag.jsx');

describe('ImageTag', function () {
  var
      imagetag;

  imagetag = stubRouterContext.render(ImageTag, {
    src1x: 'foo1x.jpg',
    src2x: 'foo2x.jpg'
  });

  it('should set pixel density to 1 by default', function () {
    imagetag.state.pixelDensity.should.equal(1);
  });

  it('should set primary src to the value of src1x by default', function () {
    imagetag.getDOMNode().getAttribute('src').should.equal('foo1x.jpg');
  });

/*
  need to figure out how to set window.devicePixelRatio before render.

  describe('on hi-resolution (or "retina") displays', function () {
    var window = {};
    before(function () {
      window.devicePixelRatio = 2.1234;
    });

    it('pixel density should be set to 2', function () {
      imagetag.state.pixelDensity.should.equal(2);
    });

    it('primary src should be set to the value of src2x', function () {
      imagetag.getDOMNode().getAttribute('src').should.equal('foo2x.jpg');
    });
  });
*/
});
