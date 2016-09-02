var request = require('superagent');
var url = require('url');
var jsdom = require('jsdom');
var app = require('./app');
var server;
var serveraddress = "http://localhost:" + app.PORT;
var chalk = require('chalk');

var locale = 'en-US';

// Call as `node spiders.js --forceLocale to make missing locale warnings
// trigger a fail as far as npm test is concerned.
var failOnMissingLocale = process.argv.indexOf('--forceLocale') > -1;

// crawl-global "to-crawl" and "have-crawled" lists
var resolve = ['/'+locale+'/'];
var seen = {};

// tracks whether we should report success or failure for npm test purposes.
var failed = false;

/**
 * Run through a page for all its link elements, map them to href attributes,
 * filter out any links already seen or already pending for crawling, and
 * add the remainder to the "to be crawled" list. Then recurse.
 */
function resolvePageLinks(htmlCode, onFinish, siteurl, from) {
  var dom = jsdom.env(htmlCode, function (err, window) {
    // If this is an unknown not-http-status-related error, treat as error.
    if (err) {
      console.error(
        chalk.red.bold("ERROR: request error occurred trying to access"),
        chalk.yellow.bold(siteurl),
        chalk.red.bold("linked from"),
        chalk.yellow.bold(from)
      );
      failed = true;
      return getPageLinks(onFinish, siteurl);
    }

    var document = window.document;
    var links = document.querySelectorAll('a');
    var linkArray = Array.from(links).map(a => a.href);
    var newLinks = linkArray.filter(url => (!!url && url.indexOf(':')===-1 && seen[url] !== true && resolve.indexOf(url) === -1));
    newLinks.forEach(url => resolve.push(url));

    // recurse with the updated to-resolve list
    getPageLinks(onFinish, siteurl);
  });  
}

/**
 * Get the set of <a> elements on a page, extract the 'href'
 * urls, add any urls not yet visited to the "to-be-resolved" list,
 * and add the current page url to the "seen" list.
 *
 * Do this recursively until we run out of new URLs to visit.
 */
function getPageLinks(onFinish, from) {
  if (resolve.length === 0) { onFinish(); }

  // make sure we respect "./abc" and "../abc" url patterns
  from = from || '';
  var to = resolve.splice(0,1)[0];
  var siteurl = url.resolve(from, to);

  // If the url is blank, that's... really weird and an error.
  if (!to) {
    console.error(
      chalk.red.bold("Empty link found on"),
      chalk.yellow.bold(from)
    );
    failed = true;
    return getPageLinks(onFinish, from);
  }
  
  // If there is no local information that's not necessarily an error
  // as the server should be able to look up the en-US resource anyway
  // due to the presence of http accept languages in the request header.
  if (siteurl.indexOf(locale) === -1) {
    console.error(
      chalk.red.bold("WARNING: no locale found for"),
      chalk.yellow.bold(siteurl),
      chalk.red.bold("linked from"), 
      chalk.yellow.bold(from)
    );
    failed = failed || failOnMissingLocale;
  }

  // So far so good: mark this url as seen and try to access it for more links
  seen[to] = true;
  seen[siteurl] = true;
  console.log("spidering "+siteurl, from? " (from "+from+")" : '', " ("+Object.keys(seen).length+" urls crawled)");

  // superagent request with headers that match what learning.mozilla.org receives
  request
  .get(serveraddress + siteurl)
  .set('Accept-Language', 'en-US,en;q=0.8')
  .set('Accept','text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8')
  .end(function(err, res){
    // If this is not an HTTP-OK result, that's an error we need to fix.
    if (res.status !== 200) {
      console.error(
        chalk.red.bold("ERROR "+res.status +": page at"),
        chalk.yellow.bold(siteurl),
        chalk.red.bold("linked from"),
        chalk.yellow.bold(from),
        chalk.red.bold("could not be found")
      );
      failed = true;
      return getPageLinks(onFinish, siteurl);
    }
    // find links and recurse
    resolvePageLinks(res.text, onFinish, siteurl, from);
  });
}

// MAIN SCRIPT ENTRY POINT:

console.log("Starting server process...");
var spawn = require('child_process').spawn;
server = spawn('node', ['app']);
server.on('close', () => { console.log("CLOSE"); server.kill(); process.exit(1); });
server.on('exit', () => { console.log("EXIT"); server.kill(); process.exit(1); });
server.stderr.on('data', (data) => { console.error(data.toString()); });
server.stdout.on('data', (data) => {
  data = data.toString();
  if (data.indexOf(app.READY_STRING) > -1) {
    console.log("Starting spider crawl...");
    // Kick off the crawl by starting at our en-US root
    // once the server writes the ready string to stdout.
    getPageLinks(function onFinish() {
      console.log("Finishing spider crawl" + (failed? " with errors":'') + ".");
      server.kill();
      process.exit(failed ? 1 : 0);
    });
  }
});
