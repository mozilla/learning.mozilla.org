var should = require('should');
var sinon = window.sinon;
var React =require('react/addons');
var Router = require('react-router');
var TestUtils = React.addons.TestUtils;

var routes = require('../../lib/routes.jsx');
var Page = require('../../components/page.jsx');

var FakeModal = React.createClass({
  render: function() {
    return <div>I am a fake modal</div>;
  }
});

describe("page", function() {
  var handler, page;

  beforeEach(function(done) {
    Router.run(routes.routes, '/', function(Handler) {
      handler = TestUtils.renderIntoDocument(<Handler/>);
      page = TestUtils.findAllInRenderedTree(handler, function(c) {
        return !!c.showModal;
      })[0];
      done();
    });
  });

  afterEach(function() {
    React.unmountComponentAtNode(handler.getDOMNode().parentNode);
  });

  it("adds body.modal-open when modal is visible", function() {
    document.body.className.should.not.match(/modal-open/);
    page.showModal(FakeModal);
    document.body.className.should.match(/modal-open/);
    page.hideModal(FakeModal);
    document.body.className.should.not.match(/modal-open/);
  });
});
