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
   * @param  {[type]} path [description]
   * @return {[type]}      [description]
   */
  pageview: function (path) {
    if (typeof ga === 'function') {
      ga('send', 'pageview', path);
    }
  }
};
