var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var config = require('../lib/config');

var Footer = React.createClass({
  render: function() {
    return (
      <footer className="row" role="contentinfo">
        <div className="sidebar col-md-3">
          <div className="row">
            <div className="col-xs-6">
              <ul className="list-unstyled">
                <li><a href="https://webmaker.org/">Webmaker</a></li>
                <li><a href="https://sendto.mozilla.org/">Donate</a></li>
                <li><a href={config.TWITTER_LINK}>Twitter</a></li>
              </ul>
            </div>
            <div className="col-xs-6">
              <ul className="list-unstyled">
                <li><a href="https://beta.webmaker.org/#/legal">Legal</a></li>
                <li><a href="https://www.mozilla.org/privacy/websites">Privacy</a></li>
                <li><Link to="about">About</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="content col-md-9">
          <div className="row">
            <div className="col-sm-4 col-sm-offset-1">
              <a href="http://hivelearningnetworks.org/"><img src="/img/components/footer/svg/hive-logo.svg" alt="hivelearningnetworks.org"/></a>
            </div>
            <div className="col-sm-7 col-lg-5">
              <p>The Hive Learning Networks, stewarded by Mozilla, are a growing constellation of local communities around the globe that are championing digital skills and web literacy through connected learning. <a href="http://hivelearningnetworks.org/">Learn more<span className="sr-only"> about Hive Learning Networks</span></a></p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
});

module.exports = Footer;
