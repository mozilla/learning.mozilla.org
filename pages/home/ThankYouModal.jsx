var React = require('react');
var Modal = require('../../components/modal.jsx');
var FormattedMessage = require('react-intl').FormattedMessage;

var ThankYouModal = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function() {
    // we can't preset the message sharing on Facebook
    var facebookShare = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent("https://learning.mozilla.org");
    var twitterShareMessage = this.context.intl.formatMessage({id: 'twitter_share_message'}, {learningURL: "https://learning.mozilla.org" });
    var twitterShare = "https://twitter.com/home?status=" + encodeURIComponent(twitterShareMessage);

    return (
      <Modal modalTitle={this.context.intl.formatMessage({id: 'thanks_for_your_interest'})} className="modal-signup" hideModal={this.props.hideModal}>
        <p><FormattedMessage id='thank_you_modal_message' /></p>
        <p><strong><FormattedMessage id='thank_you_modal_share_message' /></strong></p>
        <div className="social-share">
          <a href={facebookShare} className="facebook"><i className="fa fa-facebook"></i><FormattedMessage id='facebook' /></a>
          <a href={twitterShare} className="twitter"><i className="fa fa-twitter"></i><FormattedMessage id='twitter' /></a>
        </div>
      </Modal>
    );
  }
});

module.exports = ThankYouModal;
