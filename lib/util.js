var Utils = {
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
