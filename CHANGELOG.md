# Change Log
All notable changes to this project will be documented in this file,
which uses the format described in
[keepachangelog.com](http://keepachangelog.com/). This project adheres
to [Semantic Versioning](http://semver.org/).

## [Unreleased][unreleased]
### Added
- Added environment variables `PLEDGE_MAILINGLIST_URL`
  and `PLEDGE_MAILINGLIST_PRIVACY_NAME`.

## [0.0.10][] - 2015-06-17
### Added
- A banner has been added to the homepage to promote Maker Party,
  a Mozilla global campaign.
- Each section in the Web Literacy Map can now be visited via a
  unique permalink. Clicking on the section sign (§) at the top-right
  of each expander section will set browser's current URL to a
  permalink for the section. Visiting a section directly through its
  permalink will also automatically expand that section to attract
  users' attention.
- Tools page has been added (https://teach.mozilla.org/tools). Currently
  there's no UI element on the site that leads to that page. However,
  a menu item "Tools" will be added to the sidebar in a follow-up release.
- The release process has been documented in `RELEASE.md`.
- An experimental lightweight dynamic server has been added, which
  dynamically generates requested HTML content. Documentation
  can be found in `README.md`.
- Unit tests have been added for the homepage.
- Hero unit images have been optimized and converted to JPG. In fact
  an image converter helper is in place now so we can easily optimize any
  images in the future.

### Changed
- The marker popups in the Clubs map are now much easier to read.
- Clicking on the location label of a Club will automatically zoom to
  that location pin on the Clubs map.
- All `mailto:` links on the website now point to
  `teachtheweb@mozillafoundation.org`.
- The "club curriculum" link under the "Write, Remix, or find Curriculum"
  section of the Clubs Toolkit now points to the Teaching Activities
  page.
- The Clubs Toolkit, Web Literacy Map, and Event Details section
  of the Event Resources page are now useful when printed. (Previously,
  their collapsed/inactive content would be hidden.)
- The Clubs page no longer makes superfluous network requests to
  retrieve the Clubs list.
- Only .jpg, .png, and .svg files in the `/img` directory are being watched
  (when running `npm start`) and copied to the `/dist` directory.
- Ionicons icon font has been dropped for FontAwesome.
- Hero unit background images are positioned at center top. This improves
  focus on the main visual interests on the photographs, especially on
  mobile viewports.


## [0.0.9][] - 2015-06-03
### Added
- A new "Protect Your Data" teaching activity has been added,
  and is now available at `activities/protect-your-data/`.

### Changed
- New clubs are no longer automatically publicly visible; instead, they
  are initially set to a "pending" state, and can be approved or
  denied by staff on the back-end. A "My Clubs" section above the
  rest of the clubs now informs the user about their clubs and their
  approval statuses. Users are also informed about the approval flow
  when they add a new club.
- The list of recent blog posts on the homepage is no longer hard-coded,
  but dynamically pulled from the blog's RSS feed via the Google Feed API.
  (We thought this was in 0.0.8, but it wasn't.)
- The "Learn" CTA at the bottom of the Teach Like Mozilla page
  has been changed to "Understand", with the sub-copy changed to
  "Learn more about the Web Literacy Map".
- The Home and About pages now consistently refer to "the Mozilla
  Learning Network", rather than "Mozilla Learning Networks".
- The decorative icons at the bottom CTAs of pages now have null
  `alt` text, improving accessibility.
- When sharing a Teach site page on Facebook, the page description is
  now the blurb from the About Us page ("We want more people to see
  themselves as citizens of the web...") rather than the footer text
  ("The Hive Learning Networks, stewarded by Mozilla...").
- When the Web Literacy Basics page is shown, the Mozilla Clubs section of
  the nav is no longer expanded.

## [0.0.8][] - 2015-06-01
### Added
- The add club modal now requires users to mark a checkbox labeled
  "I have read the Mozilla Clubs Fact Sheet".

### Changed
- ~~The list of recent blog posts on the homepage is no longer hard-coded,
  but dynamically pulled from the blog's RSS feed via the Google Feed API.~~
  (This change didn't actually make it into the release.)
- The add/change club modal has better prompts so content featured
  publicly feels more in fidelity with clubs.
- Pages now load faster on devices with retina displays.

## [0.0.7][] - 2015-05-28
### Added
- `srcset` attributes are now link-checked during automated testing.
- The dev version modal now *always* links to the latest release
  of the site, and potentially a link to the changes between the
  latest release and the current commit. It also links to
  `CONTRIBUTING.md`.
- A reference to novalidate.com has been added to `CONTRIBUTING.md`.

### Changed
- Homepage has been refreshed to better inform
  the site vistors of what they can do on the site.
- Homepage now shows the latest blog posts from
  https://blog.webmaker.org/.
- Various performance improvements to the manual test page have
  been added.

## [0.0.6][] - 2015-05-26
### Added
- A number of accessibility improvements have been added:
  - Pages on the site now have `contentinfo`, `main`, and
    `navigation` landmark roles.
  - Pages now indicate that they are in English.
  - More purely decorative images have null `alt` attributes.
  - Skip navigation has been added at the top of the page.
  - Expander components on the Clubs Toolkit and Web Literacy pages now
    use heading tags instead of divs.
  - The logo assets in the Event Resources page are now keyboard
    accessible.

### Changed
- All mentions of the @Webmaker Twitter handle (in the footer and
  the About and Clubs Toolkit pages) have been changed to @MozTeach.
- The `dist` dir is now cleaned up frequently during
  development, ensuring that old files don't stay
  around for too long.
- `lib/changelog.js bump` now makes it easier to issue
  new releases of the site.
- The dev version modal now links to the latest release
  of the site if the current git revision is unavailable.

### Removed
- `gulp-html-prettify` is no longer listed as a dependency
  in `package.json` (it hasn't been used by any code for
  some time).

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

[unreleased]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.10...HEAD
[0.0.10]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.9...v0.0.10
[0.0.9]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.8...v0.0.9
[0.0.8]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.7...v0.0.8
[0.0.7]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.6...v0.0.7
[0.0.6]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.5...v0.0.6
[0.0.5]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.1...v0.0.2
