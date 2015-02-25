This is an initial attempt at implementing the Webmaker Learning
front-page.

## Quick Start

Just point Firefox at the `index.html` file on your filesystem.

If you're using a different browser, this might not work. 
You should probably just set up a static web server at the
root of the repository; consider using `python -m SimpleHTTPServer' or
node's [http-server][].

## Generating A Static Site

The `index.html` is intended for development and does a lot of dynamic
things on the client-side.

Run `node bin/generate-static.js` to generate a static site that
doesn't require any client-side JavaScript.

## References

* [Cassie's original PSD files][psd]

<!-- links -->

  [http-server]: https://www.npmjs.com/package/http-server
  [psd]: https://www.dropbox.com/sh/2kbwq2cl9x6q0r8/AAA2Io_uv8sW0MVqyZr4H8Tca?dl=0#/
