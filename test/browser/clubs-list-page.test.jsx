var _ = require('underscore');
var should = require('should');
var sinon = window.sinon;
var React =require('react/addons');
var TestUtils = React.addons.TestUtils;

var StubTeachAPI = require('./stub-teach-api');
var stubContext = require('./stub-context.jsx');
var ClubsListPage = require('../../pages/clubs-list.jsx');


describe("ClubsListPage", function() {
  var clubsListPage, teachAPI, xhr;

  beforeEach(function() {
    // The map widget on the clubs page will try to use XHR. We want to
    // fake that so that network issues don't cause this test to fail,
    // and so that PhantomJS doesn't hang on us.
    xhr = sinon.useFakeXMLHttpRequest();

    teachAPI = new StubTeachAPI();
    clubsListPage = stubContext.render(ClubsListPage, {}, {
      teachAPI: teachAPI
    });
  });

  afterEach(function() {
    stubContext.unmount(clubsListPage);
    xhr.restore();
  });
});

describe("ClubsListPage.ClubLists", function() {
  var ClubLists = ClubsListPage.ClubLists;
  var noop = function() {};
  var clubs = [{
    owner: 'foo',
    website: 'http://example.org',
    location: 'Somewhere, USA',
    status: 'approved',
    name: 'foo club'
  }, {
    owner: 'bar',
    website: 'http://example.org/bar',
    location: 'Somewhere Else, USA',
    status: 'pending',
    name: 'bar club'
  }];
  var renderLists = function(props) {
    props = _.extend({
      clubs: clubs,
      onDelete: noop,
      onEdit: noop,
      onZoomToLocation: noop
    }, props);
    return TestUtils.renderIntoDocument(<ClubLists {...props}/>);
  };

  it("doesn't show 'My Clubs' when logged out", function() {
    var lists = renderLists();
    lists.getDOMNode().textContent.should.not.match(/My Clubs/);
  });

  it("shows 'My Clubs' when logged-in user has clubs", function() {
    var lists = renderLists({username: 'foo'});
    lists.getDOMNode().textContent.should.match(/My Clubs/);
  });

  it("properly separates user's clubs from other clubs", function() {
    var lists = renderLists({username: 'foo'})
    lists.state.userClubs.should.eql([clubs[0]]);
    lists.state.otherClubs.should.eql([clubs[1]]);
  });

  it("doesn't show note about unapproved clubs if there aren't any", function() {
    var lists = renderLists({username: 'foo'});
    lists.getDOMNode().textContent.should.not.match(/Note:/);
    lists.state.userHasUnapprovedClubs.should.be.false;
  });

  it("shows note about unapproved clubs if there are any", function() {
    var lists = renderLists({username: 'bar'});
    lists.getDOMNode().textContent.should.match(/Note:/);
    lists.state.userHasUnapprovedClubs.should.be.true;
  });

  it("updates its state when its props change", function() {
    var lists = renderLists({clubs: []});
    lists.state.userHasUnapprovedClubs.should.be.false;
    lists.componentWillReceiveProps({ clubs: clubs, username: 'bar' });
    lists.state.userHasUnapprovedClubs.should.be.true;
  });
});

describe("ClubsListPage.ClubList", function() {
  var ClubList = ClubsListPage.ClubList;
  var Item = ClubList.Item;
  var noop = function() {};
  var clubs = [{
    url: 'http://api/clubs/1/',
    owner: 'foo',
    website: 'http://example.org',
    location: 'Somewhere, USA',
    status: 'approved',
    name: 'foo club'
  }];
  var renderList = function(props) {
    props = _.extend({
      clubs: clubs,
      onDelete: noop,
      onEdit: noop,
      onZoomToLocation: noop
    }, props);
    return TestUtils.renderIntoDocument(<ClubList {...props}/>);
  };

  it("shows 1 club, passes expected props to it", function() {
    var list = renderList({username: 'meh'});
    var items = TestUtils.scryRenderedComponentsWithType(list, Item);
    items.length.should.equal(1);
    items[0].props.onEdit.should.equal(noop);
    items[0].props.onDelete.should.equal(noop);
    items[0].props.onZoomToLocation.should.equal(noop);
    items[0].props.username.should.eql("meh");
    items[0].props.club.should.eql(clubs[0]);
  });

  describe("Item", function() {
    var renderItem = function(props) {
      props = _.extend({
        club: clubs[0],
        onDelete: noop,
        onEdit: noop,
        onZoomToLocation: noop
      }, props);
      return TestUtils.renderIntoDocument(<Item {...props}/>);
    };

    it("hides edit controls when unowned", function() {
      var item = renderItem({username: 'a'});
      var btns = TestUtils.scryRenderedDOMComponentsWithTag(item, 'button');
      btns.length.should.equal(0);
    });

    it("shows pending info when status is pending", function() {
      var item = renderItem({
        club: _.extend({}, clubs[0], { status: 'pending' })
      });
      item.getDOMNode().textContent.should.match(/pending/);
    });

    it("shows denied info when status is denied", function() {
      var item = renderItem({
        club: _.extend({}, clubs[0], { status: 'denied' })
      });
      item.getDOMNode().textContent.should.match(/denied/);
    });

    describe("buttons", function() {
      var item, onEdit, onDelete, onZoomToLocation, editBtn, deleteBtn;

      beforeEach(function() {
        onEdit = sinon.spy();
        onDelete = sinon.spy();
        onZoomToLocation = sinon.spy();
        item = renderItem({
          username: 'foo',
          onDelete: onDelete,
          onEdit: onEdit,
          onZoomToLocation: onZoomToLocation
        });
        var btns = TestUtils.scryRenderedDOMComponentsWithTag(item, 'button');
        btns.length.should.equal(2);

        editBtn = btns[0];
        deleteBtn = btns[1];
      });

      it("should call onEdit", function() {
        onEdit.callCount.should.eql(0);
        TestUtils.Simulate.click(editBtn);
        onEdit.callCount.should.eql(1);
        onEdit.getCall(0).args[0].should.eql('http://api/clubs/1/');
      });

      it("should call onDelete", function() {
        onDelete.callCount.should.eql(0);
        TestUtils.Simulate.click(deleteBtn);
        onDelete.callCount.should.eql(1);
        onDelete.getCall(0).args[0].should.eql('http://api/clubs/1/');
        onDelete.getCall(0).args[1].should.eql('foo club');
      });

      it("should call onZoomToLocation", function() {
        var loc = TestUtils.findRenderedDOMComponentWithClass(item, 'club-location');
        onZoomToLocation.callCount.should.eql(0);
        TestUtils.Simulate.click(loc);
        onZoomToLocation.callCount.should.eql(1);
        onZoomToLocation.getCall(0).args[0].should.equal(clubs[0]);
      });
    });
  });
});
