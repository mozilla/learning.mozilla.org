var request = require("superagent");

var Credly = function(token) {
    this.accessToken = token;
    this.endPoint = "https://apistaging.credly.com/v1.1";
};

Credly.prototype = {
    badges: function(options, callback) {
        option = options || {};
        var endpoint = this.endPoint + "/members/2181040/badges";

        var args = [
            "verbose=" + (options.verbose || 0),
            "page=" + (options.page || 1),
            "per_page=" + (options.perPage || 10),
            "order_direction=" + (options.orderDirection || "asc"),
            "access_token=" + this.accessToken
        ].join('&');

        request
            .get(endpoint + "?" + args)
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