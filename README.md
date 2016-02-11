[![Build Status](https://travis-ci.org/mozilla/teach.mozilla.org.svg)](https://travis-ci.org/mozilla/teach.mozilla.org)

This is the source code for [teach.mozilla.org][].

**For a summary of the most recent changes to the project, please
see [`CHANGELOG.md`][changelog]. It's awesome.**

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

To get a local version of the site running, you'll need to have [git](http://git-scm.com/) and [node](http://nodejs.org/) installed on your local machine.  

### Clone

In order to contribute to this project, you'll need to **create your own fork** of it and make pull-requests against our master branch.

Clone from your own fork or from the original:

```
git clone git@github.com:mozilla/teach.mozilla.org.git
cd teach.mozilla.org
```

### Build and Develop

To start developing, all you need to do is run the following in the `teach.mozilla.org` directory you just created:

```
$> npm install
$> npm start
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
* `hoc/`: React higher-order components

Less
* `less/`: This is where you should add styles. `common.less` is the entry-point.

Other
* `gulp/`: build tasks used for running the site, as well as testing
* `build/`: used as a staging area when the site gets built
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

Each test file should end with `.test.js` or `.test.jsx` and will be
automatically discovered by the test runner.

Individually running *only* the browser unit tests can be accomplished
by first running `npm start` and then visiting http://localhost:8008/test/
in your browser.

#### Manual Tests

For detailed information about manual testing, see the
[Manual Testing][] section of `CONTRIBUTING.md`.

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
`WEBPACK_DEVTOOL` | determines the setting for the [`devtool`][] Webpack option. In development, it defaults to `eval`, while in production it defaults to `source-map`. For more details on the trade-offs between different options, see our [conversation on sourcemaps][sourcemaps].
`LESS_AUTOPREFIXER` | set this to `off` to disable the LESS autoprefixer and enable useful CSS source maps, which is a workaround for [#413][].
`AWS_ACCESS_KEY` | is the Amazon Web Services access key used when uploading to s3 via `npm run s3`.
`AWS_SECRET_KEY` | is the Amazon Web Services secret key used when uploading to s3 via `npm run s3`.
`AWS_BUCKET` | is the S3 bucket to upload to when using `npm run s3`. It defaults to `teach.mofostaging.net`.
`AWS_REGION` | is the S3 region to upload to when using `npm run s3`. It defaults to `us-east-1`.
`ORIGIN` | is the domain name of which the site is hosted. This is used in situations where absolute URLs are required, such as generating a `sitemap.xml` file.
`MAPBOX_ACCESS_TOKEN` | is the [Mapbox][] access token to use for embedded maps in the website. Optional.
`MAPBOX_MAP_ID` | is the Mapbox map ID to use for embedded maps in the website. Optional.
`TEACH_API_URL` | is the origin of the [Teach API][] server. Defaults to `https://teach-api.herokuapp.com`.
`GA_ACCOUNT` | is the property ID of the Google Analytics account. E.g. `UA-123...`. It defaults to the property ID for the Teach site. Set it to `DISABLED` to disable Google Analytics entirely.
`GA_DEBUG` | When set to 'on' will output verbose info to the console about what data is being sent to Google Analytics.
`PLEDGE_MAILINGLIST_URL` | is the pledge signup form URL generated by BSD. If undefined, mailinglist signup is simulated for development purposes.
`PLEDGE_MAILINGLIST_PRIVACY_NAME` | is the `name` attribute of the privacy policy checkbox on the pledge signup form generated by BSD.
`PORT` | is the port to serve the experimental lightweight dynamic server on. Defaults to 8008.
`OPTIMIZELY_ID` | Optimizely Project ID (not a secret) e.g. '206878104'
`OPTIMIZELY_ACTIVE` | If set to 'yes' (String) the project will include Optimizely snippet in the page load
`MAKE_METADATA_URL` | The template source url to load users' Makes metadata. Username should be included in the URL as a variable. e.g., `https://{username}.makes.org/makes.json`

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

## Lightweight Dynamic Server (Experimental)

The site can also be served through a lightweight server which
dynamically generates requested HTML files. This feature is currently
experimental. For more information on the rationale behind it, see
[#585][].

To run the server in development mode, use `npm run app`. The
server-side page rendering code will be dynamically updated as
relevant files are changed.

For production deployment, you will need to:

1. Set `NODE_ENV=production` and other relevant environment variables
   and then re-run `npm install`. This will build all static assets
   that won't change during production.

2. Run `node app.js`.

The server is also designed to be easily deployable on Heroku.

## References

* [Roadmap][roadmap]
* [Change Log][changelog]
* [Contribution Guidelines][contributing]

<!-- links -->

  [teach.mozilla.org]: https://teach.mozilla.org
  [`devtool`]: http://webpack.github.io/docs/configuration.html#devtool
  [sourcemaps]: https://github.com/mozilla/teach.mozilla.org/pull/147#discussion-diff-25879885
  [roadmap]: http://wiki.webmaker.org/Teach
  [mocha]: http://mochajs.org/
  [mocha (1)]: http://mochajs.org/#usage
  [should]: https://www.npmjs.com/package/should
  [teach.mofostaging.net]: http://teach.mofostaging.net/
  [Mapbox]: http://mapbox.com/
  [Teach API]: https://github.com/mozilla/teach-api
  [#413]: https://github.com/mozilla/teach.mozilla.org/issues/413
  [source maps]: http://blog.teamtreehouse.com/introduction-source-maps
  [changelog]: https://github.com/mozilla/teach.mozilla.org/blob/develop/CHANGELOG.md
  [contributing]: https://github.com/mozilla/teach.mozilla.org/blob/develop/CONTRIBUTING.md
  [Manual Testing]: https://github.com/mozilla/teach.mozilla.org/blob/develop/CONTRIBUTING.md#manual-testing
  [#585]: https://github.com/mozilla/teach.mozilla.org/issues/585
