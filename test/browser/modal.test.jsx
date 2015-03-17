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

  it('closes modal when area outside modal is clicked', function() {
    TestUtils.Simulate.click(modal.getDOMNode());
    onClose.callCount.should.equal(1);
  });

  it('closes modal when close button is clicked', function() {
    var closeButton = TestUtils.findRenderedDOMComponentWithClass(
      modal,
      'close'
    );
    TestUtils.Simulate.click(closeButton);
    onClose.callCount.should.equal(1);
  });

  it('does not close modal when title is clicked', function() {
    var title = TestUtils.findRenderedDOMComponentWithClass(
      modal,
      'modal-title'
    );
    TestUtils.Simulate.click(title);
    onClose.callCount.should.equal(0);
  });

  it('creates body > .modal-backdrop when mounted', function() {
    document.querySelectorAll('body > .modal-backdrop').length
      .should.equal(1);
  });

  it('removes body > .modal-backdrop when unmounted', function() {
    removeModal();
    document.querySelectorAll('body > .modal-backdrop').length
      .should.equal(0);
  });
});
