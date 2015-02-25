var generateStaticSite = require('./generate-static');

console.log("Attempting to generate static site.");

generateStaticSite(function(err) {
  if (err) throw err;

  console.log("Hooray, the static site was generated without " +
              "anything exploding. Tests pass!");
});
