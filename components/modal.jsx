var React = require('react/addons');

var ModalManagerMixin = require('../mixins/modal-manager');

var Modal = React.createClass({
  mixins: [React.addons.PureRenderMixin, ModalManagerMixin],
  propTypes: {
    modalTitle: React.PropTypes.string
  },
  componentDidMount: function() {
    var thisEl = this.getDOMNode();

    document.addEventListener('keydown', this.handleKeyDown);
    if (!containsActiveElement(thisEl)) {
      thisEl.focus();
    }
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
    return (
      <div className="modal show"
       tabIndex="-1"
       role="dialog"
       aria-labelledby="modal-label"
       onClick={this.handleOutsideOfModalClick}>
        <div className={"modal-dialog " + this.props.className}>
          <div className="modal-header">
            <button type="button" className="close"
             aria-label="Close"
             onClick={this.hideModal}>
              <span aria-hidden="true">&times;</span>
            </button>
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

function containsActiveElement(el) {
  if (!document.activeElement) {
    return false;
  }
  return contains(el, document.activeElement);
}

// http://ejohn.org/blog/comparing-document-position/
function contains(a, b){
  return a.contains ?
    a != b && a.contains(b) :
    !!(a.compareDocumentPosition(b) & 16);
}

module.exports = Modal;
