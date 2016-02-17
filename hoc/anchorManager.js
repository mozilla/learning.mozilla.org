/*

  When a registered component needs to be navigated to, its
  `handleNavigateToAnchor` method is called; when it needs to
  be navigated from, its `handleNavigateFromAnchor` method is called.

*/

var AnchorManager = function() {
  this.anchorMap = {};
  this.initialized = false;
  this.currentAnchor = null;
  this.handleHashChange = this.handleHashChange.bind(this);
};

AnchorManager.prototype = {
  DEFAULT_ATTRACT_DURATION: 4000,
  register: function(component) {
    var anchorId = component.props.anchorId;
    if (process.env.NODE_ENV !== 'production' && anchorId in this.anchorMap) {
      console.warn('Anchor for #' + anchorId + ' already registered.');
    }
    this.anchorMap[anchorId] = component;
    if (!this.initialized) {
      this.initialize();
      this.initialized = true;
    }
    this.handleHashChange();
    return component;
  },
  unregister: function(component) {
    var anchorId = component.props.anchorId;
    if (process.env.NODE_ENV !== 'production') {
      if (!(anchorId in this.anchorMap)) {
        console.warn('Anchor for #' + anchorId + ' does not exist.');
      } else if (this.anchorMap[anchorId] !== component) {
        console.warn('Anchor mismatch for #' + anchorId + '.');
      }
    }
    if (this.currentAnchor === component) {
      this.currentAnchor = null;
    }
    delete this.anchorMap[anchorId];
  },
  initialize: function() {
    window.addEventListener('hashchange', this.handleHashChange);
  },
  getHash: function() {
    return window.location.hash.slice(1);
  },
  handleHashChange: function() {
    var newAnchor = this.anchorMap[this.getHash()];

    if (this.currentAnchor) {
      if (newAnchor === this.currentAnchor) {
        return;
      } else {
        this.currentAnchor.handleNavigateFromAnchor();
        this.currentAnchor = null;
      }
    }
    if (newAnchor) {
      this.currentAnchor = newAnchor;
      this.currentAnchor.handleNavigateToAnchor();
    }
  }
};

module.exports = AnchorManager;
