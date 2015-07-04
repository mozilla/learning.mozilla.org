var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var packageJSON = require('../package.json');
var config = require('../lib/config');

var HealthcheckPage = React.createClass({
  statics: {
    pageClassName: "healthcheck",
    pageTitle: 'Site Health Check'
  },
  getInitialState: function() {
    return {
      commit: ""
    }
  },
  componentDidMount: function() {
    var rev = document.querySelector('meta[name="git-rev"]').getAttribute('content');
    var commitDom = document.querySelector(".commit");
    commitDom.innerHTML = rev.slice(0,10);
    commitDom.setAttribute("href", "https://github.com/mozilla/teach.webmaker.org/commit/"+rev);
  },
  render: function() {
    var siteType = (process.env.NODE_ENV === 'production') ? "production" : "development";
    return (
      <div className="site-meta">
        <h1>Site Health Check</h1>
        <p>
          This is a {siteType} version of the <a href="https://github.com/mozilla/teach.webmaker.org" target="_blank">Teach Site</a> based on commit
          <code>
              <a target="_blank" href="" className="commit"> </a>
          </code>,
          which is based on version
          <code>
            <a target="_blank"
               href={"https://github.com/mozilla/teach.webmaker.org/releases/tag/v" + packageJSON.version}>
              {packageJSON.version}
            </a>
          </code>
        </p>
        <p>
          <small>go back to <Link to="home">{config.ORIGIN}</Link></small>
        </p>
      </div>
    );
  }
});

module.exports = HealthcheckPage;
