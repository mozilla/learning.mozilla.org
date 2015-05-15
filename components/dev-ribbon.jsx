var urlResolve = require('url').resolve;
var urlParse = require('url').parse;
var React = require('react');

var Modal = require('../components/modal.jsx');
var ModalManagerMixin = require('../mixins/modal-manager');
var TeachAPI = require('../lib/teach-api');

var ICON_IMG_STYLE = { width: '1em', height: '1em' };

// http://stackoverflow.com/a/2814102
var PRIVATE_IP_REGEX = /(^127\.0\.0\.1)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.)/;

var PRIVATE_HOSTNAME_REGEX = /^(localhost)$/;

var DiagnosticToolMixin = {
  getAbsoluteURL: function() {
    var origin = window.location.protocol + '//' + window.location.host;
    return urlResolve(origin, this.props.url || window.location.href);
  },
  handleClick: function(e) {
    var hostname = urlParse(this.getAbsoluteURL()).hostname;

    if (PRIVATE_IP_REGEX.test(hostname) ||
        PRIVATE_HOSTNAME_REGEX.test(hostname)) {
      var ok = window.confirm(
        "Your hostname (" + hostname + ") is not publicly accessible " +
        "from the internet. Click OK to visit ngrok.com, which will " +
        "allow you to expose your local server to the internet so you " +
        "can use " + this.constructor.toolName + "."
      );
      e.preventDefault();
      if (ok) {
        window.open('https://ngrok.com/');
      }
    }
  }
};

var InsightsLink = React.createClass({
  mixins: [DiagnosticToolMixin],
  statics: {
    toolName: 'PageSpeed Insights'
  },
  render: function() {
    var insightsURL = "https://developers.google.com/speed/pagespeed/" +
                      "insights/?url=" +
                      encodeURIComponent(this.getAbsoluteURL());

    return (
      <a href={insightsURL} onClick={this.handleClick} target="_blank" {...this.props}>
        <img src="/img/components/dev-ribbon/pagespeed-64.png"
         style={ICON_IMG_STYLE} /> {this.constructor.toolName}
      </a>
    );
  }
});

var TenonLink = React.createClass({
  mixins: [DiagnosticToolMixin],
  statics: {
    toolName: 'Tenon'
  },
  render: function() {
    var tenonURL = "http://tenon.io/testNow.php?url=" +
                   encodeURIComponent(this.getAbsoluteURL());

    return (
      <a href={tenonURL} onClick={this.handleClick} target="_blank" {...this.props}>
        <img src="/img/components/dev-ribbon/tenon-logo.png"
         style={ICON_IMG_STYLE} /> {this.constructor.toolName}
      </a>
    );
  }
});

var DevModal = React.createClass({
  render: function() {
    var rev = document.querySelector('meta[name="git-rev"]');

    if (rev) {
      rev = rev.getAttribute('content');
      rev = (
        <span> based on commit <code>
            <a target="_blank"
               href={"https://github.com/mozilla/teach.webmaker.org/commit/" + rev}>
              {rev.slice(0, 10)}
            </a>
        </code></span>
      );
    }

    return (
      <Modal modalTitle="Development Version">
        <p>This is a development version of the <a href="https://github.com/mozilla/teach.webmaker.org" target="_blank">Teach Site</a>{rev}.</p>

        <a href="http://invis.io/9G2DK7SR2" target="_blank" className="btn btn-block btn-default">
          <span className="glyphicon glyphicon glyphicon-plane"/> Site Map
        </a>
        <a href={TeachAPI.getDefaultURL() + '/admin'} target="_blank" className="btn btn-block btn-default">
          <span className="glyphicon glyphicon glyphicon-wrench"/> Admin UI
        </a>
        <a href="https://github.com/mozilla/teach.webmaker.org/issues" target="_blank" className="btn btn-block btn-default">
          <span className="glyphicon glyphicon glyphicon-exclamation-sign"/> File An Issue on GitHub
        </a>
        <a href={TeachAPI.getDefaultURL()} target="_blank" className="btn btn-block btn-default">
          <span className="glyphicon glyphicon glyphicon-cloud"/> REST API Documentation
        </a>
        <a href="/test/" target="_blank" className="btn btn-block btn-default">
          <span className="glyphicon glyphicon glyphicon-heart"/> Test Suite
        </a>
        <h3>Diagnostic Tools</h3>
        <TenonLink className="btn btn-block btn-default"/>
        <InsightsLink className="btn btn-block btn-default"/>
      </Modal>
    );
  }
});

module.exports = React.createClass({
  mixins: [ModalManagerMixin],
  statics: {
    TenonLink: TenonLink,
    InsightsLink: InsightsLink
  },
  handleClick: function(e) {
    e.preventDefault();
    this.showModal(DevModal);
  },
  render: function() {
    // We're using role="link" to stop react-a11y from annoying us;
    // this code is only for development, don't worry about a11y.
    return (
      <div className="dev-ribbon-holder">
        <a className="dev-ribbon" href="#" role="link" onClick={this.handleClick}>
          Dev Version
        </a>
      </div>
    );
  }
});
