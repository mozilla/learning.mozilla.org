var React = require('react');
var OutboundLink = require('react-ga').OutboundLink;

var Illustration = require('../../components/illustration.jsx');

var webmaps = require('./webmaplisting.jsx');

var CircleTree = require('../../components/circletree');
var weblitdata = require('./weblitdata');
var categories = require('./categories');
var weblitcolors = require('./colors');

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
          <p>
            A framework for entry-level web literacy &amp; 21st Century skills. Explore the map
            by selecting what you want to learn more about, to see definitions and activities.
          </p>
        </section>

        <section className="weblit-nav">
          <CircleTree data={weblitdata} color={weblitcolors} />
          <div className="c21-skills">
            <h3>21st Century Skills</h3>
            <ul>
            {
              Object.keys(categories).map(function(cat) {
                return (
                  <li className={cat} key={cat}>
                  <span className="icon">[☺]</span>
                  { categories[cat] }
                  </li>
                );
              })
            }
            </ul>
          </div>
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
