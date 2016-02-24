var React = require('react');
var Modal = require('../../components/modal.jsx');
var ImageTag = require('../../components/imagetag.jsx');

var EmailSignupForm = require('./EmailSignupForm.jsx');

var ModalEmail = React.createClass({
  render: function() {
    return (
      <Modal modalTitle="" className="modal-newsletter folded" hideModal={this.props.hideModal}>
        <ImageTag className="image text-center" src1x="/img/pages/home/svg/icon-newsletter.svg" alt="" width={80} height={""} />
        <h3>Get email updates</h3>
        <EmailSignupForm idPrefix="email-form-" />
      </Modal>
    )
  }
});

module.exports = ModalEmail;
