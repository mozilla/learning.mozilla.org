var sanitizeHtml = require('sanitize-html');

function loadGoogleAPI(window, callback) {
  if (window.google) {
    return process.nextTick(callback);
  }
  var head = document.getElementsByTagName('head')[0];
  var gScript = document.createElement('script');
  gScript.setAttribute('src', 'https://www.google.com/jsapi');
  gScript.onload = callback;
  head.appendChild(gScript);
};

function getBlogFeeds(feedUrl, callback) {
  if (window.google) {
    var google = window.google;
    google.load('feeds', '1', {
      callback: function() {
        var feed = new google.feeds.Feed(feedUrl);
        feed.load(function(result) {
          callback(formatBlogFeeds(result.feed));
        });
      }
    });
  }
}

function formatBlogFeeds(feeds) {
  var featured = feeds.entries[0];
  var latestPosts = [];
  var post;
  for (var i = 1; i < 4; i++) {
    post = feeds.entries[i];
    latestPosts.push({
      title: post.title,
      publishedDate: post.publishedDate,
      link: post.link
    });
  }
  return {
    featuredPostData: {
      title: featured.title,
      author: featured.author,
      publishedDate: featured.publishedDate,
      contentSnippet: sanitizeHtml(featured.content, {
        allowedTags: []
      }).split(' ').slice(0, 70).join(' ') + '...',
      link: post.link
    },
    latestPostsData: latestPosts
  };
}

var loadBlogFeed = function(requestedComp, window, feedUrl, callback) {
  loadGoogleAPI(window, function() {
    if (requestedComp.isMounted()) {
      getBlogFeeds(feedUrl, function(result) {
        callback(result);
      });
    }
  });
};

module.exports = loadBlogFeed;

