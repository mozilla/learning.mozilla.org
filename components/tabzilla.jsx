// This is a Tabzilla "lazy-loader" for sites that don't use jQuery.
// Because Tabzilla requires jQuery and jQuery is relatively large,
// we delay loading it until the last possible moment, when the user
// has expressed intent to explore Tabzilla.
//
// Only one instance of this component is expected to ever be on the
// page at once, and it's expected to exist for the lifetime of the
// whole page.
//
// This component does require the following stylesheet to be loaded,
// however:
//
//   //mozorg.cdn.mozilla.net/media/css/tabzilla-min.css

var React = require('react');

// This is currently the minimum version of jQuery that Tabzilla requires
// to load.
var JQUERY = '//mozorg.cdn.mozilla.net/media/js/libs/jquery-1.7.1.min.js';
var TABZILLA = '//mozorg.cdn.mozilla.net/tabzilla/tabzilla.js';

var Tabzilla = React.createClass({
  propTypes: {
    className: React.PropTypes.string
  },
  handleClick: function(e) {
    if (!this.lazyLoadStarted) {
      this.lazyLoadStarted = true;
      e.preventDefault();
      loadScript(JQUERY, function() {
        loadScript(TABZILLA, function() {
          window.Tabzilla.open();
        });
      });
    }
  },
  render: function() {
    return <a 
      href="https://www.mozilla.org/"
      id="tabzilla"
      onClick={this.handleClick}
      className={this.props.className}>mozilla</a>;
  }
});

// This is based on Tabzilla's own jQuery-loading code.
function loadScript(src, cb) {
  var script = document.createElement("script");
  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" ||
          script.readyState === "complete") {
        script.onreadystatechange = null;
        cb();
      }
    };
  } else {
    script.onload = cb;
  }
  script.src = src;
  document.getElementsByTagName('head')[0].appendChild(script);
}

module.exports = Tabzilla;
