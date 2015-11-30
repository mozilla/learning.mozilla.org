var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var OutboundLink = require('react-ga').OutboundLink;

var config = require('../lib/config');

var Footer = React.createClass({
  render: function() {
    return (
      <footer className="row" role="contentinfo">
        <div className="sidebar col-md-3">
          <div className="row">
            <div className="col-xs-12">
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
            </div>
          </div>
        </div>
      </footer>
    );
  }
});

module.exports = Footer;
