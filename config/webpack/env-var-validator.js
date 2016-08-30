/**
 * A webpack loader for looking at your bundle files
 * and seeing whether any of the environment variables
 * you rely on via process.env are actually documented
 * in your README.md
 */
var fs = require('fs');
var chalk = require('chalk');

var basePattern = '([A-Z][A-Z_]*_[A-Z_]+)';
var plainMatcher = new RegExp(basePattern, 'g');
var processMatcher = new RegExp('process\\.env\\.' + basePattern, 'g');
var habitatMatcher = new RegExp('env\\.get\\([\'"`]' + basePattern, 'g');

// find all SNAKE_CASE variables, optionally using a specific regexp
// for matching more than just the base SNAKE_CASE pattern
function findSnakeCases(input, matcher) {
  var terms = [];
  matcher = matcher || plainMatcher;
  input.replace(matcher, function(a, b) { terms.push(b); });
  return terms;
}

var knownDocumented = {};
var README = fs.readFileSync('./README.md').toString();
findSnakeCases(README).forEach(function(varname) {
  knownDocumented[varname] = true;
});

// check whether a given SNAKE_VAR variable has documentation
function checkDocumentation(varname) {
  if (!knownDocumented[varname]) {
    console.warn('\n', chalk.yellow.bold('Found undocumented environment variable:'), chalk.red.bold(varname), '\n');
  } 
}

/**
 * A simple synchronouse webpack loader, checking for process.env as well
 * as habitat-style env.get(...) patterns for environment variable mentions.
 */
module.exports = function findUndocumentedEnvironmentVariables(source) {
  this.cacheable();
  // check for process.env.SOME_VAR_NAME usage
  findSnakeCases(source, processMatcher).forEach(checkDocumentation);
  // check for env.get('SOME_VAR_NAME, quoted with either `, or ', or ".
  findSnakeCases(source, habitatMatcher).forEach(checkDocumentation);
  return source;
};
