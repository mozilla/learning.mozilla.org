/**
 * Singleton library for determining whether to hard-reload a
 * page, as <Link> does not allow hard reloads of the current page.
 *
 * This library works because node (and bundles) cache requirements.
 */

var curPage = false,
    _reset = false;

module.exports = {
  bindPage: function(page) {
    curPage = page;
  },

  shouldResetOnReload: function(reset) {
    if (reset === false || reset === true) {
      _reset = reset;
    }
    return _reset;
  },

  reset: function() {
    _reset = false
    if (curPage) {
      curPage.reset();
    }
  }
};
