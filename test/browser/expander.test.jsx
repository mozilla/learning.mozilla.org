var should = require('should');
var React =require('react/addons');
var TestUtils = React.addons.TestUtils;

var stubContext = require('./stub-context.jsx');
var Expander = require('../../components/expander.jsx');

describe("Expander", function() {
  var expander, itemContainer, itemHeader;

  beforeEach(function() {
    expander = stubContext.render(Expander, {});
    itemContainer = TestUtils.findRenderedDOMComponentWithClass(
      expander,
      'expand-div'
    );
    itemHeader = TestUtils.findRenderedDOMComponentWithClass(
      expander,
      'expander-header'
    );
  });

  afterEach(function() {
    stubContext.unmount(expander);
  });

  it('should hide collapsed content by default', function() {
    expander.state.expanded.should.be.false;
  });

  it('should hide collapsible content', function() {
    itemContainer.props.className.should.not.match(/expanded/);
  });

  it('should toggle collapsible content on click', function() {
    TestUtils.Simulate.click(itemHeader);
    itemContainer.props.className.should.match(/expanded/);
    TestUtils.Simulate.click(itemHeader);
    itemContainer.props.className.should.not.match(/expanded/);
  });

});
