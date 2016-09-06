// This isn't actually called in node, it's stringified and plopped in
// a script tag in the page header. It's basically an extremely simple
// stand-in for Modernizr, but if it becomes more complex we should think
// about actually migrating to that library.
//
// Modernizr code borrowed:
//
// * cors (needed to reach teach-api)
module.exports = function featureDetect() {
  var safeMode = (/[?&]safemode=on/i).test(window.location.search);
  var cors = 'XMLHttpRequest' in window && 'withCredentials' in new XMLHttpRequest();

  if (!safeMode && cors) {
    document.documentElement.setAttribute('class', '');
    window.ENABLE_JS = true;
  } else {
    window.ENABLE_JS = false;
  }
};
