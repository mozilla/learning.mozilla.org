var urlParse = require('url').parse;
var urlResolve = require('url').resolve;
var chalk = require('chalk');
var Crawler = require('simplecrawler');

var server = require('./server').create();

function findSrcSetURLs(resourceText, baseURL) {
  var urls = [];

  resourceText.replace(/\ssrcset\s?=\s?['"]([^"']+)/ig, function() {
    arguments[1].split(',').forEach(function(resource) {
      var url = resource.trim().split(' ')[0];

      urls.push(urlResolve(baseURL || '', url));
    });
  });

  return urls;
}

function crawl() {
  var crawler = new Crawler("localhost", "/", server.address().port);

  crawler.discoverResources = function(resourceData, queueItem) {
    var resources = Crawler.prototype.discoverResources.apply(this, [
      resourceData,
      queueItem
    ]);

    resources.push.apply(resources, findSrcSetURLs(
      resourceData.toString("utf8"),
      queueItem.url
    ));

    return resources;
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

if (!module.parent) {
  server.listen(0, crawl);
}
