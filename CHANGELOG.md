# Change Log
All notable changes to this project will be documented in this file,
which uses the format described in
[keepachangelog.com](http://keepachangelog.com/). This project adheres
to [Semantic Versioning](http://semver.org/).

## [Unreleased][unreleased]
### Changed
- Added environment variables `MAILINGLIST_URL` and `MAILINGLIST_PRIVACY_NAME`.

## [0.0.4][] - 2015-05-13
### Added
- Added a Maker Party mailing list sign-up form on the Events page.
- Stats on visitors whose browsers trigger the website to run
  in "safe mode" (i.e., with most JS disabled) are now logged in
  Google Analytics.
- A bullet point about the legal implications of financial
  contributions has been added to the Clubs Toolkit page.

### Changed
- Fixed a few typos on the Clubs Toolkit page.
- Fixed broken collapse/expand functionality on the Clubs Toolkit
  and Web Literacy pages.

## [0.0.3][] - 2015-05-11
### Added
- Added `CONTRIBUTING.md` file.

### Changed
- Reorganized the `img` directory.
- Downloadable event resources are now hosted on S3, at
  stuff.webmaker.org, rather than in the git repository.
- Intra-page links at the top of the Event Resources page are now
  styled using all-caps and carets.
- The link to the "Image Seeking for Fantastic Visual Metaphors"
  teaching activity has been updated to the latest version. The
  author's name now links to his website rather than his Twitter handle.

### Removed
- Removed jsbeautify, which removes superfluous JS files from the
  distribution directory.

## [0.0.2][] - 2015-05-04
### Added
- During automated testing, the the entire site is now spidered for missing
  links. This uncovered a few broken links, which were fixed.
- Fixed many missing downloadable links on the Event Resources page.

### Changed
- Changed instances of "Mozilla Web Clubs" to "Mozilla Clubs".
- Every page on the site now has a unique `<title>` (previously, the
  title of every page was "Mozilla Learning").
- Removed tooltips from the sidebar.
- Made the sidebar color of pages more consistent.
- The "Legal" link in the footer now links to webmaker.org instead of
  mozilla.org.
- Minor typo fixes.
- The Clubs Toolkit page is now keyboard-accessible.
- The background color on the hero unit is now gray, which makes
  the text readable while the background image is still loading.
- The Web Literacy Map now uses bullet points instead of paragraphs.
- Browser-side tests are now automatically discovered by the test runner.

## 0.0.1 - 2015-04-22
### Added
- This is the initial release, pushed to https://teach.mozilla.org/.

[unreleased]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.4...HEAD
[0.0.4]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.1...v0.0.2
