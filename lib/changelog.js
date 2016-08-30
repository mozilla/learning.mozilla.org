var path = require('path');
var fs = require('fs');
var marked = require('marked');
var openInBrowser = require('open');

var BASENAME = path.basename(process.argv[1]);
var CHANGELOG = path.normalize(path.join(__dirname, '..', 'CHANGELOG.md'));
var RELEASE = path.normalize(path.join(__dirname, '..', 'RELEASE.md'));
var VERSION_REGEX = /^(\d+)\.(\d+)\.(\d+)$/;
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
  if (!VERSION_REGEX.test(newVersion)) {
    throw new Error('invalid version: ' + newVersion);
  }

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

function showHelp() {
  console.log([
    'usage: ' + BASENAME + ' <command>',
    '',
    'commands:',
    '',
    '  release - show instructions for how to make a release',
    '  unreleased - show unreleased change notes',
    '  bump - bump the version in the changelog',
    ''
  ].join('\n'));
}

function main() {
  var parseArgs = require('minimist');
  var pkgJsonVersion = require('../package.json').version;
  var contents = readSync();
  var lastReleaseVersion = findLastRelease(contents);
  var unreleasedNotes = findUnreleasedNotes(contents);
  var unreleasedDiffLink = findUnreleasedDiffLink(contents);
  var argv = parseArgs(process.argv.slice(2), {
    'boolean': ['help']
  });

  var cmdRelease = function() {
    var instructions = fs.readFileSync(RELEASE, 'utf-8');
    var version = argv._[1];
    var username = argv._[2];
    var filename = 'release-' + version + '.html';
    var abspath = path.normalize(path.join(__dirname, '..', filename));

    if (!version || !username) {
      console.log('usage: ' + BASENAME + ' release <version> <username>\n');
      console.log('See RELEASE.md for more details.');
      process.exit(1);
    }

    instructions = [
      '<!DOCTYPE html>',
      '<meta charset="utf-8">',
      '<style>',
      '  body { max-width: 640px; margin: 0 auto;',
      '         font-family: Georgia, serif; padding: 0 1em; }',
      '  h2 { font-weight: normal; }',
      '</style>',
      '<title>How To Release v' + version + '</title>',
      marked(instructions.replace(/0\.0\.4/g, version)
                         .replace(/toolness/g, username))
    ].join('\n');

    fs.writeFileSync(abspath, instructions);
    console.log('Wrote ' + filename + '.');
    openInBrowser(abspath);
  };

  var cmdBumpVersion = function() {
    if (unreleasedNotes.trim().length === 0) {
      console.log('Your new release will not have any release notes! ' +
                  'Please write some first.');
      console.log('For details on commits since the last release, visit:');
      console.log(unreleasedDiffLink);
      process.exit(1);
    }

    if (lastReleaseVersion === pkgJsonVersion) {
      console.log('Please bump the version in package.json first.');
      process.exit(1);
    }

    var tagMessageFile = 'tag-message-v' + pkgJsonVersion + '.txt';
    var newContents = bumpVersion(contents, pkgJsonVersion);

    fs.writeFileSync(CHANGELOG, newContents);
    fs.writeFileSync(tagMessageFile,
      'Release v' + pkgJsonVersion + '.\n\n' + unreleasedNotes
    );

    console.log([
      'Bumped version. You can commit the changes by running:',
      'git commit -a -m "Release v' + pkgJsonVersion + '."',
      '',
      'You can tag this release by running:',
      'git tag -a v' + pkgJsonVersion + ' -F ' + tagMessageFile
    ].join('\n'));
  };

  if (argv.h || argv.help) {
    return showHelp();
  }
  if (argv._[0] === 'release') {
    cmdRelease();
  } else if (argv._[0] === 'unreleased') {
    console.log(unreleasedNotes);
  } else if (argv._[0] === 'bump') {
    cmdBumpVersion();
  } else {
    showHelp();
    process.exit(1);
  }
}

exports.readSync = readSync;
exports.findLastRelease = findLastRelease;
exports.findIndexOfUnreleasedHeader = findIndexOfUnreleasedHeader;
exports.findUnreleasedNotes = findUnreleasedNotes;
exports.findUnreleasedDiffLink = findUnreleasedDiffLink;
exports.bumpVersion = bumpVersion;
exports.formatDate = formatDate;

if (!module.parent) {
  main();
}
