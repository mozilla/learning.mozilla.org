var React = require('react/addons');
var TimeoutTransitionGroup = require('../components/timeout-transition-group.jsx');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Sidebar = require('./sidebar.jsx');
var Footer = require('./footer.jsx');
var TeachAPI = require('../lib/teach-api');
var DevRibbon = (process.env.NODE_ENV === 'production' &&
                 process.env.SHOW_DEV_RIBBON !== 'on')
                ? null
                : require('./dev-ribbon.jsx');
var config = require('../lib/config');

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
    showModal: React.PropTypes.func.isRequired,
    hideModal: React.PropTypes.func.isRequired,
    teachAPI: React.PropTypes.object.isRequired
  },
  getCurrentPageHandler: function() {
    return this.context.router.getCurrentRoutes()[1].handler;
  },
  getInitialState: function() {
    return {
      modalClass: null,
      modalProps: null
    }
  },
  showModal: function(modalClass, modalProps) {
    this.setState({modalClass: modalClass, modalProps: modalProps});
  },
  hideModal: function() {
    this.setState({modalClass: null, modalProps: null});
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
  getTeachAPI: function() {
    if (!this.teachAPI) {
      this.teachAPI = new TeachAPI();
    }
    return this.teachAPI;
  },
  getChildContext: function() {
    return {
      showModal: this.showModal,
      hideModal: this.hideModal,
      teachAPI: this.getTeachAPI()
    };
  },
  // Accessibility best practices demand that only the elements in a
  // modal be focusable while it's being displayed, so we'll enforce
  // that here.
  handleNonModalFocus: function(e) {
    var firstFocusableEl = this.refs.modalHolder.getDOMNode()
      .querySelector('a, button, input, textarea');
    if (firstFocusableEl) {
      firstFocusableEl.focus();
    }
  },
  render: function() {
    var pageClassName = this.getCurrentPageHandler().pageClassName || '';
    return (
      <div>
        <div className={"page container-fluid " + pageClassName}
         aria-hidden={!!this.state.modalClass}
         onFocus={this.state.modalClass && this.handleNonModalFocus}>
          {DevRibbon ? <DevRibbon/> : null}
          <div className="row">
            <Sidebar/>
            <main className="content col-md-9">
              <RouteHandler/>
            </main>
          </div>
          <Footer/>
        </div>

        <TimeoutTransitionGroup transitionName="modal"
                                enterTimeout={250}
                                leaveTimeout={250}
                                transitionEnter={true}
                                transitionLeave={true}>
        {this.state.modalClass
         ? <div ref="modalHolder" key={1}>
             {React.createElement(this.state.modalClass,
                                  this.state.modalProps)}
             <div className="modal-backdrop"/>
           </div>
         : null}
        </TimeoutTransitionGroup>
      </div>
    );
  }
});

module.exports = Page;
