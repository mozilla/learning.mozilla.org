var _ = require('underscore');
var request = require('superagent');
var ga = require('react-ga');
var TeachAPI = require('./teach-api');

function BadgesAPI(options) {
  options = options || {};
  this.teachAPI = options.teachAPI || new TeachAPI();
  this.baseURL = options.baseURL || TeachAPI.getDefaultURL();
  this.credlyEndPoint = '/credly';
}

BadgesAPI.prototype = {
  credlyURL: function (action) {
    action = action || "";
    return this.baseURL + this.credlyEndPoint + action;
  },

  /**
   * Does this user have credly access, or do we need to
   * tell them to sign up/in with credly.com through us?
   * @param {function} callback An (err,data) callback function to handle the access check result
   * @returns {undefined}
   */
  hasAccess: function(callback) {
    request
      .get(this.credlyURL('/access'))
      .withCredentials()
      .accept('json')
      .end(function (err, res) {
        if (err) {
          console.log('error', err);
          return callback(err, res);
        }
        callback(false, res.body);
      });
  },

  /**
   * log a user into credly, which means on the teach API
   * side the user will either be signed in, or signed up
   * if they're not a member.
   * @param {string} email The user's login-associated email address
   * @param {string} password the user's login-associated password
   * @param {function} callback An (err,data) callback function to handle the login
   * @returns {undefined}
   */
  ensureLogin: function(email, password, callback) {
    request
      .post(this.credlyURL('/login'))
      .send({ email: email, password: password })
      .withCredentials()
      .accept('json')
      .end(function (err, res) {
        if (err) {
          console.log('error', err);
          callback(err, res);
        } else { callback(false, res.body); }
      });
  },

  /**
   * List all Mozilla badges, cross-referenced with the
   * current user's list of earned badges (if there is
   * a logged in user), so that the UI can show earned
   * vs. not-yet-earned status for each badge.
   * @param {function} callback An (err,data) callback function to handle the badge list data
   * @returns {undefined}
   */
  listBadges: function (callback) {
    request
      .get(this.credlyURL('/badgelist'))
      .withCredentials()
      .accept('json')
      .end(function (err, res) {
        if (err) {
          console.log('error', err);
          return callback(err, res);
        }
        callback(false, res.body);
      });
  },

  /**
   * Get a particular badge's details, cross-referenced
   * with the current user's list of earned badges (if
   * there is a logged in user), so that the UI can be
   * rendered based on earned vs. not-yet-earned status.
   * @param {number} badgeId The id for the badge we want information on
   * @param {function} callback An (err,data) callback function to handle the badge information
   * @returns {undefined}
   */
  getBadgeDetails: function (badgeId, callback) {
    request
      .get(this.credlyURL('/badge/' + badgeId))
      .withCredentials()
      .accept('json')
      .end(function (err, res) {
        if (err) {
          console.log('error', err);
          return callback(err, res);
        }
        callback(false, res.body);
      });
  },

  /**
   * Claim a badge on behalf of a user, which adds the claim
   * request to our account's list of pending requests, to be
   * approved or declined through credly's website.
   * @param {number} badgeId The id for the badge we want information on
   * @param {object} options an object with an .evidences property containing the user's claim evidence
   * @param {function} callback An (err,data) callback function to handle the badge information
   * @returns {undefined}
   */
  claimBadge: function (badgeId, options, callback) {
    request
      .post(this.credlyURL('/claim/' + badgeId))
      .send({
        evidences: options.evidences
      })
      .withCredentials()
      .accept('json')
      .end(function (err, res) {
        if (err) {
          console.log('error', err);
          return callback(err, res);
        }
        callback(false, res.body);
      });
  }
};

module.exports = BadgesAPI;
