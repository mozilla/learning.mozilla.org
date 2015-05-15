var urlResolve = require('url').resolve;
var React = require('react');

var Modal = require('../components/modal.jsx');
var ModalManagerMixin = require('../mixins/modal-manager');
var TeachAPI = require('../lib/teach-api');

var ICON_IMG_STYLE = { width: '1em', height: '1em' };

var getAbsoluteURL = function(url) {
  var origin = window.location.protocol + '//' + window.location.host;
  return urlResolve(origin, url);
};

var InsightsLink = React.createClass({
  render: function() {
    var url = getAbsoluteURL(this.props.url || window.location.href);
    var insightsURL = "https://developers.google.com/speed/pagespeed/" +
                      "insights/?url=" + encodeURIComponent(url);

    return (
      <a href={insightsURL} target="_blank" {...this.props}>
        <img src="/img/components/dev-ribbon/pagespeed-64.png"
         style={ICON_IMG_STYLE} /> PageSpeed Insights
      </a>
    );
  }
});

var TenonLink = React.createClass({
  render: function() {
    var url = getAbsoluteURL(this.props.url || window.location.href);
    var tenonURL = "http://tenon.io/testNow.php?url=" +
                   encodeURIComponent(url);

    return (
      <a href={tenonURL} target="_blank" {...this.props}>
        <img src="/img/components/dev-ribbon/tenon-logo.png"
         style={ICON_IMG_STYLE} /> Tenon
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
