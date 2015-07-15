var should = require('should');
var sinon = window.sinon;
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var stubContext = require('./stub-context.jsx');
var StubRouter = require('./stub-router');
var HomePage = require('../../pages/home.jsx');

var stubBlogFeedLoader = require('./stub-blog-feed-loader');
var Util = require('../util.js');

describe("HomePage", function() {
  var homePage, pledgeBtn;

  beforeEach(function() {
    homePage =  stubContext.render(HomePage);
    pledgeBtn = TestUtils.scryRenderedDOMComponentsWithClass(homePage, "icon-button")[0];
  });

  afterEach(function() {
    stubContext.unmount(homePage);
  });

  it("does not show pledge modal by default", function() {
    TestUtils.scryRenderedDOMComponentsWithClass(homePage, "modal-pledge").length.should.equal(0);
  });

  it("shows pledge modal when 'Pledge to Teach' button is clicked", function() {
    TestUtils.Simulate.click(TestUtils.findRenderedDOMComponentWithTag(pledgeBtn, "a"));
    homePage.context.showModal.callCount.should.equal(1);
  });

  it("shows thank you modal if ?pledge=thanks is in query", function() {
    var homePage2 = stubContext.render(HomePage, {}, {
      router: new StubRouter({
        currentQuery: {'pledge': 'thanks'}
      })
    });
    homePage2.context.showModal.callCount.should.equal(1);
    stubContext.unmount(homePage2);
  });

});

describe("HomePage.ModalPledge", function() {
  var modal;

  beforeEach(function() {
    modal = stubContext.render(HomePage.ModalPledge);
  });

  afterEach(function() {
    if (modal) {
      stubContext.unmount(modal);
    }
  })

  it("renders", function() {
    modal.getDOMNode().textContent.should.match(/pledge to teach/i);
  });
});

describe("HomePage.PledgeSignupForm", function() {
  var pledgeSignupForm, validateSignupForm;

  beforeEach(function() {
    pledgeSignupForm = stubContext.render(HomePage.PledgeSignupForm, {idPrefix: "pledge-form-"});
    validateSignupForm = HomePage.validateSignupForm;
  });

  afterEach(function() {
    stubContext.unmount(pledgeSignupForm);
  })

  it("has valid labels", function() {
    Util.ensureLabelLinkage(pledgeSignupForm, 'pledge-form-email');
    Util.ensureLabelLinkage(pledgeSignupForm, 'pledge-form-privacy');
  });

  it("does not show any errors by default", function() {
    pledgeSignupForm.state.validationErrors.length.should.equal(0);
  });

  it("shows form validation errors when 'email' is left blank", function() {
    validateSignupForm( {email: ""} ).should.eql([
      "Please enter an email address."
    ]);
  });

  it("shows error message for invalid 'email'", function() {
    validateSignupForm( {email: "123"} ).should.eql([
      "Please enter an email address."
    ]);
    validateSignupForm( {email: "helloworld.example.com"} ).should.eql([
      "Please enter an email address."
    ]);
    validateSignupForm( {email: "@"} ).should.eql([
      "Please enter an email address."
    ]);
  });

  it("hides form validation error when 'email' is valid", function() {
    validateSignupForm( {email: "hellomofo@example.com"} ).should.eql([]);
  });
});


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
