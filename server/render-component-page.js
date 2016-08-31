/**
 * generate a URL's static HTML
 * @param {object} generator the server page generator
 * @param {string} location the URL for this request
 * @param {object} res express.js response object
 * @param {string} locale the locale/language for this page
 * @returns {undefined}
 */
module.exports = function renderComponentPage(generator, location, res, locale) {
  generator.generate(location, {locale: locale}, function(err, _location, title, html) {
    if (err) {
      next(err);
    }
    res.type('html').send(html);
  });
};
