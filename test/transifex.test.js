var path = require('path');
var _ = require('underscore');
var should = require('should');
var nock = require('nock');

var TransifexFileStream = require('../lib/transifex');

var SAMPLE_STATS = {
  "en_US": {
    "reviewed_percentage": "0%", 
    "completed": "100%", 
    "untranslated_words": 0, 
    "last_commiter": "aali", 
    "reviewed": 0, 
    "translated_entities": 108, 
    "translated_words": 867, 
    "last_update": "2014-08-15 09:49:02", 
    "untranslated_entities": 0
  }, 
  "es": {
    "reviewed_percentage": "97%", 
    "completed": "100%", 
    "untranslated_words": 0, 
    "last_commiter": "inma610", 
    "reviewed": 105, 
    "translated_entities": 108, 
    "translated_words": 867, 
    "last_update": "2015-04-15 13:35:39", 
    "untranslated_entities": 0
  },
  "ta_IN": {
    "reviewed_percentage": "0%", 
    "completed": "0%", 
    "untranslated_words": 866, 
    "last_commiter": "aali", 
    "reviewed": 0, 
    "translated_entities": 1, 
    "translated_words": 1, 
    "last_update": "2014-11-09 21:59:44", 
    "untranslated_entities": 107
  }
};

var SAMPLE_ES_STRINGS = [
  {
    "comment": "", 
    "context": "", 
    "key": "StandardBuildingRemixingPoint1", 
    "reviewed": true, 
    "pluralized": false, 
    "source_string": "Identifying and using openly-licensed work", 
    "translation": "Identificar y usar trabajos con licencias abiertas "
  }, 
  {
    "comment": "", 
    "context": "", 
    "key": "StandardExploringWM", 
    "reviewed": true, 
    "pluralized": false, 
    "source_string": "Web Mechanics", 
    "translation": "Mecánica de la Web"
  }, 
  {
    "comment": "", 
    "context": "", 
    "key": "StandardBuildingCodingPoint4", 
    "reviewed": true, 
    "pluralized": false, 
    "source_string": "Using a script framework", 
    "translation": "Usar un framework de código"
  }
];

var SAMPLE_EN_US_STRINGS = SAMPLE_ES_STRINGS.map(function(info) {
  return _.extend({}, info, {translation: ''});
});

describe('TransifexFileStream', function() {
  it('should emit Vinyl file objects', function(done) {
    var stream = new TransifexFileStream({
      project: 'webmaker',
      resource: 'weblit',
      user: 'foo',
      pass: 'bar'
    });
    var transifex = nock('http://www.transifex.com/')
      .get('/api/2/project/webmaker/resource/weblit/stats/')
      .basicAuth({user: 'foo', pass: 'bar'})
      .reply(200, SAMPLE_STATS)
      .get('/api/2/project/webmaker/resource/weblit/translation/es/strings')
      .basicAuth({user: 'foo', pass: 'bar'})
      .reply(200, SAMPLE_ES_STRINGS)
      .get('/api/2/project/webmaker/resource/weblit/translation/en_US/strings')
      .basicAuth({user: 'foo', pass: 'bar'})
      .reply(200, SAMPLE_EN_US_STRINGS);
    var files = [];

    stream.on('data', function(file) {
      files.push({
        path: '/' + path.relative(file.base, file.path)
          .split(path.sep).join('/'),
        contents: JSON.parse(file.contents)
      });
    });
    stream.on('end', function() {
      files.should.eql([{
        path: '/en_US.json',
        contents: {
          'StandardBuildingRemixingPoint1': 'Identifying and using openly-licensed work',
          'StandardExploringWM': 'Web Mechanics',
          'StandardBuildingCodingPoint4': 'Using a script framework'
        }
      }, {
        path: '/es.json',
        contents: {
          'StandardBuildingRemixingPoint1': 'Identificar y usar trabajos con licencias abiertas ',
          'StandardExploringWM': 'Mecánica de la Web',
          'StandardBuildingCodingPoint4': 'Usar un framework de código'
        }
      }]);
      transifex.done();
      done();
    });
  });
});
