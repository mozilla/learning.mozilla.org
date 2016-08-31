var urlResolve = require('url').resolve,
    urlParse = require('url').parse,
    React = require('react'),
    Modal = require('../components/modal.jsx'),
    Healthcheck = require('../pages/healthcheck.jsx'),
    TeachAPI = require('../lib/teach-api'),
    packageJSON = require('../package.json');

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
    var testURL = "/test/";
    var testName = "Test Suite";

    if (process.env.NODE_ENV === 'production') {
      testURL = "/test/manual/";
      testName = "Manual Test Suite";
    }

    return (
      <Modal modalTitle="Development Version" showModal={this.props.showModal} hideModal={this.props.hideModal}>
        <Healthcheck.HealthcheckMeta/>
        <a href="http://invis.io/9G2DK7SR2" target="_blank" className="btn btn-block">
          <span className="glyphicon glyphicon glyphicon-plane"/> Site Map
        </a>
        <a href="https://github.com/mozilla/teach.mozilla.org/issues" target="_blank" className="btn btn-block">
          <span className="glyphicon glyphicon glyphicon-exclamation-sign"/> File An Issue on GitHub
        </a>
        <a href={TeachAPI.getDefaultURL()} target="_blank" className="btn btn-block">
          <span className="glyphicon glyphicon glyphicon-cloud"/> REST API Documentation
        </a>
        <a href={testURL} target="_blank" className="btn btn-block">
          <span className="glyphicon glyphicon glyphicon-heart"/> {testName}
        </a>
        <h3>Diagnostic Tools</h3>
        <TenonLink className="btn btn-block"/>
        <InsightsLink className="btn btn-block"/>

        <br/>
        <p><small>
          For hints on manual testing and more, please see the <a href="https://github.com/mozilla/teach.mozilla.org/blob/develop/CONTRIBUTING.md">Contribution Guidelines</a>.
        </small></p>
      </Modal>
    );
  }
});

module.exports = React.createClass({
  statics: {
    TenonLink: TenonLink,
    InsightsLink: InsightsLink
  },
  handleClick: function(e) {
    e.preventDefault();
    this.props.showModal(DevModal, this.props);
  },
  render: function() {
    return (
      <div className="dev-ribbon-holder">
        <a className="dev-ribbon" href="" onClick={this.handleClick}>
          Dev Version
        </a>
      </div>
    );
  }
});
