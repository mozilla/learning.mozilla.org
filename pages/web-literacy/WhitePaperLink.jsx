var React = require('react');
var OutboundLink = require('react-ga').OutboundLink;

var WhitePaperLink = React.createClass({
  render: function() {
    var whitepaperLink = "http://mozilla.github.io/content/web-lit-whitepaper/";
    return (
      <section className="text-center">
        <div className="vertical-divider"></div>
        <h3 className="text-center">Read our whitepaper on why Mozilla cares about Web Literacy.</h3>
        <OutboundLink to={whitepaperLink} eventLabel={whitepaperLink} className="btn btn-awsm">
          Read whitepaper <i className="fa fa-external-link"></i>
        </OutboundLink>
      </section>
    );
  }
});

module.exports = WhitePaperLink;
