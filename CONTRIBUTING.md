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

### Manual Testing

#### Operating Systems

If you're changing anything that needs to be run by developers, please
try to manually test your changes on a Unix-like OS (Linux/OS X) and
Windows if possible.

To that end, please don't assume that users have Unix tools like
`cp`, `xargs`, and `bash` on their system, or that their OS
understands symbolic links.

#### Browsers

If possible, manually test your changes on the latest version of
Firefox, Chrome, Internet Explorer, and Safari.

Visiting http://localhost:8008/test/manual/ will give you a
"bird's eye view" of the site's major routes at different viewport
dimensions, which can be useful for ensuring that your changes
are responsive.

Additionally, if you need to make sure that a page is usable with
JS disabled, just add `safemode=on` to the querystring when visiting the
page. This will cause the page to operate in "safe mode", meaning that
almost no JS will run, even if JS is enabled in the browser.

To ensure that the site is accessible, consider using a
screen reader like [VoiceOver][] (OS X) or [NVDA][] (Windows) to
visit any pages you've added or changed. And if you've added
or changed any JavaScript-based logic for UI, make sure it
satisfies the Paciello Group's [Web Components punch list][].

##### HTML5 Form Validation

If you've created or made changes to any forms, make sure they
work with browsers that don't support HTML5 form validation
by using the [novalidate][] bookmarklet. Alternatively, you can
paste the following into your Web console before submitting a form:

```javascript
for(var f=document.forms,i=f.length;i--;)f[i].setAttribute("novalidate",i)
```

##### Diagnostics

For any pages you've added or changed, make sure you
use [PageSpeed Insights][], [WebPagetest][], and/or
[What Does My Site Cost][] to ensure the page performs
acceptably across a range of devices and bandwidths. Use
[Tenon][] and [Color Oracle][] to ensure it's accessible.

You can conveniently run any of these tools on the current page
by clicking the "Dev Version" ribbon at the top-right of any
page on the site.

##### HTTPS

We often develop using http, but the production site is always
hosted via https. Consider using a tool like [ngrok][] to easily
tunnel into your local server over https to ensure that your
changes haven't introduced any [Mixed Content][] warnings.

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
[PageSpeed Insights]: https://developers.google.com/speed/pagespeed/insights/
[WebPagetest]: http://www.webpagetest.org/
[What Does My Site Cost]: http://whatdoesmysitecost.com/
[Tenon]: http://tenon.io/
[Color Oracle]: http://colororacle.org/
[ngrok]: https://ngrok.com/
[Mixed Content]: https://developer.mozilla.org/en-US/docs/Security/MixedContent
[VoiceOver]: http://webaim.org/articles/voiceover/
[NVDA]: https://www.marcozehe.de/articles/how-to-use-nvda-and-firefox-to-test-your-web-pages-for-accessibility/
[Web Components punch list]: http://www.paciellogroup.com/blog/2014/09/web-components-punch-list/
[novalidate]: http://novalidate.com/
