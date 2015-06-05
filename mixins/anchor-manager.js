// AnchorManagerMixin is a React mixin that can be used to make the
// component support permalinkable anchors (URL fragments) that
// attract the user's attention to them when navigated to.
//
// Any component that uses this mixin supports an `anchorId` prop,
// which is the URL fragment (without the leading hash) of the anchor.
// This is expected to be constant throughout the lifetime of the
// component. (If `anchorId` is undefined, the mixin will be disabled.)
//
// When the window's location hash matches the component's anchor id,
// either at component mount time or during the `hashchange` window
// event, the component's `attractAttentionToAnchor` state will be
// set to `true` for 4 seconds. Additionally, if the component
// defines a `handleAttractAttentionToAnchor` method, it will be
// called.
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

var DEFAULT_ATTRACT_DURATION = 4000;

var AnchorManagerMixin = {
  propTypes: {
    anchorId: React.PropTypes.string
  },
  getInitialState: function() {
    return {
      attractAttentionToAnchor: false
    };
  },
  componentDidMount: function() {
    if (this.props.anchorId) {
      window.addEventListener('hashchange', this.handleHashChange);
      this.handleHashChange();
    }
  },
  componentWillUnmount: function() {
    if (this.props.anchorId) {
      window.removeEventListener('hashchange', this.handleHashChange);
    }
    this.cancelAttractAttentionToAnchor();
  },
  componentDidUpdate: function(prevProps) {
    if (process.env.NODE_ENV !== 'production') {
      if (prevProps.anchorId !== this.props.anchorId) {
        console.warn('"anchorId" prop is expected to be constant, ' +
                     'but changed.');
      }
    }
  },
  handleHashChange: function() {
    if (window.location.hash === '#' + this.props.anchorId) {
      this.attractAttentionToAnchor();
      this.refs.header.getDOMNode().focus();
    } else if (this.state.attractAttentionToAnchor) {
      this.cancelAttractAttentionToAnchor();
    }
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

module.exports = AnchorManagerMixin;
