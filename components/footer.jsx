var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var OutboundLink = require('react-ga').OutboundLink;

var config = require('../lib/build/config');

var Footer = React.createClass({
  render: function() {
    return (
      <footer role="contentinfo" className={this.props.className}>
        <ul>
          <div>
            <li><Link to="about">About</Link></li>
            <li><OutboundLink to={config.HIVE_LEARNING_NETWORKS_URL} eventLabel={config.HIVE_LEARNING_NETWORKS_URL}>Hive</OutboundLink></li>
            <li><a href={config.TWITTER_LINK}>Twitter</a></li>
          </div>
          <div>
            <li><a href="https://sendto.mozilla.org/">Donate</a></li>
            <li><a href="https://beta.webmaker.org/#/legal">Terms</a></li>
            <li><a href="https://www.mozilla.org/privacy/websites">Privacy</a></li>
          </div>
        </ul>
      </footer>
    );
  }
});

module.exports = Footer;
