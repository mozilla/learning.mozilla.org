var EventEmitter = require('events').EventEmitter;
var sinon = window.sinon;

function StubTeachAPI() {
  var teachAPI = new EventEmitter();

  teachAPI.logout = sinon.spy();
  teachAPI.startLogin = sinon.spy();
  teachAPI.getUsername = sinon.stub();
  teachAPI.getAllClubsData = sinon.spy();

  return teachAPI;
}

module.exports = StubTeachAPI;
