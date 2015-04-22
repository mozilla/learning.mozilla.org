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
  var handler, page, xhr, originalTitle;

  function visitPage(url, cb) {
    Router.run(routes.routes, url, function(Handler) {
      handler = TestUtils.renderIntoDocument(<Handler/>);
      page = TestUtils.findAllInRenderedTree(handler, function(c) {
        return !!c.showModal;
      })[0];
      cb();
    });
  }

  beforeEach(function() {
    xhr = sinon.useFakeXMLHttpRequest();
    originalTitle = document.title;
    handler = null;
    page = null;
  });

  afterEach(function() {
    if (handler) {
      React.unmountComponentAtNode(handler.getDOMNode().parentNode);
    }
    xhr.restore();
    document.title = originalTitle;
  });

  it("adds body.modal-open when modal is visible", function(done) {
    visitPage('/', function() {
      document.body.className.should.not.match(/modal-open/);
      page.showModal(FakeModal);
      document.body.className.should.match(/modal-open/);
      page.hideModal(FakeModal);
      document.body.className.should.not.match(/modal-open/);
      done();
    });
  });

  it("sets default page title when pageTitle is undefined", function(done) {
    visitPage('/', function() {
      page.componentDidUpdate(page.props, page.state);
      document.title.should.equal("Mozilla Learning");
      done();
    });
  });

  it("sets page title when pageTitle is a string", function(done) {
    visitPage('/fixme/', function() {
      page.componentDidUpdate(page.props, page.state);
      document.title.should.equal("[FIXME] - Mozilla Learning");
      done();
    });
  });
});
