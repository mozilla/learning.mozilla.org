var should = require('should');
var packageJSON = require('../package.json');

var changelog = require('../lib/changelog');

function verifyChangelog(contents, expectedVersion) {
  it('features ' + expectedVersion + ' as latest release', function() {
    changelog.findLastRelease(contents)
      .should.equal(expectedVersion);
  });

  it('has a section heading called "Unreleased"', function() {
    changelog.findIndexOfUnreleasedHeader(contents)
      .should.not.equal(-1);
  });

  it('has notes for the "Unreleased" section', function() {
    changelog.findUnreleasedNotes(contents)
      .should.be.a.String;
  });

  it('has a link to a commit log of unreleased changes', function() {
    var lastRelease = changelog.findLastRelease(contents);
    var diffLink = changelog.findUnreleasedDiffLink(contents);

    diffLink.should.match(/^https?:\/\/.+\.\.\.HEAD$/);
    diffLink.indexOf('v' + lastRelease + '...HEAD')
      .should.not.equal(-1);
  });
}

describe('CHANGELOG.md', function() {
  var contents = changelog.readSync();

  verifyChangelog(contents, packageJSON.version);

  describe('when version-bumped to 9999.0.0', function() {
    var newContents = changelog.bumpVersion(contents, '9999.0.0');

    verifyChangelog(newContents, '9999.0.0');
  });
});

describe('changelog.formatDate()', function() {
  it('zero-pads month', function() {
    changelog.formatDate(new Date('Jan 20 2015'))
      .should.equal('2015-01-20');
  });

  it('zero-pads day', function() {
    changelog.formatDate(new Date('Oct 01 2015'))
      .should.equal('2015-10-01');
  });
});
