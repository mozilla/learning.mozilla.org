var _ = require('underscore');
var request = require('superagent');
var ga = require('react-ga');
var TeachAPI = require('./teach-api');

function BadgesAPI(options) {
  options = options || {};
  this.baseURL = options.baseURL || TeachAPI.getDefaultURL();
  this.credlyEndPoint = '/credly';
}

_.extend(BadgesAPI.prototype, {
  credlyURL: function (action) {
    action = action || "";
    return this.baseURL + this.credlyEndPoint + action;
  },
  listBadges : function (callback) {
    request
      .get(this.credlyURL('/badges'))
      .end(function (err, res) {
          callback(err, res);
      });
  },
  getBadgeDetails: function (badgeId, callback) {
    request
      .get(this.credlyURL('/badges/' + badgeId))
      .end(function (err, res) {
        callback(err, res);
      });
  }
});

module.exports = BadgesAPI;
