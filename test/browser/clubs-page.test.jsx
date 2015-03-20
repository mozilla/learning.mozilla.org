var should = require('should');
var React =require('react/addons');
var TestUtils = React.addons.TestUtils;

var StubTeachAPI = require('./stub-teach-api');
var stubContext = require('./stub-context.jsx');
var ClubsPage = require('../../pages/clubs.jsx');

describe("ClubsPage", function() {
  var clubsPage, teachAPI, xhr;

  beforeEach(function() {
    // The map widget on the clubs page will try to use XHR. We want to
    // fake that so that network issues don't cause this test to fail,
    // and so that PhantomJS doesn't hang on us.
    xhr = sinon.useFakeXMLHttpRequest();

    teachAPI = new StubTeachAPI();
    clubsPage = stubContext.render(ClubsPage, {}, {
      teachAPI: teachAPI
    });
  });

  afterEach(function() {
    stubContext.unmount(clubsPage);
    xhr.restore();
  });

  it('triggers clubs update when mounted', function() {
    teachAPI.updateClubs.callCount.should.equal(1);
  });
});

describe("ClubsPage.ModalAddYourClub", function() {
  var modal;

  beforeEach(function() {
    modal = stubContext.render(ClubsPage.ModalAddYourClub, {
      onAddClub: function() {}
    });
  });

  afterEach(function() {
    stubContext.unmount(modal);
  });

  it("renders", function() {
    modal.getDOMNode().textContent.should.match(/add your club/i);
  });
});

describe("ClubsPage.ModalLearnMore", function() {
  var modal;

  beforeEach(function() {
    modal = stubContext.render(ClubsPage.ModalLearnMore);
  });

  afterEach(function() {
    stubContext.unmount(modal);
  });

  it("renders", function() {
    modal.getDOMNode().textContent.should.match(/learn more/i);
  });
});
