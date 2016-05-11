# Change Log
All notable changes to this project will be documented in this file,
which uses the format described in
[keepachangelog.com](http://keepachangelog.com/). This project adheres
to [Semantic Versioning](http://semver.org/).

## [Unreleased][unreleased]

## [1.0.0][] - 2016-05-11
### Added
- Added Intermediate Web Lit II module.
- Badges related code has been merged into the codebase! The `ENABLE_BADGES` 
  flag is currently off. Turning it on renders the `/badges` and 
  `/badge/....` routes, and reveals the badge main page as a sidebar navigation 
  option.

### Changed
- `npm start` now triggers the `npm run app` task

## [0.0.40][] - 2016-05-05
### Added
- Added May 10 Curriculum Workshop details and updated archives.
- Added May 25 MLN Community Call details and updated archives.

## [0.0.39][] - 2016-04-20
### Changed
- Fixed Web Literacy Map data since Synthesize, Share and Connect were
  assgined the wrong 21st century skills.
- Unified button, label, and link styles across the site.
- Fixed url-to-react-router-path rewriter so that hitting pages with hash 
  and/or query string in the URL won't result in 404.

## [0.0.38][] - 2016-04-15
### Changed
- Fixed width scrollbars issue in vertical container for Firefox stable.
- Updated a few links.

### Added
- Updated Community Calls pages. This includes adding an archive page
  for the March 23 call.

## [0.0.37][] - 2016-04-01
### Changed
- Updated a few links on the site.

### Added
- Added Curriculum Workshop archived pages.
- Added PULL_REQUEST_TEMPLATE.md.

## [0.0.36][] - 2016-03-29
### Changed
- Added attribution on Web Lit Basics I module.
- Updated link to Mozilla's Web Literacy whitepaper.
- Converted url values for weblit map to lowercase and replaced spaces 
  with dashes.
- The site now has a real server! Pages on https://teach.mozilla.org are 
  served by the server and are no longer static files live on S3.
- Removed S3 related gulp tasks and files.
- Both staging the production instances now live on Heroku instead. Auto-
  deployment to staging and production is triggered by push to `develop` 
  and `master` branches respectively.

## [0.0.35][] - 2016-03-24
### Changed
- Edited v0.0.34 release changelog message - production site hasn't been switched to
  use a real server yet.

### Added
- Woohooo! It's live now! Check out the interactive web literacy map on 
  https://teach.mozilla.org/web-literacy and 21st Century Skills on 
  https://teach.mozilla.org/web-literacy/skills

## [0.0.34][] - 2016-03-22
### Changed
- The site now has a real server! ~~Pages on https://teach.mozilla.org are 
  served by the server and are no longer static files live on S3.~~ (edited on 2016-03-24)
- Turned off auto push to S3 when the `develop` branch is updated.
- Updated Mouse logo.
- Removed Private Eye page.

### Added
- Added Community Call page.
- Added 404 messages server side.

## [0.0.33][] - 2016-03-10
### Changed
- Removed Creative Commons GIF Exchange module and CSS Story Cards module.
- Minor text updates to Curriculum Workshop page.

### Added
- Added two new modules to /activities, the Mouse module and Intermediate 
  Web Literacy module.

## [0.0.32][] - 2016-03-02
### Changed
- Updated the donate link.
- Replaced Pledge to Teach CTA with newsletter signup.
- Updated newsletter subscription url.

### Added
- Added Curriculum Workshop page.

## [0.0.31][] - 2016-02-16
### Changed
- The build system for the site got an overhaul.
- Links to the Goggles were updated to point to its new home.
- The "Creating Commons GIF exchange" activity got a new link.
- The "CSS Story Cards" activity got a new link.

### Added
- Added Let's Encrypt campaign material.

## [0.0.30][] - 2016-01-14
### Changed
- The Teach Like Mozilla page has been removed.
- Nav links on the sidebar have been reorganized.
- More UI tweaks! We've updated many icons on the site to make sure they
  share the same styling.

### Added
- Added Leadership Opportunities page.
- Added Parapara teaching kit.
- Added link to the Online Tracking module.

## [0.0.29][] - 2015-12-22
### Changed
- Updated dependencies including uplifting React to v0.14 and other packages.
- Started UI unification work.
- Updated page banners across the site.

### Added
- Added Webmaker activity kit.
- Added Community page.


## [0.0.28][] - 2015-12-04
### Changed
- Replaced the sidebar with a cleaner design.
- Fixed broken links to Discourse.

## [0.0.27][] - 2015-12-03
### Added
- Added a Made with Code activity kit.
- Added Web Lit Basics II activity kit.
- Updated README.md to include platform specific setup instructions.
- "Help us translate" CTA has been added to the Web Literacy Basics page.

### Changed
- Simplified footer section.


## [0.0.26][] - 2015-11-23
### Added
- Added "Back to School" activity kit.
- Added verbage on node dependencies and node version management to README.md
- Added options for free & low cost linux dev environments to README.md

### Changed
- Updated Made with Code pages with the new Google logo.
- Fixed Hive logo sizing issue on Activities page.

## [0.0.25][] - 2015-10-28
### Added
- Added "Privacy Basics" activity.

### Changed
- Cleaned up some LESS code by introducing a pageColorizer mixin.
- Removed code used for an old A/B testing.
- We are now using mocha-phantomjs v4.*
- Bumped npm module lwip version from 0.0.5 to 0.0.8.

## [0.0.24][] - 2015-10-14
### Added
- Added 'Your Projects' page. This is a page for users to see the projects
  they created using tools that we retired, such as Popcorn Maker and Appmaker,
  as well as older versions of Thimble and X-Ray Goggles.

### Changed
- Removed links to the old Webmaker search.


## [0.0.23][] - 2015-09-30
### Added
- Added two homepage variations for A/B testing

## [0.0.22][] - 2015-09-23
### Added
- The pledge modal on the homepage pops up automatically for users who
  visit the site for the first time.
- Check out the "Quacking JavaScript" module that we added to the
  Teaching Activities page.

### Changed
- The Clubs Toolkit page has been removed. New guides are coming soon so
  stay tuned.
- Updated Thimble's sample activity listed on the Tools page.
- The About page has been refreshed.
- We can now track outbound links from the Tools page to each tool listed there.
- Removed Creative Commons license note from Teaching Activites pages due to
  change in policy by Legal to no longer require that particular license.
- The GitHub repo name has been renamed from teach.webmaker.org
  to teach.mozilla.org. This shouldn't affect anything to end users.

## [0.0.21][] - 2015-09-03
### Added
- Check out the full list of Mozilla Clubs on a newly added page
  https://teach.mozilla.org/clubs/list/

### Changed
- /clubs page has been redesigned. We have added lots resources to
  help users better understand what a Mozilla Club is and the value of
  starting a Mozilla Club. The full list of Mozilla Clubs has been
  moved to a new page https://teach.mozilla.org/clubs/list/.


## [0.0.20][] - 2015-09-02
### Added
- We introduced two new env vars `OPTIMIZELY_ID` and `OPTIMIZELY_ACTIVE`
  in the last release. This patch exports these env vars to the client-side
  browser code as well as sets appropriate values for them.

### Changed
- Two modals that are used on the /clubs page have been factored out as
  `<ModalAddOrChangeYourClub>` and `<ModalRemoveYourClub>` components.


## [0.0.19][] - 2015-09-01
### Added
- Promo banner on the homepage has been replaced with Thimble call out.
- Link to Thimble has been updated to https://thimble.mozilla.org.
- A resource link to "Color Oracle" has been added to CONTRIBUTING.md.
- Optimizely tags have been added to enable us to start A/B testings.

### Changed
- "Pledge" button has been adjusted as it previously looked misaligned.
- Button on homepage promo banner has been given a more subtle style.
- The license string has been fixed to match SPDX format.

## [0.0.18][] - 2015-08-18
### Changed
- The link to the legal page has been updated.

## [0.0.17][] - 2015-08-12
### Added
- We have added GA tracking for external links on Activities page as well as
  Discourse link on the sidebar.
- A general Mozilla favicon "m" has been added.
- The Maker Party promo banner on Home page has been replaced by MozFest
  call for proposals callout.

### Changed
- The Events page has been refreshed with post Maker Party updates. This
  includes copy changes and the removal of Maker Party mailinglist signup forms.
  The `MAILINGLIST_URL` and `MAILINGLIST_PRIVACY_NAME` env vars have also
  been removed since they are not in use anymore.
- Keys in `travis.yml` have been updated to fix deployment problem.
- Routes in `lib/routes.jsx` have been rearranged alphabetically by their path
  for readability purposes.

## [0.0.16][] - 2015-07-27
### Added
- Link to a sample Webmaker activity has been added to the Tools page.
- We record a GA event when any of the three Homepage CTA buttons is clicked.
- The three Made with Code activities pages that are currently on webmaker.org
  have been migrated here.
- The Private Eye activity page has been migrated from webmaker.org.

### Changed
- Our semvar string for phantomjs now matches mocha-phantomjs's(1.9.1 - 1.9.7-15).
  This is to fix the NPM error rasied from peerDependencies conflicts since the phantomjs
  we required before was at 1.9.17 but it was not a version mocha-phantomjs would take.
- Configs in .travis.yml have been updated.

## [0.0.15][] - 2015-07-15
### Changed
- Removed "Section X:" from the beginning of heading titles on the Web
  Literacy Basics, Protecting Your Data, and Maker Party 2015 Activities
  pages.
- Fixed the link to the "Hacking My Media" activity on the Maker Party
  2015 Activities page.

## [0.0.14][] - 2015-07-14
### Added
- Two Webmaker App activities have been added to the Maker Party 2015 page.
- We now have a health check page (https://teach.mozilla.org/healthcheck/) that lists
  out site meta details such as version number and the git revision it is based on.
- Unit tests for pledge modals have been added.

### Changed
- Some copy edits have been made to the Add Your Club workflow to inform users
  we have reached capacity for accepting new Clubs for now.
- Replaced the out-of-date Webmaker logo with the brand new one!

## [0.0.13][] - 2015-07-08
### Added
- Link of David's Twitter page has been added to the "Net Neutrality Maker Party"
  section on the Events page.
- `og:image` meta tag has been added to all pages and it is currently
  hardcoded to use the homepage's hero unit image. You can also spider
  `og:image` by running `npm test`.

### Changed
- The header of the third section on Maker Party activities page has
  been fixed. It is now "Participating on the Web".
- We have updated Creative Commons license note to reference to v3.0.

## [0.0.12][] - 2015-07-02
### Added
- A "Maker Party 2015 Activities" page has been added. Check out some fun
  sample activities we put together.
- SVG images are now optimized by SVGO. SVGO will fail if it encounters a SVG
  that was exported with the "Preserve Illustrator Editing Capabilities" option
  checked.

### Changed
- Refreshed the Events page to include a link to sample Maker Party activities
  as well as three Maker Party case studies.

## [0.0.11][] - 2015-06-30
### Added
- Added "Pledge to Teach" CTA button on the Home page to encourage
  site visitors to sign up the mentor mailing list.
- Introduced a new modal dialog design - folded corner. This style has
  been applied to the "Pledge to Teach" modal dialog.
- E-mail Regex validator has been moved to a newly created file `lib/util.js`.
- Added environment variables `PLEDGE_MAILINGLIST_URL`
  and `PLEDGE_MAILINGLIST_PRIVACY_NAME`.

### Changed
- The "Naming" subsection in the "Name and Brand Your Club" section on
  the Clubs Toolkit page has been updated.
- Fixed download links for assets on the Events Resources page. They now
  point to https://stuff.webmaker.org.

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

[unreleased]: https://github.com/mozilla/teach.webmaker.org/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.40...v1.0.0
[0.0.40]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.39...v0.0.40
[0.0.39]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.38...v0.0.39
[0.0.38]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.37...v0.0.38
[0.0.37]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.36...v0.0.37
[0.0.36]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.35...v0.0.36
[0.0.35]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.34...v0.0.35
[0.0.34]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.33...v0.0.34
[0.0.33]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.32...v0.0.33
[0.0.32]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.31...v0.0.32
[0.0.31]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.30...v0.0.31
[0.0.30]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.29...v0.0.30
[0.0.29]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.28...v0.0.29
[0.0.28]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.27...v0.0.28
[0.0.27]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.26...v0.0.27
[0.0.26]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.25...v0.0.26
[0.0.25]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.24...v0.0.25
[0.0.24]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.23...v0.0.24
[0.0.23]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.22...v0.0.23
[0.0.22]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.21...v0.0.22
[0.0.21]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.20...v0.0.21
[0.0.20]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.19...v0.0.20
[0.0.19]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.18...v0.0.19
[0.0.18]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.17...v0.0.18
[0.0.17]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.16...v0.0.17
[0.0.16]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.15...v0.0.16
[0.0.15]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.14...v0.0.15
[0.0.14]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.13...v0.0.14
[0.0.13]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.12...v0.0.13
[0.0.12]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.11...v0.0.12
[0.0.11]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.10...v0.0.11
[0.0.10]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.9...v0.0.10
[0.0.9]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.8...v0.0.9
[0.0.8]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.7...v0.0.8
[0.0.7]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.6...v0.0.7
[0.0.6]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.5...v0.0.6
[0.0.5]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/mozilla/teach.webmaker.org/compare/v0.0.1...v0.0.2
