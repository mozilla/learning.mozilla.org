/**
 * generate a URL's static HTML 
 */
module.exports = function renderComponentPage(serverBundle, location, res, locale) {
  serverBundle.generate(location, {locale: locale}, function(err, location, title, html) {
    if (err) {
      next(err);
    }
    res.type('html').send(html);
  });
};
