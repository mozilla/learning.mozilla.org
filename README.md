[![Build Status](https://travis-ci.org/mozilla/teach.webmaker.org.svg)](https://travis-ci.org/mozilla/teach.webmaker.org)

This is an initial attempt at implementing the Webmaker Learning
front-page.

# Get started

### Dependencies

To get a local version of teach.webmaker.org running, you'll need to have [git](http://git-scm.com/) and [node](http://nodejs.org/) installed on your local machine.

### Clone

In order to contribute to Webmaker Mobile, you'll need to **create your own fork** of Webmaker Mobile and make pull-requests against our master branch.

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

## Generating A Static Site

Run `npm run build` to generate a static site in `dist/` that
doesn't *require* any client-side JavaScript. This static
site also uses `history.pushState` for navigation if the browser
supports it.

For reference, a recent static build of the site can be found at
http://mozilla-learning-html.s3-website-us-east-1.amazonaws.com/.

## Environment Variables

The following environment variables can be used to modify how the
software works.

**Note:** When an environment variable is described as representing a
boolean value, if the variable exists with *any* value (even the empty
string), the boolean is true; otherwise, it's false.

* `WEBPACK_DEVTOOL` determines the setting for the [`devtool`][] Webpack
  option. It defaults to `source-map`; if you're on Firefox, though,
  you may want to set it to `eval` so that console logging statements
  originate from useful line numbers. For more details on the
  trade-offs between different options for development, see our
  [conversation on sourcemaps][sourcemaps-wtf].

* `ENABLE_REACT_A11Y` is a boolean that enables [react-a11y][]
  accessibility warnings. Once [#138][] is fixed, we'll get rid of this
  environment variable and the warnings will *always* be enabled.

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
  [react-a11y]: https://github.com/rackt/react-a11y#readme
  [#138]: https://github.com/mozilla/teach.webmaker.org/issues/138

