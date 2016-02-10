/*

  withAnchorManager is a React H.O.C. that can be used to make
  the component support permalinkable anchors (URL fragments)
  that attract the user's attention to them when navigated to.

  Any component that uses this H.O.C. supports an `anchorId` prop,
  which is the URL fragment (without the leading hash) of the anchor.
  This is expected to be constant throughout the lifetime of the
  component. (If `anchorId` is undefined, the mixin will be largely
  disabled.)

  When the window's location hash matches the component's anchor id,
  either at component mount time or during the `hashchange` window
  event, the component's `attractAttentionToAnchor` state will be
  set to `true` for 4 seconds. Additionally, if the component
  defines a `handleAttractAttentionToAnchor` method, it will be
  called. (The `attractAttention` function can be used to manually
  trigger this behavior as well.)

  The 4-second default can be changed if the component defines
  an instance variable called `ATTRACT_ATTENTION_TO_ANCHOR_DURATION`,
  which should be set to an integer value in milliseconds.

  Note that this mixin will *not* directly affect the component's
  rendering in any way. This means that it is not responsible for e.g.:

  * Setting any CSS classes, transitions, or animations.
  * Setting the `id` attribute of any elements.
  * Creating permalinks.

*/

var React = require('react');
var config = require('../config/config');
var AnchorManager = require('./anchorManager');
var defaultAnchorManager = new AnchorManager();

var componentDidUpdate = null;

if (process.env.NODE_ENV !== 'production') {
  componentDidUpdate = function(prevProps, prevState) {
    if (prevProps.anchorId !== this.props.anchorId) {
      console.warn('"anchorId" prop is expected to be constant, but changed.');
    }
  };
}

// Higher Order Component for anchor management
var withAnchorManager = function(Component) {
  return React.createClass({
    statics: {
      titleForHandler: Component.titleForHandler,
      getClass: function() {
        if (Component.getClass) {
          return Component.getClass();
        }
        return Component;
      }
    },
    propTypes: {
      anchorId: React.PropTypes.string,
      anchorManager: React.PropTypes.object
    },
    getComponent: function() {
      var component = this.refs.component;
      if (component.getComponent) {
        return component.getComponent();
      }
      return component;
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
    componentDidUpdate: componentDidUpdate,
    componentWillUnmount: function() {
      if (this.props.anchorId) {
        this.props.anchorManager.unregister(this);
      }
      this.cancelAttractAttention();
    },
    handleNavigateToAnchor: function() {
      this.attractAttention();
    },
    handleNavigateFromAnchor: function() {
      this.cancelAttractAttention();
    },
    attractAttention: function() {
      this.setState({
        attractAttentionToAnchor: true
      });
      window.clearTimeout(this.attractTimeout);
      this.attractTimeout = window.setTimeout(
        this.cancelAttractAttention,
        this.ATTRACT_ATTENTION_TO_ANCHOR_DURATION || this.props.anchorManager.DEFAULT_ATTRACT_DURATION
      );
      if (typeof this.refs.component.handleAttractAttentionToAnchor === 'function') {
        this.refs.component.handleAttractAttentionToAnchor();
      }
    },
    cancelAttractAttention: function() {
      window.clearTimeout(this.attractTimeout);
      this.setState({
        attractAttentionToAnchor: false
      });
    },
    render: function() {
      return (
        <Component
          ref="component"
          {...this.props}
          attractAttention={this.attractAttention}
          attractAttentionToAnchor={this.state.attractAttentionToAnchor}
        />
      );
    }
  });
};

module.exports = withAnchorManager;
