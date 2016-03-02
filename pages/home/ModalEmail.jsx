var React = require('react');
var Modal = require('../../components/modal.jsx');
var ImageTag = require('../../components/imagetag.jsx');

var EmailSignupForm = require('../../components/newsletter-signup/SignupForm.jsx');

var ModalEmail = React.createClass({
  render: function() {
    return (
      <Modal modalTitle="" className="modal-newsletter folded" hideModal={this.props.hideModal}>
        <ImageTag className="image text-center" src1x="/img/pages/home/svg/icon-newsletter.svg" alt="" width={120} height={""} />
        <h3>Get email updates</h3>
        <EmailSignupForm idPrefix="email-form-" sourceUrl={this.props.sourceUrl} />
      </Modal>
    )
  }
});

module.exports = ModalEmail;
