var EventEmitter = require('events').EventEmitter;
var sinon = window.sinon;

function StubTeachAPI() {
  var teachAPI = new EventEmitter();

  teachAPI.logout = sinon.spy();
  teachAPI.startLogin = sinon.spy();
  teachAPI.getUsername = sinon.stub();
  teachAPI.getClubs = sinon.stub();
  teachAPI.updateClubs = sinon.spy();
  teachAPI.addClub = sinon.spy();

  teachAPI.getUsername.returns(null);
  teachAPI.getClubs.returns([]);

  return teachAPI;
}

module.exports = StubTeachAPI;
