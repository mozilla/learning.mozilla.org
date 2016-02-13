module.exports = function fixLocation(location) {
  var search = location.search.replace('?','');
  location.search = {};
  if(search) {
    search
    .split('&')
    .map(function(v) { return v.split('='); })
    .forEach(function(pair) {
      location.search[pair[0]] = pair[1];
    });
  }
};
