var React = require('react');

var SocialShareButton = React.createClass({
  propTypes : {
    networkType: React.PropTypes.string.isRequired,
    iconClassName: React.PropTypes.string.isRequired
  },
  render : function() {
    return (
      <button type="button" className={"btn icon-only btn-social " + this.props.networkType } onClick={this.handleClick}>
        <span className={this.props.iconClassName} />
      </button>
    )
  },
  handleClick: function(evt) {
    alert("this button does not do anything quite yet.");
  }
});

var SocialShare = React.createClass({
  statics: {
    SOCIAL_NETWORKS: {
      facebook: 'fa fa-facebook',
      twitter: 'fa fa-twitter',
      linkedin: 'fa fa-linkedin'
    }
  },

  render : function () {
    var networks = SocialShare.SOCIAL_NETWORKS;
    var buttons = Object.keys(networks).map(function(network) {
      return <SocialShareButton key={network} networkType={network} iconClassName={networks[network]} />
    });
    return <div className="social-share-wrapper">{ buttons }</div>;
  }
});

module.exports = SocialShare;
