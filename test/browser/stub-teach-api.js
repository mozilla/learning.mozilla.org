var EventEmitter = require('events').EventEmitter;
var sinon = window.sinon;

function StubTeachAPI() {
  var teachAPI = new EventEmitter();

  teachAPI.logout = sinon.spy();
  teachAPI.getUsername = sinon.stub();
  teachAPI.getClubs = sinon.stub();
  teachAPI.updateClubs = sinon.spy();
  teachAPI.addClub = sinon.spy();
  teachAPI.changeClub = sinon.spy();
  teachAPI.deleteClub = sinon.spy();
  teachAPI.checkLoginStatus = sinon.spy();

  teachAPI.getUsername.returns(null);
  teachAPI.getClubs.returns([]);

  return teachAPI;
}

module.exports = StubTeachAPI;
