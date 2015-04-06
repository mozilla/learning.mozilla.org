var should = require('should');
var React =require('react/addons');
var TestUtils = React.addons.TestUtils;

var stubContext = require('./stub-context.jsx');
var Sidebar = require('../../components/sidebar.jsx');

describe("sidebar", function() {
  var sidebar, hamburger, collapsibleContent;

  beforeEach(function() {
    sidebar = stubContext.render(Sidebar, {});
    hamburger = TestUtils.findRenderedDOMComponentWithClass(
      sidebar,
      'glyphicon-menu-hamburger'
    );
    collapsibleContent = TestUtils.findRenderedDOMComponentWithClass(
      sidebar,
      'collapsible-content'
    );
  });

  afterEach(function() {
    stubContext.unmount(sidebar);
  });

  it('should hide collapsed content by default', function() {
    sidebar.state.showCollapsibleContent.should.be.false;
  });

  it('should hide collapsible content', function() {
    collapsibleContent.props.className.should.match(/hidden-xs/);
  });

  it('should show collapsible content', function() {
    sidebar.handleHamburgerClick();
    collapsibleContent.props.className.should.eql('collapsible-content');
  });

  describe('hamburger', function() {
    it('should toggle collapsible content on click', function() {
      TestUtils.Simulate.click(hamburger);
      sidebar.state.showCollapsibleContent.should.be.true;
      TestUtils.Simulate.click(hamburger);
      sidebar.state.showCollapsibleContent.should.be.false;
    });

    it('should toggle collapsible content on enter', function() {
      TestUtils.Simulate.keyDown(hamburger, {which: 13});
      sidebar.state.showCollapsibleContent.should.be.true;
      TestUtils.Simulate.keyDown(hamburger, {which: 13});
      sidebar.state.showCollapsibleContent.should.be.false;
    });

    it('should toggle collapsible content on space', function() {
      TestUtils.Simulate.keyDown(hamburger, {which: 32});
      sidebar.state.showCollapsibleContent.should.be.true;
      TestUtils.Simulate.keyDown(hamburger, {which: 32});
      sidebar.state.showCollapsibleContent.should.be.false;
    });

    it('should not toggle collapsible content on other keys', function() {
      TestUtils.Simulate.keyDown(hamburger, {which: 27});
      sidebar.state.showCollapsibleContent.should.be.false;
    });
  });
});
