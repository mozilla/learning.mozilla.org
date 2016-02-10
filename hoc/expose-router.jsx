var React = require("react");
var Router = require("react-router");

// ========================================================
// TEMPORARY H.O.C. IN PREPARATION OF UPGRADING REACT-ROUTER
// ========================================================

function exposeRouter(Component) {
  // React-router 1.0 and 2.0 have location and router
  // living on this.props, rather than this.context, which
  // is great, but also means we need to ensure that's where
  // the code expects it as we prepare to upgrade react-router.
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
    contextTypes: {
      router: React.PropTypes.func.isRequired
    },
    getComponent: function() {
      var component = this.refs.component;
      if (component.getComponent) {
        return component.getComponent();
      }
      return component;
    },
    render: function() {
      return <Component ref="component" {...this.props} router={this.context.router}/>;
    }
  });
}

// ========================================================
// TEMPORARY H.O.C IN PREPARATION OF UPGRADING REACT-ROUTER
// ========================================================

module.exports = exposeRouter;
