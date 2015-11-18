var request = require("superagent");

var Credly = function(token) {
    this.accessToken = token;
    this.endPoint = "https://api.credly.com/v1.1";
};

Credly.prototype = {
    badges: function(options, callback) {
        option = options || {};
        var endpoint = this.endPoint + "/me/badges";

        var args = [
            "verbose=" + (options.verbose || 0),
            "page=" + (options.page || 1),
            "per_page=" + (options.perPage || 10),
            "order_direction=" + (options.orderDirection || "asc"),
            "access_token=" + this.accessToken
        ].join('&');

        request
            .get(endpoint + "?" + args)
            .set('X-API-Key', '0a15419a6dd7bdca91a24aa536457e3d')
            .set('X-Api-Secret', 'rMs8RVcwfPDEyNdeRPpmUfeBhu4dDZvLVSHBxhWU7vQhIIMO38xPkYLXD2n+vU5l7zywcXs0D5Uy4XvWYE3Fbt0XK5zbVCLxzWl6+uNsVXpHI+NToAkZZy1Q2C+D5Oh72/OjyWq9U7soHgbYhNCgebblziLhzexIk+OB0y1axH4=')
            .set('Accept', 'application/json')
            .end(callback);
    },

    user: function(options, callback) {
        //....
    },

    userBadges : function(options, callback){
        options = options || {};
        var endpoint = ""
    }
    // ...
};

module.exports = Credly;