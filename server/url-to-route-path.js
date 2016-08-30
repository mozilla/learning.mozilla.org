/**
 * convert a site URL to a Router "path" value
 * @param {string} loc the URL location to rewrite to a Router path
 * @returns {string} a router path
 */
module.exports = function urlToRoutePath(loc) {
  // For router-resolution, we don't want hashes...
  var pos = loc.indexOf('#');
  if (pos > -1) { loc = loc.substring(0,pos); }
  // And we don't want query strings, either...
  pos = loc.indexOf('?');
  if (pos > -1) { loc = loc.substring(0,pos); }
  // If this is not the site root, we need to remove the leading slash.
  if (loc !== '/') {
    loc = loc.replace(/^\//, '').replace(/\/$/, '');
  }
  return loc;
};
