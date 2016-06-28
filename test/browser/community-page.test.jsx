var should = require('should');
var React = require('react');
var TestUtils = require('react-addons-test-utils');

var stubContext = require('./stub-context.jsx');
var StubRouter = require('./stub-router');
var CommunityPage = require('../../pages/community.jsx');

var Util = require('../util.js');

describe("CommunityPage", function() {
  var communityPage, signupBtn;

  beforeEach(function() {
    communityPage = stubContext.render(CommunityPage);
    signupBtn = TestUtils.scryRenderedDOMComponentsWithClass(communityPage, "icon-button")[0];
  });

  afterEach(function() {
    stubContext.unmount(CommunityPage);
  });

});
