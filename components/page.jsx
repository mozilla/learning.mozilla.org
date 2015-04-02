var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Sidebar = require('./sidebar.jsx');
var Footer = require('./footer.jsx');
var TeachAPI = require('../lib/teach-api');
var DevRibbon = process.env.NODE_ENV === 'production'
                ? null
                : require('./dev-ribbon.jsx');

var Page = React.createClass({
  mixins: [Router.State],
  childContextTypes: {
    showModal: React.PropTypes.func.isRequired,
    hideModal: React.PropTypes.func.isRequired,
    teachAPI: React.PropTypes.object.isRequired
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
  componentDidUpdate: function(prevProps, prevState) {
    if (this.state.modalClass && !prevState.modalClass) {
      document.body.classList.add('modal-open');
    } else if (!this.state.modalClass && prevState.modalClass) {
      document.body.classList.remove('modal-open');
    }
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
    var pageClassName = this.getRoutes()[1].handler.pageClassName || '';
    return (
      <div>
        <div className={"page container-fluid " + pageClassName}
         aria-hidden={!!this.state.modalClass}
         onFocus={this.state.modalClass && this.handleNonModalFocus}>
          {DevRibbon ? <DevRibbon/> : null}
          <div className="row">
            <Sidebar pathname={this.getPathname()} />
            <main className="content col-md-9">
              <RouteHandler/>
            </main>
          </div>
          <Footer/>
        </div>
        {this.state.modalClass
         ? <div ref="modalHolder">
             {React.createElement(this.state.modalClass,
                                  this.state.modalProps)}
             <div className="modal-backdrop"/>
           </div>
         : null}
      </div>
    );
  }
});

module.exports = Page;
