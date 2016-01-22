var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var packageJSON = require('../package.json');
var config = require('../lib/build/config');

var HealthcheckMeta = React.createClass({
  getInitialState: function() {
    return {
      rev: ""
    }
  },
  componentDidMount: function() {
    this.setState({ rev: document.querySelector('meta[name="git-rev"]').getAttribute('content') });
  },
  render: function() {
    var version = <span>
                    based on version{' '}
                    <code>
                      <a target="_blank"
                         href={"https://github.com/mozilla/teach.mozilla.org/releases/tag/v" + packageJSON.version}>
                        {packageJSON.version}
                      </a>
                    </code>
                  </span>;
    return (
      <div>
        <span>This is a {process.env.NODE_ENV || 'development'} version of the <a href="https://github.com/mozilla/teach.mozilla.org" target="_blank">Teach Site</a> </span>
        { this.state.rev ?
          <span>
            based on commit{' '}
            <code>
              <a target="_blank" href={"https://github.com/mozilla/teach.mozilla.org/commit/"+this.state.rev} className="commit">{this.state.rev.slice(0,10)}</a>
            </code>,
            which is {version} (potentially with <a
              target="_blank"
              href={"https://github.com/mozilla/teach.mozilla.org/compare/v" +
                    packageJSON.version + "..." + this.state.rev}>
                changes
              </a>).
          </span>
          : <div>{version}.</div>
        }
      </div>
    );
  }
});

var HealthcheckPage = React.createClass({
  statics: {
    pageClassName: "healthcheck",
    pageTitle: 'Site Health Check',
    HealthcheckMeta: HealthcheckMeta
  },
  render: function() {
    return (
      <div className="site-meta">
        <h1>Site Health Check</h1>
        <HealthcheckMeta/>
        <div className="go-back-home">
          <Link to="home">
            <i className="fa fa-home fa-2x"></i>
            <div><small>Go back to {config.ORIGIN}</small></div>
          </Link>
        </div>
      </div>
    );
  }
});

module.exports = HealthcheckPage;
