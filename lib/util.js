var Utils = {
  isValidEmail: function(email) {
    // regex copied from http://stackoverflow.com/a/46181
    var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return regex.test(email);
  },
  convertToRoute: function(str) {
    str = str || "";
    return str.toLowerCase().replace(" ", "-");
  },
  parseRoute: function(route) {
    route = route || "";
    return route.split("-").map(function(item) {
      return item.charAt(0).toUpperCase() + item.substr(1).toLowerCase();
    }).join(" ");
  }
};

module.exports = Utils;
