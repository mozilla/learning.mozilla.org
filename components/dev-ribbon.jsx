var React = require('react');

var Modal = require('../components/modal.jsx');
var ModalManagerMixin = require('../mixins/modal-manager');
var TeachAPI = require('../lib/teach-api');

var DevModal = React.createClass({
  render: function() {
    return (
      <Modal modalTitle="Development Version">
        <p>This is a development version of the <a href="https://github.com/mozilla/teach.webmaker.org" target="_blank">Teach Site</a>.</p>

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
      </Modal>
    );
  }
});

module.exports = React.createClass({
  mixins: [ModalManagerMixin],
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
