var should = require('should');
var React =require('react');
var TestUtils = require('react-addons-test-utils');

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
    collapsibleContent.getAttribute("class").should.match(/collapsed/);
  });

  it('should show collapsible content', function() {
    sidebar.handleHamburgerClick();
    collapsibleContent.getAttribute("class").should.eql('collapsible-content');
  });

  it('should show collapsible content when focused', function() {
    TestUtils.Simulate.focus(collapsibleContent);
    collapsibleContent.getAttribute("class").should.eql('collapsible-content');
  });

  describe('hamburger', function() {
    it('should toggle collapsible content on click', function() {
      TestUtils.Simulate.click(hamburger);
      sidebar.state.showCollapsibleContent.should.be.true;
      TestUtils.Simulate.click(hamburger);
      sidebar.state.showCollapsibleContent.should.be.false;
    });
  });
});
