var React = require('react');

var Page = require('./page.jsx');
var HeroUnit = require('./hero-unit.jsx');
var renderHomepage = require('./homepage.jsx');
var Ia = require('./ia.jsx');

var PAGES = {
  '/': renderHomepage,
  '/foo/': function() {
    return (
      <Page className="teaching-materials">
        <HeroUnit image="http://placekitten.com/g/1024/480">
          <h1>I am foo.</h1>
          <div><Ia href="/" className="btn btn-awsm">Meow</Ia></div>
        </HeroUnit>
        <h2>Content can go here.</h2>
      </Page>
    );
  }
};

function pageNotFound() {
  return <h1>Page not found</h1>;
}

function reactElementForPage(url) {
  var reactElementFactory = PAGES[url] || pageNotFound;
  return reactElementFactory();
}

exports.PAGES = PAGES;
exports.URLS = Object.keys(PAGES);
exports.reactElementForPage = reactElementForPage;
