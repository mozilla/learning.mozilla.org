var should = require('should');
var stubRouterContext = require('./stub-router-context.jsx');

var ImageTag = require('../../components/imagetag.jsx');

describe('ImageTag', function () {
  var
      imagetag;

  imagetag = stubRouterContext.render(ImageTag, {
    alt: 'Foo',
    src1x: 'foo1x.jpg',
    src2x: 'foo2x.jpg'
  });

  it('should detect pixel density and set state accordingly', function () {
    if (window.devicePixelRatio > 1.5) {
      imagetag.state.pixelDensity.should.equal(2);
    } else {
      imagetag.state.pixelDensity.should.equal(1);
    }
  });

  it('should set primary src based on the window’s pixel density', function () {
    if (window.devicePixelRatio > 1.5) {
      imagetag.getDOMNode().getAttribute('src').should.equal('foo2x.jpg');
    } else {
      imagetag.getDOMNode().getAttribute('src').should.equal('foo1x.jpg');
    }
  });
});
