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
  credlyURL: function (  action  ){
    action = action || "";
    return this.baseURL + this.credlyEndPoint + action;
  },
  listBadges : function (){
    request
      .get(this.credlyURL('/badges'))
      .end(function(err, res){
          console.log(err,res);
      });
  }
});

module.exports = BadgesAPI;
