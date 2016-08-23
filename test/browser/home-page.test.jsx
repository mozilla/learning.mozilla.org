var should = require('should');
var sinon = window.sinon;
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');

var stubContext = require('./stub-context.jsx');
var StubRouter = require('./stub-router');
var HomePage = require('../../pages/home.jsx');
var ModalEmail = require('../../pages/home/ModalEmail.jsx');


var stubBlogFeedLoader = require('./stub-blog-feed-loader');
var Util = require('../util.js');

describe("HomePage", function() {
  var wrapped, homePage, newsletterBtn;

  if (localStorage) {
    localStorage.clear();
  }

  beforeEach(function() {
    homePage =  stubContext.render(HomePage);
    newsletterBtn = TestUtils.scryRenderedDOMComponentsWithClass(homePage, "icon-button")[0];
  });

  afterEach(function() {
    stubContext.unmount(homePage);
  });

  it("shows newsletter signup modal when 'Get Emaul updates' button is clicked", function() {
    var a = newsletterBtn.querySelector("a");
    TestUtils.Simulate.click(a);
    homePage.props.showModal.callCount.should.equal(1);
  });

  it("shows thank you modal if ?signup=thanks is in query", function() {
    var homePage2 = stubContext.render(HomePage, {}, {
      location: {
        search: '?signup=thanks'
      }
    });
    homePage2.props.showModal.callCount.should.equal(1);
    stubContext.unmount(homePage2);
  });

});

describe("HomePage.ModalEmail", function() {
  var modal;

  beforeEach(function() {
    modal = stubContext.render(ModalEmail);
  });

  afterEach(function() {
    if (modal) {
      stubContext.unmount(modal);
    }
  });

  it("renders", function() {
    ReactDOM.findDOMNode(modal).textContent.should.match(/Get Email Updates/i);
  });
});

describe("HomePage.BlogSection", function() {
  var BlogSection = require('../../pages/home/BlogSection.jsx');
  var blogSection;
  var respondWithBlogPosts;
  var fakeLoadBlogPosts = function(cb) {
    /* Hold on to the callback so we can trigger it later from our tests. */
    respondWithBlogPosts = cb;
  };

  beforeEach(function() {
    blogSection = stubContext.render(BlogSection, {loadBlogPosts: fakeLoadBlogPosts});
  });

  it("should not display featured post before data is loaded", function() {
    ReactDOM.findDOMNode(blogSection).querySelector(".featured-post").children.length.should.eql(0);
  });

  it("should not display latest posts before data is loaded", function() {
    ReactDOM.findDOMNode(blogSection).querySelector(".recent-posts").children.length.should.eql(0);
  });

  it("should display featured post after data has been loaded", function() {
    respondWithBlogPosts(stubBlogFeedLoader.FAKE_POSTS);
    ReactDOM.findDOMNode(blogSection).querySelector(".featured-post .entry-title").textContent.should.eql("What’s next for Thimble?");
  });

   it("should display 3 other latest posts after data has been loaded", function() {
    respondWithBlogPosts(stubBlogFeedLoader.FAKE_POSTS);
    var latestPostsTitle = ReactDOM.findDOMNode(blogSection).querySelectorAll(".recent-posts .post-title");
    latestPostsTitle[0].textContent.should.eql("What’s next for Webmaker tools");
    latestPostsTitle[1].textContent.should.eql("Understanding Web Literacy within the Web Journey");
    latestPostsTitle[2].textContent.should.eql("Learning Through Making: The Best Kind of Education");
  });

  afterEach(function() {
    stubContext.unmount(blogSection);
  });
});
