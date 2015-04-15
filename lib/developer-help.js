function showDeveloperHelp() {
  var logMsg = [];

  if (process.env.LESS_AUTOPREFIXER === 'off') {
    logMsg.push("CSS source maps are enabled, but " +
                "autoprefixing for CSS rules is disabled.");
  } else {
    logMsg.push("CSS source maps are disabled, but " +
                "autoprefixing for CSS rules is enabled.");
  }
  logMsg.push("To change this, see the " +
              "documentation for LESS_AUTOPREFIXER in README.md.");
  console.log(logMsg.join("\n"));
}

module.exports = function() {
  try {
    showDeveloperHelp();
  } catch (e) {}
};
