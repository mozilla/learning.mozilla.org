var _ = require('underscore');
var React = require('react');

var REMOTE_IMG_RE = /^(https?:)?\/\//;

// PhantomJS seems to synchronously load images, and we don't want
// remote images to slow down or hang our tests, so we'll ignore
// them.
//
// Note that we *do* still want PhantomJS to load local images, 
// as it's a good way of discovering broken image links, which is
// why we're not using PhantomJS' "loadImages" setting.
exports.install = function() {
  var _createElement = React.createElement;

  React.createElement = function(type, props) {
    if (type === 'img' && props && REMOTE_IMG_RE.test(props.src)) {
      return _createElement.apply(this, [
        'img',
        _.extend(props || {}, { 'src': '' })
      ].concat([].slice.call(arguments, 2)));
    }
    return _createElement.apply(this, arguments);
  };
};
