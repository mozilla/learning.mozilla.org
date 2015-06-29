// This component is intended to work around the many problems involved
// in using the ARIA "alert" role across multiple platforms, browsers, and
// screen readers:
//
// http://www.paciellogroup.com/blog/2012/06/html5-accessibility-chops-aria-rolealert-browser-support/
//
// It does this by using a (mostly) hidden #a11y-alert div on the page,
// whose role="alert", like so:
//
// <div id="a11y-alert" role="alert"></div>
//
// This element *must* exist on the page at load time, or else
// many screen readers won't see it.
//
// Whenever an AccessibleAlert component is mounted to
// the DOM, its text contents will be synced with #a11y-alert, allowing
// screen readers to announce its contents immediately.

var React = require('react/addons');

function announceAlert(text) {
  var id = "a11y-alert";
  var elem1 = document.getElementById(id);
  var p = document.createElement('p');

  if (!elem1) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn("#" + id + " not found.");
    }
    return;
  }

  elem1.innerHTML = '';
  if (text) {
    p.appendChild(document.createTextNode(text));
    elem1.appendChild(p);
  }
}

var AccessibleAlert = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  componentDidMount: function() {
    announceAlert(this.getDOMNode().textContent);
  },
  componentDidUpdate: function() {
    announceAlert(this.getDOMNode().textContent);
  },
  componentWillUnmount: function() {
    announceAlert('');
  },
  render: function() {
    return (
      <div {...this.props}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = AccessibleAlert;
