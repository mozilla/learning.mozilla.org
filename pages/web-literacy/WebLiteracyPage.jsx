var React = require('react');
var OutboundLink = require('react-ga').OutboundLink;

var Illustration = require('../../components/illustration.jsx');

var webmaps = require('./webmaplisting.jsx');

var WebLiteracyPage = React.createClass({
  statics: {
    pageTitle: "Web Literacy",
    pageClassName: "web-literacy"
  },
  render: function() {
    var whitepaperLink = "https://mozilla.github.io/webmaker-whitepaper";
    return (
      <div className="inner-container">
        <h1>Web Literacy</h1>

        <section className="intro">
          <Illustration
          width={210} height={210}
          src1x="/img/pages/web-literacy/svg/icon-weblit.svg"
          alt="web literacy illustration">
            <h2>
              Web Literacy is the skills and competencies needed for reading, writing, and participating on the Web.
            </h2>
          </Illustration>
        </section>

        <section>{webmaps}</section>

        <section className="text-center">
          <div className="vertical-divider"></div>
          <h3 className="text-center">Read our whitepaper on why Mozilla cares about Web Literacy.</h3>
          <OutboundLink to={whitepaperLink} eventLabel={whitepaperLink} className="btn btn-awsm">
            Read whitepaper <i className="fa fa-external-link"></i>
          </OutboundLink>
        </section>
      </div>
    );
  }
});

module.exports = WebLiteracyPage;
