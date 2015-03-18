var React = require('react');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var Sidebar = require('./sidebar.jsx');
var Footer = require('./footer.jsx');

var Page = React.createClass({
  mixins: [Router.State],
  childContextTypes: {
    showModal: React.PropTypes.func.isRequired,
    hideModal: React.PropTypes.func.isRequired
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
  getChildContext: function() {
    return {
      showModal: this.showModal,
      hideModal: this.hideModal
    };
  },
  render: function() {
    var pageClassName = this.getRoutes()[1].handler.pageClassName || '';
    return (
      <div>
        <div className={"page container-fluid " + pageClassName}
         aria-hidden={!!this.state.modalClass}>
          <div className="row">
            <Sidebar/>
            <main className="content col-md-9">
              <RouteHandler/>
            </main>
          </div>
          <Footer/>
        </div>
        {this.state.modalClass
         ? <div>
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
