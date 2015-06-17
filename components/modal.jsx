var React = require('react/addons');

var ModalManagerMixin = require('../mixins/modal-manager');

var Modal = React.createClass({
  mixins: [React.addons.PureRenderMixin, ModalManagerMixin],
  propTypes: {
    modalTitle: React.PropTypes.string,
    foldedStyle: React.PropTypes.bool,
    className: React.PropTypes.string
  },
  componentDidMount: function() {
    document.addEventListener('keydown', this.handleKeyDown);
  },
  componentWillUnmount: function() {
    document.removeEventListener('keydown', this.handleKeyDown);
  },
  handleOutsideOfModalClick: function(e) {
    if (e.target === this.getDOMNode()) {
      this.hideModal();
    }
  },
  handleKeyDown: function(e) {
    if (e.which == 27) {
      this.hideModal();
    }
  },
  render: function() {
    var classes = this.props.foldedStyle ? "modal-dialog folded" : "modal-dialog";
    if (this.props.className) {
      classes += " " + this.props.className;
    }
    return (
      <div className="modal show"
       role="dialog"
       aria-labelledby="modal-label"
       onClick={this.handleOutsideOfModalClick}>
        <div className={classes}>
          <div className="modal-header">
            <button type="button" className="close"
             onClick={this.hideModal}>&times;</button>
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
