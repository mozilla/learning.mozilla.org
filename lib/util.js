var Utils = {
  isValidEmail: function(email) {
    // regex copied from http://stackoverflow.com/a/46181
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
