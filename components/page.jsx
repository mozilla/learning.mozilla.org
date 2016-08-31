var React = require(`react`);
var ReactDOM = require(`react-dom`);
var TimeoutTransitionGroup = require(`../components/timeout-transition-group.jsx`);
var Router = require(`react-router`);
var RouteHandler = Router.RouteHandler;
var ga = require(`react-ga`);

var resetreload = require(`../lib/resetreload`);

var Sidebar = require(`./sidebar.jsx`);
var Footer = require(`./footer.jsx`);
var DevRibbon = (process.env.NODE_ENV === `production` && process.env.SHOW_DEV_RIBBON !== `on`) ? null : require(`./dev-ribbon.jsx`);
var config = require(`../config/config`);

var Page = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  statics: {
    titleForHandler: function(handler) {
      var title = `Mozilla Learning`;

      if (handler.pageTitle) {
        title = handler.pageTitle + ` - ` + title;
      }

      return title;
    }
  },

  // Utility functions
  getCurrentPageHandler: function() {
    var routes = this.props.routes,
        route = routes.slice(-1)[0],
        Component = route.component;

    return Component;
  },

  getCurrentTitle: function() {
    var handler = this.getCurrentPageHandler(),
        title = Page.titleForHandler(handler);

    return title;
  },

  getCurrentClassName: function() {
    var handler = this.getCurrentPageHandler(),
        className = handler.pageClassName || ``;

    return className;
  },

  getSidebarVisibilityClassName: function() {
    if(this.context.intl.locale !== `en-US`){
      return `sidebar-hidden`;
    }
  },

  showModal: function(modalClass, modalProps) {
    ga.modalview(modalClass.displayName);
    this.setState({modalClass: modalClass, modalProps: modalProps});
  },

  hideModal: function(cb) {
    this.setState({modalClass: null, modalProps: null}, cb);
  },

  // Accessibility best practices demand that only the elements in a
  // modal be focusable while it`s being displayed, so we`ll enforce
  // that here.
  handleNonModalFocus: function(e) {
    var firstFocusableEl = ReactDOM.findDOMNode(this.refs.modalHolder)
      .querySelector(`a, button, input, textarea`);

    if (firstFocusableEl) {
      firstFocusableEl.focus();
    }
  },

  // Lifecycle functions

  getInitialState: function() {
    resetreload.bindPage(this);
    return {
      modalClass: null,
      modalProps: null
    };
  },

  reset: function() {
    var child = this.refs.pageContent,
        comp = child.getComponent();

    if (comp && comp.reset) {
      comp.reset();
    }
  },

  bindTitle: function() {
    if (typeof document !== "undefined") {
      document.title = this.getCurrentTitle();
    }
  },

  componentDidMount: function() {
    this.bindTitle();
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.state.modalClass && !prevState.modalClass) {
      document.body.classList.add(`modal-open`);
    } else if (!this.state.modalClass && prevState.modalClass) {
      document.body.classList.remove(`modal-open`);
    }
    this.bindTitle();
  },

  getTransition: function() {
    return (
      <TimeoutTransitionGroup
        transitionName="modal"
        enterTimeout={250}
        leaveTimeout={250}
        transitionEnter={true}
        transitionLeave={true}
      >
      {
        this.state.modalClass ?
          <div ref="modalHolder" key={1}>
            {React.createElement(this.state.modalClass, this.state.modalProps)}
            <div className="modal-backdrop"/>
          </div>
        : null
      }
      </TimeoutTransitionGroup>
    );
  },

  render: function() {
    // we need the next three lines for server-side rendering:
    var routes = this.props.routes,
        currentRoute = routes.slice(-1)[0],
        currentPath = config.ORIGIN + `/` + this.context.intl.locale + `/` + (currentRoute.path || ``);

    // but we _actually_ want to rely on this, instead:
    if (typeof window !== `undefined`) {
      currentPath = config.ORIGIN + window.location.pathname;
    }

    var pageClassName = `${this.getCurrentClassName()} ${this.getSidebarVisibilityClassName()}`;
    var className = "page container-fluid " + pageClassName;

    return (
      <div>
        <div className={className}
         aria-hidden={!!this.state.modalClass}
         onFocus={this.state.modalClass && this.handleNonModalFocus}>
          <a href="#content" className="sr-only sr-only-focusable skip-to-content">
            {this.context.intl.formatMessage({id: `skip_to_main_content`})}
          </a>

          {DevRibbon ? <DevRibbon showModal={this.showModal} hideModal={this.hideModal}/> : null}

          <div className="row">
            <Sidebar currentPath={currentPath} />
            <main className="content col-md-9" role="main" id="content" tabIndex="-1">
            {
              React.cloneElement(this.props.children, {
                showModal: this.showModal,
                hideModal: this.hideModal,
                currentPath: currentPath,
                ref: "pageContent"
              })
            }
            </main>
          </div>
          <Footer className="page-bottom"/>
        </div>

        {this.getTransition()}
      </div>
    );
  }
});

module.exports = Page;
