# Change Log
All notable changes to this project will be documented in this file,
which uses the format described in
[keepachangelog.com](http://keepachangelog.com/). This project adheres
to [Semantic Versioning](http://semver.org/).

## [Unreleased][unreleased]

## [0.0.5][] - 2015-05-20
### Added
- A link to "Site Administration" now appears under the logout
  link if the current user is staff.
- The word "(optional)" has been added next to non-required
  fields in the "Add Your Club" modal.
- Links to view the current page/route in PageSpeed Insights
  and Tenon have been added to the dev version modal and
  the manual tests page. Users are directed to install ngrok
  if they're accessing the pages at a non-public IP.
- Added notes about accessibility testing and ngrok
  to `CONTRIBUTING.md`.
- Added environment variables `MAILINGLIST_URL`
  and `MAILINGLIST_PRIVACY_NAME`.
- The site now generates `index.html` files for redirects. This
  was done so that `/clubs/curriculum/` redirects to 
  `/activities/web-lit-basics/`.
- `lib/changelog.js` can be used as a node script to help
  update `CHANGELOG.md`.
- Aspects of the structure and accuracy of this
  changelog are now verified by the automated test suite.

### Changed
- The Clubs Curriculum page has been renamed to 
  Web Literacy Basics, and is now available at
  `/activities/web-lit-basics/`. It's no longer accessible
  through the sidebar, but is instead listed as the
  first teaching kit in the Teaching Activities page.
- The "Events" section on the sidebar has been renamed to
  "Maker Party".
- A number of `alt` attributes for purely decorative
  images in the sidebar have been nulled, streamlining
  the experience for users with screen readers.
- The hamburger always expands if one of the links in its
  collapsed area becomes focused, improving navigation for
  sighted users who can only use the keyboard for navigation.
- Signing up for the Maker Party mailing list now shows
  a "Thank you" modal when the user is returned to the 
  site from BSD.
- Moved all documentation about manual testing to
  `CONTRIBUTING.md`.
- We're now using webpack to generate the static
  `index.html` files, massively speeding up their
  regeneration during development. The webpack bundle
  used to generate the index files is put in a new
  `build` directory.

## Removed
- References to "add your event" have been removed from
  the site, as we're not collecting data about individual
  Maker Party events this year.
- Unlinked calls-to-action have been removed from the bottom
  of the Clubs and Clubs Toolkit pages.

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

[unreleased]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.5...HEAD
[0.0.5]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.1...v0.0.2
