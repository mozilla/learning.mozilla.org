var React = require('react');
var ReactAddons = require('react/addons');

var Modal = React.createClass({
  mixins: [ReactAddons.PureRenderMixin],
  contextTypes: {
    hideModal: React.PropTypes.func.isRequired
  },
  componentDidMount: function() {
    document.addEventListener('keydown', this.handleKeyDown);
  },
  componentWillUnmount: function() {
    document.removeEventListener('keydown', this.handleKeyDown);
  },
  close: function() {
    this.context.hideModal();
  },
  handleOutsideOfModalClick: function(e) {
    if (e.target === this.getDOMNode()) {
      this.close();
    }
  },
  handleKeyDown: function(e) {
    if (e.which == 27) {
      this.close();
    }
  },
  render: function() {
    return (
      <div className="modal show"
       role="dialog"
       aria-labelledby="modal-label"
       onClick={this.handleOutsideOfModalClick}>
        <div className="modal-dialog">
          <div className="modal-header">
            <button type="button" className="close"
             onClick={this.close}>&times;</button>
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
