var React = require('react');
var ReactDOM = require('react-dom');
var TimeoutTransitionGroup = require('../components/timeout-transition-group.jsx');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var ga = require('react-ga');

var Sidebar = require('./sidebar.jsx');
var Footer = require('./footer.jsx');
var DevRibbon = (process.env.NODE_ENV === 'production' && process.env.SHOW_DEV_RIBBON !== 'on') ? null : require('./dev-ribbon.jsx');
var config = require('../config/config');

var Page = React.createClass({
  statics: {
    titleForHandler: function(handler) {
      var title = 'Mozilla Learning';
      if (handler.pageTitle) {
        title = handler.pageTitle + ' - ' + title;
      }
      return title;
    }
  },

  // Utility functions
  getCurrentPageHandler: function() {
    return this.props.routes.slice(-1)[0].component;
  },

  getCurrentTitle: function() {
    var handler = this.getCurrentPageHandler();
    var title = Page.titleForHandler(handler);
    return title;
  },

  getCurrentClassName: function() {
    var handler = this.getCurrentPageHandler();
    var className = handler.pageClassName || '';
    return className;
  },

  showModal: function(modalClass, modalProps) {
    ga.modalview(modalClass.displayName);
    this.setState({modalClass: modalClass, modalProps: modalProps});
  },

  hideModal: function() {
    this.setState({modalClass: null, modalProps: null});
  },

  // Accessibility best practices demand that only the elements in a
  // modal be focusable while it's being displayed, so we'll enforce
  // that here.
  handleNonModalFocus: function(e) {
    var firstFocusableEl = ReactDOM.findDOMNode(this.refs.modalHolder)
      .querySelector('a, button, input, textarea');
    if (firstFocusableEl) {
      firstFocusableEl.focus();
    }
  },

  // Lifecycle functions

  getInitialState: function() {
    return {
      modalClass: null,
      modalProps: null
    }
  },

  componentDidMount: function() {
    if (process.env.NODE_ENV !== 'production' && !config.IN_TEST_SUITE) {
      var title = this.getCurrentTitle();
      if (document.title !== title) {
        console.warn("Document title is '" + document.title + "' but " + "expected it to be '" + title + "'.");
      }
    }
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.state.modalClass && !prevState.modalClass) {
      document.body.classList.add('modal-open');
    } else if (!this.state.modalClass && prevState.modalClass) {
      document.body.classList.remove('modal-open');
    }
    document.title = this.getCurrentTitle();
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
    var routes = this.props.routes;
    var currentRoute = routes.slice(-1)[0];
    var currentPath = config.ORIGIN + '/' + currentRoute.path;
    var pageClassName = this.getCurrentClassName();
    return (
      <div>
        <div className={"page container-fluid " + pageClassName}
         aria-hidden={!!this.state.modalClass}
         onFocus={this.state.modalClass && this.handleNonModalFocus}>
          <a href="#content" className="sr-only sr-only-focusable skip-to-content">
            Skip to main content
          </a>

          {DevRibbon ? <DevRibbon showModal={this.showModal} hideModal={this.hideModal}/> : null}

          <div className="row">
            <Sidebar/>
            <main className="content col-md-9" role="main" id="content" tabIndex="-1">
            {
              React.cloneElement(this.props.children, {
                showModal: this.showModal,
                hideModal: this.hideModal,
                currentPath: currentPath
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
