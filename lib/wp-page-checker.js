var request = require('superagent');
var config = require('../config/config');

var WORDPRESS_SITE_URL = config.WORDPRESS_SITE_URL;
var WORDPRESS_COM_API_ENDPOINT_BASE = 'https://public-api.wordpress.com/rest/v1.1/sites/' + WORDPRESS_SITE_URL + '/posts/slug:';

module.exports = function(path, callback) {
  // FIXME: this is implemented based on the assumption that 
  //        1) no multiple pages/posts on WP share the same slug
  //        2) the path passed here is not nested (e.g., doesn't have slash in it)
  var wpPostSlug = path;

  request
    .get(WORDPRESS_COM_API_ENDPOINT_BASE+wpPostSlug)
    .accept('json')
    .end(function(err, res) {
      callback( err || res.statusCode !== 200, JSON.parse(res.text).content);
    });
};
