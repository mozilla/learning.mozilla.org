var should = require('should');
var sinon = window.sinon;
var React =require('react/addons');
var TestUtils = React.addons.TestUtils;

var Modal = require('../../components/modal.jsx');

describe("modal", function() {
  var modal, onClose;

  function removeModal() {
    if (modal) {
      React.unmountComponentAtNode(modal.getDOMNode().parentNode);
      modal = null;
    }
  }

  beforeEach(function() {
    onClose = sinon.spy();
    modal = TestUtils.renderIntoDocument(
      <Modal onClose={onClose}>
        i am modal content
      </Modal>
    );
  });

  afterEach(removeModal);

  it('creates body > .modal-backdrop when mounted', function() {
    document.querySelectorAll('body > .modal-backdrop').length
      .should.equal(1);
  });

  it('removes body > .modal-backdrop when mounted', function() {
    removeModal();
    document.querySelectorAll('body > .modal-backdrop').length
      .should.equal(0);
  });
});
