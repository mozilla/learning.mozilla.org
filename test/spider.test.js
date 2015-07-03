var should = require('should');

var spider = require('./browser/spider');

describe("findSrcSetURLs", function() {
  it("works with one 2x resource", function() {
    spider.findSrcSetURLs('<img srcset="/blah.jpg 2x">')
      .should.eql(['/blah.jpg']);
  });

  it("resolves relative URLs to absolute URLs", function() {
    spider.findSrcSetURLs('<img srcset="/u/blah.jpg 2x">', 'http://boop/')
      .should.eql(['http://boop/u/blah.jpg']);
  });

  it("works with one 1000w resource", function() {
    spider.findSrcSetURLs('<img srcset="/blah.jpg 1000w">')
      .should.eql(['/blah.jpg']);
  });

  it("works with two resources", function() {
    spider.findSrcSetURLs('<img srcset="/blah.jpg 2x, /meh.jpg 3x">')
      .should.eql(['/blah.jpg', '/meh.jpg']);
  });

  it("works with null srcset attribute", function() {
    spider.findSrcSetURLs('<img srcset="">')
      .should.eql([]);
  });

  it("works with no srcset attribute", function() {
    spider.findSrcSetURLs('<img src="/blah.jpg">')
      .should.eql([]);
  });
});

describe("findOpenGraphURLs", function() {
  it("works", function() {
    spider
      .findOpenGraphURLs('<meta property="og:image" content="/blah.jpg">')
      .should.eql(['/blah.jpg']);
  });
});
