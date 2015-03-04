var React = require('react');

var config = require('./config');
var windowUtil = require('./window-util');
var pages = require('./pages.jsx');

var renderPage = null;

// 'Ia' is short for 'Internal <a>', meaning a link to somewhere
// 'internal', i.e. on the same site. Might want to revisit this
// name later if it's really confusing.
var Ia = React.createClass({
  propTypes: {
    'href': React.PropTypes.string.isRequired,
    'className': React.PropTypes.string
  },
  statics: {
    setRenderPageHandler: function(f) {
      renderPage = f;
    }
  },
  handleClick: function(e) {
    e.preventDefault();

    renderPage(this.props.href);

    window.history.pushState({
      url: this.props.href
    }, '', windowUtil.getAbsoluteURL(this.props.href));
  },
  render: function() {
    var href;

    if (!(this.props.href in pages.PAGES)) {
      console.warn("Unknown <Ia> href: " + this.props.href);
    }
    href = this.props.href.slice(1);
    if (config.IN_STATIC_SITE &&
        window.location.protocol == 'file:') {
      href += 'index.html';
    }

    return (
      <a href={href} className={this.props.className}
         onClick={config.ENABLE_PUSHSTATE ? this.handleClick : null}>
        {this.props.children}
      </a>
    );
  }
});

module.exports = Ia;
