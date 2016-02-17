var React = require('react');
var ReactDOM = require('react-dom');
var PureRenderMixin = require('react-addons-pure-render-mixin');

var Modal = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    modalTitle: React.PropTypes.string,
    showModal: React.PropTypes.func,
    hidewModal: React.PropTypes.func
  },
  componentDidMount: function() {
    document.addEventListener('keydown', this.handleKeyDown);
  },
  componentWillUnmount: function() {
    document.removeEventListener('keydown', this.handleKeyDown);
  },
  handleOutsideOfModalClick: function(e) {
    if (e.target === ReactDOM.findDOMNode(this)) {
      this.props.hideModal();
    }
  },
  handleKeyDown: function(e) {
    if (e.which == 27) {
      this.props.hideModal();
    }
  },
  render: function() {
    return (
      <div className="modal show"
       role="dialog"
       aria-labelledby="modal-label"
       onClick={this.handleOutsideOfModalClick}>
        <div className={"modal-dialog " + this.props.className}>
          <div className="modal-header">
            <button type="button" className="close"
             onClick={this.props.hideModal}>&times;</button>
            <div className="modal-title" id="modal-label">
              {this.props.modalTitle}
            </div>
          </div>
          <div className="modal-body">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Modal;
