var React = require('react');
var ReactDOM = require('react-dom');
var TimeoutTransitionGroup = require('../components/timeout-transition-group.jsx');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var ga = require('react-ga');

var Sidebar = require('./sidebar.jsx');
var Footer = require('./footer.jsx');
var TeachAPI = require('../lib/teach-api');
var DevRibbon = (process.env.NODE_ENV === 'production' &&
                 process.env.SHOW_DEV_RIBBON !== 'on')
                ? null
                : require('./dev-ribbon.jsx');
var config = require('../config/config');

var Page = React.createClass({
  statics: {
    handlerForPage: function(router, url) {
      return router.match(url).routes[1].handler;
    },
    titleForHandler: function(handler) {
      var title = 'Mozilla Learning';

      if (handler.pageTitle) {
        title = handler.pageTitle + ' - ' + title;
      }

      return title;
    }
  },

  contextTypes: {
    router: React.PropTypes.func
  },

  childContextTypes: {
    teachAPI: React.PropTypes.object.isRequired
  },


  // Utility functions


  getChildContext: function() {
    return {
      teachAPI: this.getTeachAPI()
    };
  },

  getCurrentPageHandler: function() {
    return this.context.router.getCurrentRoutes()[1].handler;
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

  getTeachAPI: function() {
    if (!this.teachAPI) {
      this.teachAPI = new TeachAPI();
    }
    return this.teachAPI;
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
      var title = Page.titleForHandler(this.getCurrentPageHandler());
      if (document.title !== title) {
        console.warn("Document title is '" + document.title + "' but " +
                     "expected it to be '" + title + "'.");
      }
    }
  },

  componentDidUpdate: function(prevProps, prevState) {
    if (this.state.modalClass && !prevState.modalClass) {
      document.body.classList.add('modal-open');
    } else if (!this.state.modalClass && prevState.modalClass) {
      document.body.classList.remove('modal-open');
    }
    document.title = Page.titleForHandler(this.getCurrentPageHandler());
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
    var pageClassName = this.getCurrentPageHandler().pageClassName || '';
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
              <RouteHandler showModal={this.showModal} hideModal={this.hideModal}/>
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
