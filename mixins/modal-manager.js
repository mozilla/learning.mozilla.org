var React = require('react');

module.exports = {
  contextTypes: {
    showModal: React.PropTypes.func.isRequired,
    hideModal: React.PropTypes.func.isRequired
  },
  showModal: function(modalClass, modalProps) {
    this.context.showModal(modalClass, modalProps);
  },
  hideModal: function() {
    this.context.hideModal();
  }
};
