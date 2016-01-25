// AnchorManagerMixin is a React mixin that can be used to make the
// component support permalinkable anchors (URL fragments) that
// attract the user's attention to them when navigated to.
//
// Any component that uses this mixin supports an `anchorId` prop,
// which is the URL fragment (without the leading hash) of the anchor.
// This is expected to be constant throughout the lifetime of the
// component. (If `anchorId` is undefined, the mixin will be largely
// disabled.)
//
// When the window's location hash matches the component's anchor id,
// either at component mount time or during the `hashchange` window
// event, the component's `attractAttentionToAnchor` state will be
// set to `true` for 4 seconds. Additionally, if the component
// defines a `handleAttractAttentionToAnchor` method, it will be
// called. (The `attractAttentionToAnchor` method can be used to
// manually trigger this behavior as well.)
//
// The 4-second default can be changed if the component defines
// an instance variable called `ATTRACT_ATTENTION_TO_ANCHOR_DURATION`,
// which should be set to an integer value in milliseconds.
//
// Note that this mixin will *not* directly affect the component's
// rendering in any way. This means that it is not responsible for e.g.:
//
// * Setting any CSS classes, transitions, or animations.
// * Setting the `id` attribute of any elements.
// * Creating permalinks.

var React = require('react');
var config = require('../lib/build/config');
var DEFAULT_ATTRACT_DURATION = 4000;

// AnchorManager is a largely private singleton class that maintains a
// registry mapping anchor names to React components and listens for
// location hash changes.
//
// When a registered component needs to be navigated to, its
// `handleNavigateToAnchor` method is called; when it needs to
// be navigated from, its `handleNavigateFromAnchor` method is called.
var AnchorManager = function() {
  this.anchorMap = {};
  this.initialized = false;
  this.currentAnchor = null;
  this.handleHashChange = this.handleHashChange.bind(this);
};

AnchorManager.prototype = {
  register: function(component) {
    var anchorId = component.props.anchorId;
    if (process.env.NODE_ENV !== 'production' &&
        anchorId in this.anchorMap) {
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

var defaultAnchorManager = new AnchorManager();

var AnchorManagerMixin = {
  propTypes: {
    anchorId: React.PropTypes.string,
    anchorManager: React.PropTypes.object
  },
  getDefaultProps: function() {
    return {
      anchorManager: defaultAnchorManager
    };
  },
  getInitialState: function() {
    return {
      attractAttentionToAnchor: false
    };
  },
  componentDidMount: function() {
    if (this.props.anchorId) {
      this.props.anchorManager.register(this);
    }
  },
  componentWillUnmount: function() {
    if (this.props.anchorId) {
      this.props.anchorManager.unregister(this);
    }
    this.cancelAttractAttentionToAnchor();
  },
  handleNavigateToAnchor: function() {
    this.attractAttentionToAnchor();
  },
  handleNavigateFromAnchor: function() {
    this.cancelAttractAttentionToAnchor();
  },
  attractAttentionToAnchor: function() {
    this.setState({
      attractAttentionToAnchor: true
    });
    window.clearTimeout(this.attractTimeout);
    this.attractTimeout = window.setTimeout(
      this.cancelAttractAttentionToAnchor,
      this.ATTRACT_ATTENTION_TO_ANCHOR_DURATION || DEFAULT_ATTRACT_DURATION
    );
    if (typeof(this.handleAttractAttentionToAnchor) === 'function') {
      this.handleAttractAttentionToAnchor();
    }
  },
  cancelAttractAttentionToAnchor: function() {
    window.clearTimeout(this.attractTimeout);
    this.setState({
      attractAttentionToAnchor: false
    });
  }
};

if (process.env.NODE_ENV !== 'production') {
  AnchorManagerMixin.componentDidUpdate = function(prevProps) {
    if (prevProps.anchorId !== this.props.anchorId) {
      console.warn('"anchorId" prop is expected to be constant, ' +
                   'but changed.');
    }
  };
  if (config.IN_TEST_SUITE) {
    AnchorManagerMixin.AnchorManager = AnchorManager;
    AnchorManagerMixin.DEFAULT_ATTRACT_DURATION = DEFAULT_ATTRACT_DURATION;
  }
}

module.exports = AnchorManagerMixin;
