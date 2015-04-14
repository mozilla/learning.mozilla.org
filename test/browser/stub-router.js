var _ = require('underscore');

var noop = function() {};

module.exports = function StubRouter(options) {
  options = options || {};

  var router = function() {
    throw new Error("this should probably never be called");
  };

  router = _.extend(router, {
    makePath: noop,
    makeHref: noop,
    transitionTo: noop,
    replaceWith: noop,
    goBack: noop,
    getCurrentPath: noop,
    getCurrentRoutes: noop,
    getCurrentPathname: noop,
    getCurrentParams: noop,
    getCurrentQuery: function() { return options.currentQuery || {}; },
    isActive: noop
  });

  return router;
};
