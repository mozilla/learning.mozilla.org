function warn (s) {
  console.warn('[googleanalytics.js', s);
}

module.exports = {
  initialize: function() {
    if (!process.env.GA_ACCOUNT) {
      return;
    }
    // https://developers.google.com/analytics/devguides/collection/analyticsjs/
    (function(i, s, o, g, r, a, m) {
      i['GoogleAnalyticsObject'] = r;
      i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
      }, i[r].l = 1 * new Date();
      a = s.createElement(o),
          m = s.getElementsByTagName(o)[0];
      a.async = 1;
      a.src = g;
      m.parentNode.insertBefore(a, m)
    })(window, document, 'script',
       '//www.google-analytics.com/analytics.js', 'ga');

    ga('create', process.env.GA_ACCOUNT, 'auto');
    ga('send', 'pageview');
  },

  /**
   * pageview:
   * a proxy to basic GA pageview tracking
   * @param  {String} path - the current page page e.g. '/about'
   */
  pageview: function (path) {
    if (typeof ga === 'function') {
      ga('send', 'pageview', path);
    }
  },

  /**
   * modalview:
   * a proxy to basic GA pageview tracking
   * @param  {String} modalName e.g. 'add-or-edit-club'
   */
  modalview: function (modalName) {
    path = '/modal/' + modalName;
    if (typeof ga === 'function') {
      ga('send', 'pageview', path);
    }
  },

  /**
   * event:
   * GA event tracking
   * @param args.category {String} required
   * @param args.action {String} required
   * @param args.label {String} optional
   * @param args.value {Int} optional
   * @param args.nonInteraction {Int} 1 = true, 0 = false
   */
  event: function (args) {
    if (typeof ga === 'function') {

      // Simple Validation
      if (!args.category || !args.action) {
        warn('args.category AND args.action are required');
        return;
      }

      // Required Fields
      var fieldObject = {
        'hitType': 'event',
        'eventCategory': args.category,
        'eventAction': args.action
      };

      // Optional Fields
      if (args.eventLabel) {
        fieldObject.eventLabel = args.label;
      }

      if (args.eventValue) {
        fieldObject.eventValue = args.value;
      }

      if (args.nonInteraction) {
        fieldObject.nonInteraction = args.nonInteraction;
      }

      // Send to GA
      ga('send', fieldObject);
    }
  }
};
