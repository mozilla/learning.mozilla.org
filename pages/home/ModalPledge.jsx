var React = require('react');
var Modal = require('../../components/modal.jsx');
var ImageTag = require('../../components/imagetag.jsx');

var PledgeSignupForm = require('./PledgeSignupForm.jsx');

var ModalPledge = React.createClass({
  render: function() {
    return (
      <Modal modalTitle="" className="modal-pledge folded">
        <ImageTag className="image text-center" src1x="/img/pages/home/svg/icon-pledge.svg" alt="" width={80} height={""} />
        <h3>Pledge to teach</h3>
        <p>Because the Web is a global public resource that's integral to modern life, <strong>I pledge to:</strong></p>
        <ul>
          <li>teach others digital literacy skills through hands-on making</li>
          <li>help people move beyond simply consuming the web to creating it</li>
          <li>be a passionate advocate of an open and accessible web</li>
        </ul>
        <p><strong>Pledge now, and we'll follow up with details about how you can teach the web!</strong></p>
        <PledgeSignupForm idPrefix="pledge-form-" />
      </Modal>
    )
  }
});

module.exports = ModalPledge;
