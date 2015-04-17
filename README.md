[![Build Status](https://travis-ci.org/mozilla/teach.webmaker.org.svg)](https://travis-ci.org/mozilla/teach.webmaker.org)

This is an initial attempt at implementing the Webmaker Learning
website.

# Overview

This software consists of two major parts:

* A **static site generator** that creates a number of
  `index.html` files in various directories which can be viewed
  in any browser, including ones that don't support JavaScript.
* Client-side JavaScript code that **progressively enhances**
  the user experience based on browser capabilities.

It should be noted that, based on the
[product roadmap][roadmap], the static site generator
may eventually evolve into becoming a dynamic server.

# Get started

### Dependencies

To get a local version of teach.webmaker.org running, you'll need to have [git](http://git-scm.com/) and [node](http://nodejs.org/) installed on your local machine.

### Clone

In order to contribute to this project, you'll need to **create your own fork** of it and make pull-requests against our master branch.

Clone from your own fork or from the original:

```
git clone git@github.com:mozilla/teach.webmaker.org.git
cd teach.webmaker.org
```

### Build and Develop

To start developing, all you need to do is run the following in the `teach.webmaker.org` directory you just created:

```bash
npm install
npm start
```

This will start a webserver for you at `http://localhost:8008`, and run a `watch` process so that your front-end assets will be regenerated as you make changes.

### A note about source maps

Because this project uses a variety of tools that transform the
original source code before delivering it to the browser, it is critical
for [source maps][] to work properly in order to ensure a pleasant
developer experience.

However, due to the unfortunate realities of software development, there
isn't a "one size fits all" solution to this. Please be sure to read the
**Environment Variables** section below and configure your environment
as needed to ensure that you're seeing useful line numbers for
whatever part of the codebase you need to change.

### Directory and naming conventions

JS
* `lib/`: Non-react modules, as well as entry-point modules like `main.jsx` and `routes.jsx`
* `components/`: Re-usable react components that can be used throughout the site
* `pages/`: React "page" components, i.e. top-level pages required by `lib/router`
* `mixins/`: React mixins

Less
* `less/`: This is where you should add styles. `common.less` is the entry-point.

Other
* `test/`: For js tests, manual tests
* `img/`: For images
* `dist/`: Generated site assets goes here. **This folder is gitignored, do not edit files here.**

### Test

Fully testing the code is accomplished by running `npm test`,
which exercises a number of different aspects of the
codebase described below.

#### Static Site Generation (Smoke Test)

This generates a full static site and
ensures that **no React warnings are raised**.

Individually running *only* the smoke test can be accomplished
via `npm run smoketest`.

#### Unit Tests

Unit tests are spread across two different testing
environments.

Both environments use the [mocha][] test runner and [should][]
for assertions.

##### Node Tests

These tests generally exercise the code of the static site generator
and are located in the `test` directory.

Each test file should end with `.test.js` and will be automatically
discovered by the test runner.

Individually running *only* the node unit tests can be accomplished
via `node_modules/.bin/mocha test/*.test.js`. For more options,
see the documentation for [mocha (1)][].

##### Browser Tests

These tests exercise the code that runs in the user's browser. They're
located in the `test/browser` directory.

Browser test files are *not* automatically discovered and should
be explicitly `require`'d in `test/browser/main.js`.

Individually running *only* the browser unit tests can be accomplished
by first running `npm start` and then visiting http://localhost:8008/test/
in your browser.

#### Manual Tests

You can also visit http://localhost:8008/test/manual/ for a basic
manual test suite.

Additionally, if you need to make sure that a page is usable with
JS disabled, just add `safemode=on` to the querystring when visiting the
page. This will cause the page to operate in "safe mode", meaning that
almost no JS will run, even if JS is enabled in the browser.

## Generating A Static Site

Run `npm run build` to generate a static site in `dist/` that
doesn't *require* any client-side JavaScript. This static
site also uses `history.pushState` for navigation if the browser
supports it.

For reference, a recent static build of the site can be found at
[teach.mofostaging.net][].

The static site can also be deployed to S3 via `npm run s3`, but
this requires setting at least a few environment variables. See
the **Environment Variables** section below for more details.

## Environment Variables

The following environment variables can be used to modify how the
software works.

   Name | Description
------------------|---------------------------------------------
`NODE_ENV` | set this to `production` to automatically minify code and remove various development-only affordances.
`SHOW_DEV_RIBBON` | set this to `on` to show the "dev version" ribbon even when `NODE_ENV` is set to production. This can be used on staging sites.
`WEBPACK_DEVTOOL` | determines the setting for the [`devtool`][] Webpack option. In development, it defaults to `eval`, while in production it defaults to `source-map`. For more details on the trade-offs between different options, see our [conversation on sourcemaps][sourcemaps-wtf].
`LESS_AUTOPREFIXER` | set this to `off` to disable the LESS autoprefixer and enable useful CSS source maps, which is a workaround for [#413][].
`AWS_ACCESS_KEY` | is the Amazon Web Services access key used when uploading to s3 via `npm run s3`.
`AWS_SECRET_KEY` | is the Amazon Web Services secret key used when uploading to s3 via `npm run s3`.
`AWS_BUCKET` | is the S3 bucket to upload to when using `npm run s3`. It defaults to `teach.mofostaging.net`.
`AWS_REGION` | is the S3 region to upload to when using `npm run s3`. It defaults to `us-east-1`.
`ORIGIN` | is the domain name of which the site is hosted. It defaults to `https://teach.webmaker.org`. This is used in situations where absolute URLs are required, such as generating a `sitemap.xml` file.
`MAPBOX_ACCESS_TOKEN` | is the [Mapbox][] access token to use for embedded maps in the website. Optional.
`MAPBOX_MAP_ID` | is the Mapbox map ID to use for embedded maps in the website. Optional.
`TEACH_API_URL` | is the origin of the [Teach API][] server. Defaults to `https://teach-api.herokuapp.com`.
`GA_ACCOUNT` | is the property ID of the Google Analytics account. E.g. `UA-123...`. It defaults to the property ID for the Teach site. Set it to `DISABLED` to disable Google Analytics entirely.
`GA_DEBUG` | When set to 'on' will output verbose info to the console about what data is being sent to Google Analytics.
`SOFTEST_OF_LAUNCHES` | When set to 'on' will enable the [softest of launches][589].

### Using Environment Variables in Local Development

First, create a `.env` file in the root of your project:

```
export GA_ACCOUNT='xxxxxxx'
export TEACH_API_URL='xxxxxxx'
```

Then run `source .env` before running `npm start`.

**Note:** If you're on Windows, this won't work, and you'll likely
want to create a batch file that uses
[`setx.exe`](http://stackoverflow.com/a/11190331).

## References

* [Cassie's original PSD files][psd]
* [Cassie's Teach Website mockups on Red Pen][redpen_teach]
* [Cassie's Club Page mockups on Red Pen][redpen_club]

<!-- links -->

  [psd]: https://www.dropbox.com/sh/2kbwq2cl9x6q0r8/AAA2Io_uv8sW0MVqyZr4H8Tca?dl=0#/
  [redpen_teach]: https://redpen.io/p/tv97d65122e4dcb2ab
  [redpen_club]: https://redpen.io/p/jza7e4f541a24313ff
  [`devtool`]: http://webpack.github.io/docs/configuration.html#devtool
  [sourcemaps-wtf]: https://github.com/mozilla/teach.webmaker.org/pull/147#discussion-diff-25879885
  [roadmap]: https://wiki.mozilla.org/Learning/Networks/Product-Roadmap
  [mocha]: http://mochajs.org/
  [mocha (1)]: http://mochajs.org/#usage
  [should]: https://www.npmjs.com/package/should
  [teach.mofostaging.net]: http://teach.mofostaging.net/
  [Mapbox]: http://mapbox.com/
  [Teach API]: https://github.com/mozilla/teach-api
  [#413]: https://github.com/mozilla/teach.webmaker.org/issues/413
  [source maps]: http://blog.teamtreehouse.com/introduction-source-maps
  [589]: https://github.com/mozilla/teach.webmaker.org/issues/589
