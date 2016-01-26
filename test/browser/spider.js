var urlParse = require('url').parse;
var urlResolve = require('url').resolve;
var chalk = require('chalk');
var Crawler = require('simplecrawler');

var config = require('../../config/config');
var server = require('./server').create();

var URL_FINDERS = [
  findSrcSetURLs,
  findOpenGraphURLs
];

// Return an array of all the first submatches (the parts of a
// regular expression in parentheses) of a given regular expression
// in a body of text. The regular expression is assumed to have the
// global match flag.
function getFirstSubmatches(regexp, text) {
  var results = [];
  // We're not actually replacing anything, but this seems to
  // be the only easy way to iterate through all the submatches
  // in a body of text.
  text.replace(regexp, function(match, firstSubmatch) {
    results.push(firstSubmatch);
  });
  return results;
}

function findSrcSetURLs(resourceText, baseURL) {
  var urls = [];

  getFirstSubmatches(
    /\ssrcset\s?=\s?['"]([^"']+)/ig,
    resourceText
  ).forEach(function(candidates) {
    candidates.split(',').forEach(function(candidate) {
      var url = candidate.trim().split(' ')[0];

      urls.push(urlResolve(baseURL || '', url));
    });
  });

  return urls;
}

function findOpenGraphURLs(resourceText, baseURL) {
  return getFirstSubmatches(
    /\sproperty="og:image"\s?content\s?=\s?['"]([^"']+)/ig,
    resourceText
  ).map(function(url) {
    return urlResolve(baseURL || '', url.trim());
  });
}

function crawl() {
  var crawler = new Crawler("localhost", "/", server.address().port);

  crawler.discoverResources = function(resourceData, queueItem) {
    var resources = Crawler.prototype.discoverResources.apply(this, [
      resourceData,
      queueItem
    ]);
    var unicodeResourceData = resourceData.toString("utf8");

    URL_FINDERS.forEach(function(findURLs) {
      resources.push.apply(resources, findURLs(
        unicodeResourceData,
        queueItem.url
      ));
    });

    return resources.map(function(url) {
      // It's possible that some of our URLs might be absolute URLs
      // based on config.ORIGIN. However, because the server we've
      // started for crawling is based at a dynamic origin on localhost,
      // we need to rebase such URLs to be at our dynamic origin, so
      // that they're actually spidered.
      if (url.indexOf(config.ORIGIN) === 0) {
        return urlResolve(queueItem.url, url.replace(config.ORIGIN, ''));
      }
      return url;
    });
  };

  crawler.on('complete', function() {
    var notfound = crawler.queue.filter(function(item) {
      return item.status === 'notfound';
    });

    notfound.forEach(function(item) {
      console.log("Couldn't find " + chalk.bold.red(item.path) +
                  " referenced by " +
                  urlParse(item.referrer).path + ".");
    });

    server.close();

    if (notfound.length) {
      console.log("Alas, some files could not be found.");
      process.exit(1);
    } else {
      console.log("Fetched " +
                  chalk.bold.green(crawler.queue.length.toString()) +
                  " URLs without encountering any 404s.");
    }
  });

  crawler.interval = 0;
  crawler.parseScriptTags = false;
  crawler.start();
}

exports.findSrcSetURLs = findSrcSetURLs;
exports.findOpenGraphURLs = findOpenGraphURLs;

if (!module.parent) {
  server.listen(0, crawl);
}
