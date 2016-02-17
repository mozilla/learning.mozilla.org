var React = require('react');
var Modal = require('../../components/modal.jsx');

var ThankYouModal = React.createClass({
  render: function() {
  // we can't preset the message sharing on Facebook
  var facebookShare = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent("https://teach.mozilla.org");
  var twitterShare = "https://twitter.com/home?status=" + encodeURIComponent("I love to #TeachTheWeb! https://teach.mozilla.org");
    return (
      <Modal modalTitle="Thanks for your interest!" className="modal-pledge" hideModal={this.props.hideModal}>
        <p>We appreciate your commitment to keeping the web open, accessible and ours.</p>
        <p><strong>Share and tell your friends</strong></p>
        <div className="social-share">
          <a href={facebookShare} className="facebook"><i className="fa fa-facebook"></i>Facebook</a>
          <a href={twitterShare} className="twitter"><i className="fa fa-twitter"></i>Twitter</a>
        </div>
      </Modal>
    );
  }
});

module.exports = ThankYouModal;
