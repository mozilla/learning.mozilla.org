var should = require('should');
var sinon = window.sinon;

var TeachAPI = require('../../lib/teach-api');

describe('TeachAPI', function() {
  var xhr;

  beforeEach(function() {
    xhr = sinon.useFakeXMLHttpRequest();
  });

  afterEach(function() {
    xhr.restore();
  });

  it('should instantiate', function() {
    var api = new TeachAPI();


  });
});
