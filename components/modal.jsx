// [THIS LINE TO BE REMOVED] bootstrap class reference: http://nakupanda.github.io/bootstrap3-dialog/

var React = require('react');
var ReactAddons = require('react/addons');

var Modal = React.createClass({
  mixins: [ReactAddons.PureRenderMixin],
  componentDidMount: function() {
    this.backdrop = document.createElement('div');
    this.backdrop.setAttribute('class', 'modal-backdrop');
    document.body.appendChild(this.backdrop);
  },
  componentWillUnmount: function() {
    document.body.removeChild(this.backdrop);
    this.backdrop = null;
  },
  handleCloseClick: function(e) {
    this.props.onClose();
  },
  handleOutsideOfModalClick: function(e) {
    if (e.target === this.getDOMNode()) {
      this.props.onClose();
    }
  },
  render: function() {
    return (
      <div className="modal show" onClick={this.handleOutsideOfModalClick}>
        <div className="modal-dialog">
          <div className="modal-header">
            <button type="button" className="close" aria-hidden="true"
             onClick={this.handleCloseClick}>&times;</button>
            <div className="modal-title">{this.props.modalTitle}</div>
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
