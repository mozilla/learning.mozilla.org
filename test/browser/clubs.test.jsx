var EventEmitter = require('events').EventEmitter;
var should = require('should');
var sinon = window.sinon;
var React = require('react');
var TestUtils = require('react-addons-test-utils');

var StubTeachAPI = require('./stub-teach-api');
var StubRouter = require('./stub-router');
var stubContext = require('./stub-context.jsx');
var ClubsPage = require('../../pages/clubs/About.jsx');

describe("Clubs", function() {
  var clubsPage, teachAPI, xhr;

  beforeEach(function() {
    // The map widget on the clubs page will try to use XHR. We want to
    // fake that so that network issues don't cause this test to fail,
    // and so that PhantomJS doesn't hang on us.
    xhr = sinon.useFakeXMLHttpRequest();

    teachAPI = new StubTeachAPI();
    clubsPage = stubContext.render(ClubsPage, {
      teachAPI: teachAPI
    }, {
      location: { search: "" }
    }).getComponent();
  });

  afterEach(function() {
    stubContext.unmount(clubsPage);
    xhr.restore();
  });

  it('triggers clubs update when mounted', function() {
    teachAPI.updateClubs.callCount.should.equal(1);
  });

  it('doesn\'t show add modal if ?modal=add isn\'t in query', function() {
    clubsPage.props.showModal.callCount.should.equal(0);
  });

  it('shows add modal if ?modal=add is in query', function() {
    var clubsPage2 = stubContext.render(ClubsPage, {}, {
      location: { search: "?modal=add" }
    }).getComponent();
    clubsPage2.props.showModal.callCount.should.equal(1);
    stubContext.unmount(clubsPage2);
  });
});
