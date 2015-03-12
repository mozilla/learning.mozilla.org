var should = require('should');
var React =require('react/addons');
var TestUtils = React.addons.TestUtils;

var stubRouterContext = require('./stub-router-context.jsx');
var Sidebar = require('../../components/sidebar.jsx');

describe("sidebar", function() {
  var sidebar, hamburger, collapsibleContent;

  beforeEach(function() {
    sidebar = stubRouterContext.render(Sidebar, {});
    hamburger = TestUtils.findRenderedDOMComponentWithClass(
      sidebar,
      'glyphicon-menu-hamburger'
    );
    collapsibleContent = TestUtils.findRenderedDOMComponentWithClass(
      sidebar,
      'collapsible-content'
    );
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

    it('should toggle collapsible content on keydown', function() {
      TestUtils.Simulate.keyDown(hamburger, {key: 'Enter'});
      sidebar.state.showCollapsibleContent.should.be.true;
      TestUtils.Simulate.keyDown(hamburger, {key: 'Enter'});
      sidebar.state.showCollapsibleContent.should.be.false;
    });
  });
});
