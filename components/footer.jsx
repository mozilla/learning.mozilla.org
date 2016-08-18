var React = require('react');
var Link = require('react-router').Link;
var OutboundLink = require('react-ga').OutboundLink;
var FormattedMessage = require('react-intl').FormattedMessage;


var config = require('../config/config');

var Footer = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function() {
    return (
      <footer role="contentinfo" className={this.props.className}>
        <ul>
          <div>
            <li><OutboundLink to={config.HIVE_LEARNING_NETWORKS_URL} eventLabel={config.HIVE_LEARNING_NETWORKS_URL}><FormattedMessage id='hive' defaultMessage="Hive" /></OutboundLink></li>
            <li><a href={config.TWITTER_LINK}><FormattedMessage id='twitter' defaultMessage="Twitter" /></a></li>
          </div>
          <div>
            <li><a href="https://donate.mozilla.org/"><FormattedMessage id='donate' defaultMessage="Donate" /></a></li>
            <li><a href="https://beta.webmaker.org/#/legal"><FormattedMessage id='terms' defaultMessage="Terms" /></a></li>
            <li><a href="https://www.mozilla.org/privacy/websites"><FormattedMessage id='privacy' defaultMessage="Privacy" /></a></li>
          </div>
        </ul>
      </footer>
    );
  }
});

module.exports = Footer;
