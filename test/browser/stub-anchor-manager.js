var sinon = window.sinon;

var AnchorManager = require('../../hoc/anchorManager');

var StubAnchorManager = function() {
  var manager = new AnchorManager();

  // Stub out the methods that access the window object.
  manager.initialize = sinon.stub();
  manager.getHash = sinon.stub();

  manager.simulateHashChange = function(hash) {
    manager.getHash.returns(hash);
    manager.handleHashChange();
  };

  return manager;
};

module.exports = StubAnchorManager;
