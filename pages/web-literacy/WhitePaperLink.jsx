var React = require('react');
var OutboundLink = require('react-ga').OutboundLink;

var WhitePaperLink = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  render: function() {
    var formatMessage = this.context.intl.formatMessage;
    var whitepaperLink = "http://mozilla.github.io/content/web-lit-whitepaper/";

    return (
      <section className="text-center">
        <div className="vertical-divider"></div>
        <h3 className="text-center">{formatMessage({id:"read_whitepaper_cta"})}</h3>
        <OutboundLink to={whitepaperLink} eventLabel={whitepaperLink} className="btn">
          {formatMessage({id:"read_whitepaper"})} <i className="fa fa-external-link"></i>
        </OutboundLink>
      </section>
    );
  }
});

module.exports = WhitePaperLink;
