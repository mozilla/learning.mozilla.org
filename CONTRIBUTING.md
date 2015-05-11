# Contribution Guidelines

## Getting Help

If you have any questions about anything in this document, please
feel free to join us in the **#webmaker** channel on irc.mozilla.org!

## Reporting Issues

- **Search for existing issues.** Please check to see if someone else
  has reported the same issue.
- **Share as much information as possible.** Include operating system
  and version, browser and version. Also, include steps to reproduce
  the bug.
- If you're experiencing a visual bug, consider [attaching][] a
  [screenshot][] to your issue. It's extremely helpful.

## Code Style

For all files, try to limit your line length to a maximum of 100
characters.

### JavaScript

We use the [MoFo JavaScript Style Guide][js]. Our automated test suite,
described in the [README][], automatically checks for most of this.

### HTML / JSX

- 2 space indentation
- Class names use hypenated case (e.g. `my-class-name`)

### LESS / CSS

- 2 space indentation
- Always a space after a property's colon (e.g. `display: block;`
  *not* `display:block;`)
- End all lines with a semicolon
- For multiple, comma-separated selectors, prefer to place each
  selector on its own line

## Testing

### Automated Testing

If you're writing any JavaScript code, please add automated tests 
to exercise it. Guidance on how to do this can be found in the
[README][]. If you need any help, please ask!

### Operating Systems

If you're changing anything that needs to be run by developers, please
try to manually test your changes on a Unix-like OS (Linux/OS X) and
Windows if possible.

To that end, please don't assume that users have Unix tools like
`cp`, `xargs`, and `bash` on their system, or that their OS
understands symbolic links.

### Browsers

If possible, manually test your changes on the latest version of
Firefox, Chrome, Internet Explorer, and Safari.

## Pull requests

- Before submitting a PR, run `npm test` to ensure that everything
  still works.
- If possible, please update the [CHANGELOG][] when making any changes to
  dependencies, provided APIs, UI/UX, or environment settings.
- Try to share which browsers and devices your code has been tested
  in before submitting a pull request.
- If your PR resolves an issue, include **fixes #ISSUE_NUMBER** in your
  commit message (or a [synonym][]).

[attaching]: https://github.com/blog/1347-issue-attachments
[screenshot]: https://www.google.com/search?q=how+to+take+a+screenshot
[README]: https://github.com/mozilla/teach.webmaker.org#readme
[CHANGELOG]: https://github.com/mozilla/teach.webmaker.org/blob/develop/CHANGELOG.md
[js]: https://github.com/MozillaFoundation/javascript-style-guide
[synonym]: https://help.github.com/articles/closing-issues-via-commit-messages
