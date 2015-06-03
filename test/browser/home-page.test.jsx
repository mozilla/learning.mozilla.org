var should = require('should');
var sinon = window.sinon;
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var stubContext = require('./stub-context.jsx');
var HomePage = require('../../pages/home.jsx');

describe("HomePage", function() {
  var blogSection;

  beforeEach(function() {
    blogSection = stubContext.render(HomePage.BlogSection);
  });

  describe("blogSection", function() {
    it("should display featured post", function(done) {
      process.nextTick(function() {
        blogSection.getDOMNode().querySelector(".featured-post .entry-title").textContent.should.eql("What’s next for Thimble?");
        done();
      });
    });
    it("should display 3 other latest posts", function(done) {
      process.nextTick(function() {
        var latestPostsTitle = blogSection.getDOMNode().querySelectorAll(".recent-posts .post-title");
        latestPostsTitle[0].textContent.should.eql("What’s next for Webmaker tools");
        latestPostsTitle[1].textContent.should.eql("Understanding Web Literacy within the Web Journey");
        latestPostsTitle[2].textContent.should.eql("Learning Through Making: The Best Kind of Education");
        done();
      });
    });
  });

  afterEach(function() {
    stubContext.unmount(blogSection);
  });
});
