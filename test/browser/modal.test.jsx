var should = require('should');
var sinon = window.sinon;
var React =require('react/addons');
var TestUtils = React.addons.TestUtils;

var Modal = require('../../components/modal.jsx');

var FakePage = React.createClass({
  childContextTypes: {
    hideModal: React.PropTypes.func.isRequired
  },
  getChildContext: function() {
    return {
      hideModal: this.props.onHideModal
    };
  },
  render: function() {
    return (
      <div>
        <Modal ref="modal">
          i am modal content
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
    React.unmountComponentAtNode(page.getDOMNode().parentNode);
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
});
