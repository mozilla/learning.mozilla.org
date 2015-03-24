var should = require('should');
var sinon = window.sinon;
var React =require('react/addons');
var TestUtils = React.addons.TestUtils;

var Map = require('../../components/map.jsx');
var stubContext = require('./stub-context.jsx');

describe("Map", function() {
  var map, xhr;

  beforeEach(function() {
    // The map widget will try to use XHR. We want to
    // fake that so that network issues don't cause this test to fail,
    // and so that PhantomJS doesn't hang on us.
    xhr = sinon.useFakeXMLHttpRequest();
    map = stubContext.render(Map, {
      className: 'foo',
      clubs: [],
      username: null,
      onDelete: sinon.spy(),
      onEdit: sinon.spy()
    }, {});
  });

  afterEach(function() {
    stubContext.unmount(map);
    xhr.restore();
  });

  it("should render", function() {
    map.getDOMNode().className.should.match(/foo/);
  });
});

describe("Map.clubsToGeoJSON()", function() {
  it("should work", function() {
    Map.clubsToGeoJSON([{
      latitude: 2,
      longitude: 1,
      url: 'http://server/clubs/1/',
      owner: 'foo',
      description: 'my club',
      website: 'http://example.org/',
      location: 'fooville',
      name: 'my club'
    }]).should.eql([{
      type: 'Feature',
      geometry: {
        coordinates: [1, 2],
        type: "Point"
      }, properties: {
        url: 'http://server/clubs/1/',
        owner: 'foo',
        description: 'my club',
        website: 'http://example.org/',
        location: 'fooville',
        title: 'my club'
      }
    }]);
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
