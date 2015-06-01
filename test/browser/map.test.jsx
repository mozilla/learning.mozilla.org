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
  status: 'approved',
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
  status: 'approved',
  name: 'bar club'
};

var BROOKLYN_GEOJSON = {
  "id": "place.11201",
  "type": "Feature",
  "text": "Brooklyn",
  "place_name": "Brooklyn, 11226, New York, United States",
  "relevance": 0.99,
  "center": [-73.9496, 40.6501],
  "geometry": {
    "type": "Point",
    "coordinates": [-73.9496, 40.6501]
  },
  "bbox": [-74.04191000999859, 40.56959599007123, -73.8556849917723, 40.739421009998416],
  "properties": {},
  "context": [{
    "id": "postcode.1597206218",
    "text": "11226"
  }, {
    "id": "region.628083222",
    "text": "New York"
  }, {
    "id": "country.4150104525",
    "text": "United States"
  }]
};

var STYLESHEET_URL = 'data:text/css,' + encodeURIComponent([
  '.foo {',
  '  background: pink;',
  '}'
].join('\n'));

function renderMap(done) {
  return stubContext.render(Map, {
    className: 'foo',
    clubs: [],
    stylesheets: [STYLESHEET_URL],
    username: null,
    onDelete: sinon.spy(),
    onEdit: sinon.spy(),
    onReady: function() {
      process.nextTick(done);
    }
  }, {});
}

describe("Map", function() {
  var map, xhr;

  beforeEach(function(done) {
    // The map widget will try to use XHR. We want to
    // fake that so that network issues don't cause this test to fail,
    // and so that PhantomJS doesn't hang on us.
    xhr = sinon.useFakeXMLHttpRequest();
    map = renderMap(done);
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

  it("should load stylesheet(s) only once", function(done) {
    var map2, selector = 'link[href="' + STYLESHEET_URL + '"]';

    document.querySelectorAll(selector).length.should.equal(1);
    map2 = renderMap(function() {
      document.querySelectorAll(selector).length.should.equal(1);
      stubContext.unmount(map2);
      done();
    });
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

  it("should show when club is pending", function() {
    var club = _.extend({}, SAMPLE_FOO_CLUB, {status: 'pending'});
    var popup = TestUtils.renderIntoDocument(
      <Map.MarkerPopup clubs={[club]} username="bar" />
    );
    popup.getDOMNode().textContent.should.match(/pending/);
  });

  it("should show when club is denied", function() {
    var club = _.extend({}, SAMPLE_FOO_CLUB, {status: 'denied'});
    var popup = TestUtils.renderIntoDocument(
      <Map.MarkerPopup clubs={[club]} username="bar" />
    );
    popup.getDOMNode().textContent.should.match(/denied/);
  });

  it("should not show website when it is blank", function() {
    var club = _.extend({}, SAMPLE_FOO_CLUB, {website: ''});
    var popup = TestUtils.renderIntoDocument(
      <Map.MarkerPopup clubs={[club]} username="bar" />
    );
    var links = TestUtils.scryRenderedDOMComponentsWithTag(popup, 'a');
    links.length.should.eql(1);
  });

  it("should show website when it is present", function() {
    var popup = TestUtils.renderIntoDocument(
      <Map.MarkerPopup clubs={[SAMPLE_FOO_CLUB]} username="bar" />
    );
    var links = TestUtils.scryRenderedDOMComponentsWithTag(popup, 'a');
    links.length.should.eql(2);
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
          status: 'approved',
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

describe("Map.simplifyMapboxGeoJSON()", function() {
  var simplify = Map.simplifyMapboxGeoJSON;

  it("should ignore addresses", function() {
    simplify([{
      "id": "address.51466244506932",
      "place_name": "Brooklyn Rd, Brooklyn, 11210, New York, United States"
    }]).should.eql([]);
  });

  it("should accept places", function() {
    simplify([BROOKLYN_GEOJSON]).should.eql([{
      location: "Brooklyn, New York, United States",
      latitude: 40.6501,
      longitude: -73.9496
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
    requests[0].url.should.eql('//api.tiles.mapbox.com/v4/geocode/' +
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
    Map.getAutocompleteOptions('brooklyn', function(err, info) {
      should(err).equal(null);
      info.options.length.should.equal(1);
      JSON.parse(info.options[0].value).should.eql({
        location: "Brooklyn, New York, United States",
        latitude: 40.6501,
        longitude: -73.9496
      });
      info.options[0].label.should.eql("Brooklyn, New York, United States");
      done();
    });
    requests[0].respond(200, {
      'Content-Type': 'application/vnd.geo+json'
    }, JSON.stringify({
      features: [BROOKLYN_GEOJSON]
    }));
  });
});
