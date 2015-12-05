var should = require('should');
var sinon = window.sinon;
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var Modal = require('../../components/modal.jsx');

var neverCalled = function() {
  throw new Error("this should never be called");
};

var FakePage = React.createClass({
  childContextTypes: {
    hideModal: React.PropTypes.func.isRequired,
    showModal: React.PropTypes.func.isRequired
  },
  getChildContext: function() {
    return {
      hideModal: this.props.onHideModal,
      showModal: neverCalled
    };
  },
  render: function() {
    return (
      <div>
        <Modal ref="modal">
          <p>i am modal content</p>
        </Modal>
      </div>
    );
  }
});

describe("modal", function() {
  var page, modal, onClose;

  beforeEach(function() {
    onClose = sinon.spy();
    page = TestUtils.renderIntoDocument(<FakePage onHideModal={onClose}/>);
    modal = page.refs.modal;
  });

  afterEach(function() {
    React.unmountComponentAtNode(ReactDOM.findDOMNode(page).parentNode);
  });

  it('closes modal if and only if ESC is pressed', function() {
    // Ideally we'd fabricate a key event here, but doing
    // that in a cross-browser way is actually non-trivial,
    // so we'll just test the method.
    modal.handleKeyDown({which: 13});
    onClose.callCount.should.equal(0);

    modal.handleKeyDown({which: 27});
    onClose.callCount.should.equal(1);
  });

  it('closes modal when area outside modal is clicked', function() {
    TestUtils.Simulate.click(ReactDOM.findDOMNode(modal));
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
});
