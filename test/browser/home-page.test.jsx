var should = require('should');
var sinon = window.sinon;
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var stubContext = require('./stub-context.jsx');
var HomePage = require('../../pages/home.jsx');

var stubBlogFeedLoader = require('./stub-blog-feed-loader');

describe("HomePage.BlogSection", function() {
  var blogSection;
  var respondWithBlogPosts;
  var fakeLoadBlogPosts = function(cb) {
    /* Hold on to the callback so we can trigger it later from our tests. */
    respondWithBlogPosts = cb;
  };

  beforeEach(function() {
    blogSection = stubContext.render(HomePage.BlogSection, {loadBlogPosts: fakeLoadBlogPosts});
  });

  it("should not display featured post before data is loaded", function() {
    blogSection.getDOMNode().querySelector(".featured-post").children.length.should.eql(0);
  });

  it("should not display latest posts before data is loaded", function() {
    blogSection.getDOMNode().querySelector(".recent-posts").children.length.should.eql(0);
  });

  it("should display featured post after data has been loaded", function() {
    respondWithBlogPosts(stubBlogFeedLoader.FAKE_POSTS);
    blogSection.getDOMNode().querySelector(".featured-post .entry-title").textContent.should.eql("What’s next for Thimble?");
  });

   it("should display 3 other latest posts after data has been loaded", function() {
    respondWithBlogPosts(stubBlogFeedLoader.FAKE_POSTS);
    var latestPostsTitle = blogSection.getDOMNode().querySelectorAll(".recent-posts .post-title");
    latestPostsTitle[0].textContent.should.eql("What’s next for Webmaker tools");
    latestPostsTitle[1].textContent.should.eql("Understanding Web Literacy within the Web Journey");
    latestPostsTitle[2].textContent.should.eql("Learning Through Making: The Best Kind of Education");
  });

  afterEach(function() {
    stubContext.unmount(blogSection);
  });
});
