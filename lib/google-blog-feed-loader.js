var FEED_URL = 'https://blog.webmaker.org/tag/teachtheweb/feed';
var DEFAULT_CONTENT_SNIPPET_WORD_COUNT = 70;
var SCRIPT_SRC = 'https://www.google.com/jsapi';

// http://stackoverflow.com/a/822464
var HTML_TAG_RE = /<(?:.|\n)*?>/gm;

var scriptEl = null;
var scriptLoadCallbacks = [];

function handleScriptLoad() {
  scriptLoadCallbacks.forEach(process.nextTick);
  scriptLoadCallbacks = [];
}

function ensureGoogleAPI(callback) {
  var head;

  if (window.google) {
    return process.nextTick(callback);
  }

  scriptLoadCallbacks.push(callback);
  
  if (!scriptEl) {
    head = document.getElementsByTagName('head')[0];
    scriptEl = document.createElement('script');
    scriptEl.setAttribute('src', SCRIPT_SRC);
    scriptEl.onload = handleScriptLoad;
    head.appendChild(scriptEl);
  }
}

function makeContentSnippet(html, wordCount) {
  var text = html.replace(HTML_TAG_RE, '');
  var words;

  wordCount = wordCount || DEFAULT_CONTENT_SNIPPET_WORD_COUNT;

  words = text.split(' ');

  if (words.length > wordCount) {
    text = words.slice(0, wordCount).join(' ') + '\u2026';
  }

  return text;
}

function formatBlogPosts(feed) {
  var featured = feed.entries[0];
  var latestPosts = [];
  var post;

  for (var i = 1; i < 4; i++) {
    post = feed.entries[i];
    latestPosts.push({
      title: post.title,
      publishedDate: post.publishedDate,
      link: post.link
    });
  }

  return {
    featuredPost: {
      title: featured.title,
      author: featured.author,
      publishedDate: featured.publishedDate,
      contentSnippet: makeContentSnippet(featured.content),
      link: featured.link
    },
    latestPosts: latestPosts
  };
}

function getBlogPosts(feedUrl, callback) {
  var google = window.google;

  google.load('feeds', '1', {
    callback: function() {
      var feed = new google.feeds.Feed(feedUrl);

      feed.load(function(result) {
        callback(formatBlogPosts(result.feed));
      });
    }
  });
}

function loadBlogFeed(callback) {
  ensureGoogleAPI(function() { getBlogPosts(FEED_URL, callback); });
}

module.exports = loadBlogFeed;
module.exports.SCRIPT_SRC = SCRIPT_SRC;
module.exports.formatBlogPosts = formatBlogPosts;
module.exports.makeContentSnippet = makeContentSnippet;
