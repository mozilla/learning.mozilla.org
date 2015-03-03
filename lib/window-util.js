exports.getAbsoluteURL = function(url) {
  var a = document.createElement('a');

  a.setAttribute('href', url.slice(1));
  return a.href;
};
