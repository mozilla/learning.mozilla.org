var should = require('should');
var sinon = window.sinon;
var React =require('react/addons');
var TestUtils = React.addons.TestUtils;
var Router = require('react-router');
var Link = Router.Link;

var teachAPI = require('../../lib/teach-api.js');
var routes = require('../../lib/routes.jsx');

describe('routes', function() {
  require('mapbox.js');

  beforeEach(function() {
    sinon.stub(teachAPI, 'getAllClubsData');
    sinon.stub(L.mapbox, 'map', function() {
      return {
        remove: function() {return this;},
        setView: function () {
          return {
            remove: function() {
              return this;
            },
            addLayer: function() {
              return {
                remove: function() {
                  return this;
                }
              };
            }
          };
        }
      }
    });

    sinon.stub(L.mapbox, 'featureLayer', function () {
      return {
        on: function () {},
        addTo: function () {
          return {
            on: function () {},
            setGeoJSON: function () {}
          }
        }
      }
    });
  });

  afterEach(function() {
    teachAPI.getAllClubsData.restore();
    L.mapbox.map.restore();
    L.mapbox.featureLayer.restore();
  });

  routes.URLS.forEach(function(url) {

    describe(url, function() {
      it('should contain 0 non-named links', function(done) {
        var nonNamedLinks = 0;
        Router.run(routes.routes, url, function(Handler) {
          var handler = TestUtils.renderIntoDocument(<Handler/>);
          var links = TestUtils.scryRenderedComponentsWithType(handler, Link);
          links.forEach(function(link) {
            if (link.props.to[0] == '/') {
              console.warn(url + ' contains non-named Link: ' + link.props.to);
              nonNamedLinks++;
            }
          });
          React.unmountComponentAtNode(handler.getDOMNode().parentNode);
          nonNamedLinks.should.equal(0);
          done();
        });
      });
    })
  });
});
