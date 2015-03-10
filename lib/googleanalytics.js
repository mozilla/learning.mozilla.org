module.exports = {
  /**
   * pageview:
   * a proxy to basic GA pageview tracking
   * @param  {[type]} path [description]
   * @return {[type]}      [description]
   */
  pageview: function (path) {
    if(typeof ga === "function") {
      ga('send', 'pageview', path);
    }
  }
};
