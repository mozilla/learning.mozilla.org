[![Build Status](https://travis-ci.org/toolness/mozilla-learning-html.svg?branch=gh-pages)](https://travis-ci.org/toolness/mozilla-learning-html)

This is an initial attempt at implementing the Webmaker Learning
front-page.

## Quick Start

```
git clone git@github.com:toolness/mozilla-learning-html.git
cd mozilla-learning-html
npm install
node_modules/.bin/gulp watch
```

Just point your browser at the `dist/index.html` file on your filesystem.

## Generating A Static Site

Run `gulp` to generate a static site in `dist/` that
doesn't *require* any client-side JavaScript. This static
site also uses `history.pushState` for navigation if the browser
supports it.

For reference, a recent static build of the site can be found at
http://mozilla-learning-html.s3-website-us-east-1.amazonaws.com/.

## References

* [Cassie's original PSD files][psd]
* [Cassie's Teach Website mockups on Red Pen][redpen_teach]
* [Cassie's Club Page mockups on Red Pen][redpen_club]

<!-- links -->

  [psd]: https://www.dropbox.com/sh/2kbwq2cl9x6q0r8/AAA2Io_uv8sW0MVqyZr4H8Tca?dl=0#/
  [redpen_teach]: https://redpen.io/p/tv97d65122e4dcb2ab
  [redpen_club]: https://redpen.io/p/jza7e4f541a24313ff
