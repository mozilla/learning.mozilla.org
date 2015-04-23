var urlParse = require('url').parse;
var chalk = require('chalk');
var Crawler = require('simplecrawler');

var server = require('./server').create();

server.listen(0, function() {
  var crawler = new Crawler("localhost", "/", server.address().port);

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
});
