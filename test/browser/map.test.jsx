var should = require('should');
var sinon = window.sinon;
var React =require('react/addons');
var TestUtils = React.addons.TestUtils;

var Map = require('../../components/map.jsx');
var stubContext = require('./stub-context.jsx');

var SAMPLE_FOO_CLUB = {
  latitude: 2,
  longitude: 1,
  url: 'http://server/clubs/1/',
  owner: 'foo',
  description: 'my club',
  website: 'http://example.org/',
  location: 'fooville',
  name: 'my club'
};

var SAMPLE_BAR_CLUB = {
  latitude: 3,
  longitude: 4,
  url: 'http://server/clubs/2/',
  owner: 'bar',
  description: 'bar club',
  website: 'http://example.org/bar',
  location: 'barville',
  name: 'bar club'
};

describe("Map", function() {
  var map, xhr;

  beforeEach(function(done) {
    // The map widget will try to use XHR. We want to
    // fake that so that network issues don't cause this test to fail,
    // and so that PhantomJS doesn't hang on us.
    xhr = sinon.useFakeXMLHttpRequest();
    map = stubContext.render(Map, {
      className: 'foo',
      clubs: [],
      username: null,
      onDelete: sinon.spy(),
      onEdit: sinon.spy(),
      onReady: function() {
        process.nextTick(done);
      }
    }, {});
  });

  afterEach(function() {
    stubContext.unmount(map);
    xhr.restore();
  });

  it("should render", function() {
    map.getDOMNode().className.should.match(/foo/);
  });

  it("should load leaflet + markercluster", function() {
    L.mapbox.map.should.be.a.Function;
    L.MarkerClusterGroup.should.be.a.Function;
  });
});

describe("Map.MarkerPopup", function() {
  function findButtons(popup) {
    return TestUtils.scryRenderedDOMComponentsWithClass(popup, 'btn');
  }

  it("should not show club management buttons when unowned", function() {
    var popup = TestUtils.renderIntoDocument(
      <Map.MarkerPopup clubs={[SAMPLE_FOO_CLUB]} username="bar" />
    );
    findButtons(popup).length.should.equal(0);
  });

  it("should show club management buttons when owned", function() {
    var popup = TestUtils.renderIntoDocument(
      <Map.MarkerPopup clubs={[SAMPLE_FOO_CLUB]} username="foo" />
    );
    findButtons(popup).length.should.equal(2);
  });

  it("should not show website when it is blank", function() {
    var club = _.extend({}, SAMPLE_FOO_CLUB, {website: ''});
    var popup = TestUtils.renderIntoDocument(
      <Map.MarkerPopup clubs={[club]} username="bar" />
    );
    var links = TestUtils.scryRenderedDOMComponentsWithTag(popup, 'a');
    links.length.should.eql(0);
  });

  it("should show website when it is present", function() {
    var popup = TestUtils.renderIntoDocument(
      <Map.MarkerPopup clubs={[SAMPLE_FOO_CLUB]} username="bar" />
    );
    var links = TestUtils.scryRenderedDOMComponentsWithTag(popup, 'a');
    links.length.should.eql(1);
  });
});

describe("Map.clubsToGeoJSON()", function() {
  it("should convert to geoJSON", function() {
    Map.clubsToGeoJSON([SAMPLE_FOO_CLUB]).should.eql([{
      type: 'Feature',
      geometry: {
        coordinates: [1, 2],
        type: "Point"
      }, properties: {
        clubs: [{
          url: 'http://server/clubs/1/',
          owner: 'foo',
          description: 'my club',
          website: 'http://example.org/',
          location: 'fooville',
          title: 'my club'
        }]
      }
    }]);
  });

  it("should not group clubs in different locations together", function() {
    var geoJSON = Map.clubsToGeoJSON([SAMPLE_FOO_CLUB, SAMPLE_BAR_CLUB]);
    geoJSON.length.should.eql(2);
    geoJSON[0].properties.clubs.length.should.eql(1);
    geoJSON[1].properties.clubs.length.should.eql(1);
  });

  it("should group clubs in the same locations together", function() {
    var geoJSON = Map.clubsToGeoJSON([
      SAMPLE_FOO_CLUB,
      _.extend({}, SAMPLE_BAR_CLUB, {
        latitude: SAMPLE_FOO_CLUB.latitude,
        longitude: SAMPLE_FOO_CLUB.longitude,
      })
    ]);
    geoJSON.length.should.eql(1);
    geoJSON[0].properties.clubs.length.should.eql(2);
  });
});

describe("Map.getAutocompleteOptions()", function() {
  var xhr, requests;

  beforeEach(function() {
    requests = [];
    Map.setAccessToken('mytoken');
    sinon.stub(process, 'nextTick');
    xhr = sinon.useFakeXMLHttpRequest();
    xhr.onCreate = function(xhr) {
      requests.push(xhr);
    };
  });

  afterEach(function() {
    xhr.restore();
    process.nextTick.restore();
  });

  it("should return empty results on empty input", function(done) {
    Map.getAutocompleteOptions('', function(err, info) {
      should(err).equal(null);
      info.options.should.eql([]);
      done();
    });
    process.nextTick.callCount.should.eql(1);
    process.nextTick.getCall(0).args[0]();
  });

  it("should query mapbox for results", function() {
    Map.getAutocompleteOptions('blah', function() {});
    requests.length.should.eql(1);
    requests[0].method.should.eql('get');
    requests[0].url.should.eql('http://api.tiles.mapbox.com/v4/geocode/' +
                               'mapbox.places/blah.json?' +
                               'access_token=mytoken');
  });

  it("should pass errors back to callback", function(done) {
    Map.getAutocompleteOptions('blah', function(err) {
      err.message.should.eql("Internal Server Error");
      done();
    });
    requests[0].respond(500);
  });

  it("should pass results back to callback", function(done) {
    Map.getAutocompleteOptions('blah', function(err, info) {
      should(err).equal(null);
      info.options.length.should.equal(1);
      JSON.parse(info.options[0].value).should.eql({
        location: "Somewhere",
        latitude: 2,
        longitude: 1
      });
      info.options[0].label.should.eql("Somewhere");
      done();
    });
    requests[0].respond(200, {
      'Content-Type': 'application/vnd.geo+json'
    }, JSON.stringify({
      features: [{
        place_name: "Somewhere",
        center: [1, 2]
      }]
    }));
  });
});
