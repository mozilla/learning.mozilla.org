var path = require('path');
var fs = require('fs');

var CHANGELOG = path.normalize(path.join(__dirname, '..', 'CHANGELOG.md'));
var RELEASE_HEADER_REGEX = /^## \[([0-9.]+)\]/m;
var UNRELEASED_HEADER = '## [Unreleased][unreleased]';
var UNRELEASED_LINK_RE = /^\[unreleased\]: (.+\.\.\.HEAD)$/m;

// http://stackoverflow.com/a/1267338
function zeroFill(number, width) {
  width -= number.toString().length;
  if (width > 0) {
    return new Array(width + (/\./.test(number) ? 2 : 1)).join('0') + number;
  }
  return number + ''; // always return a string
}

function formatDate(date) {
  date = date || new Date();
  return [
    date.getFullYear(),
    zeroFill(date.getMonth() + 1, 2),
    zeroFill(date.getDate(), 2)
  ].join('-');
}

function findIndexOfUnreleasedHeader(contents) {
  return contents.indexOf(UNRELEASED_HEADER);
}

function findLastRelease(contents) {
  return contents.match(RELEASE_HEADER_REGEX)[1];
}

function findIndexOfLastReleaseHeader(contents) {
  return contents.match(RELEASE_HEADER_REGEX).index;
}

function findUnreleasedNotes(contents) {
  var start = findIndexOfUnreleasedHeader(contents) +
              UNRELEASED_HEADER.length + 1;
  var end = findIndexOfLastReleaseHeader(contents) - 1;

  return contents.substring(start, end);
}

function findUnreleasedDiffLink(contents) {
  return contents.match(UNRELEASED_LINK_RE)[1];
}

function bumpVersion(contents, newVersion) {
  var diffLink = findUnreleasedDiffLink(contents);
  var oldVersion = findLastRelease(contents);
  contents = contents
    .replace(
      UNRELEASED_HEADER,
      UNRELEASED_HEADER +
      '\n\n## [' + newVersion + '][] - ' + formatDate()
    ).replace(
      diffLink,
      [diffLink.replace('v' + oldVersion, 'v' + newVersion),
       '[' + newVersion + ']: ' +
       diffLink.replace('HEAD', 'v' + newVersion)].join('\n')
    );

  return contents;
}

function readSync() {
  return fs.readFileSync(CHANGELOG, 'utf-8')
    .replace(/\r\n/g, '\n');
}

exports.readSync = readSync;
exports.findLastRelease = findLastRelease;
exports.findIndexOfUnreleasedHeader = findIndexOfUnreleasedHeader;
exports.findUnreleasedNotes = findUnreleasedNotes;
exports.findUnreleasedDiffLink = findUnreleasedDiffLink;
exports.bumpVersion = bumpVersion;
exports.formatDate = formatDate;
