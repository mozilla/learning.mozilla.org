var querystring = require('querystring');
var React = require('react/addons');

var DevRibbon = require('../../components/dev-ribbon.jsx');
var routes = require('../../lib/routes.jsx');

var DEVICES = [
  {
    name: 'Mobile - small',
    width: 320,
    height: 480
  },
  {
    name: 'Mobile - large',
    width: 480,
    height: 640
  },
  {
    name: 'Tablet',
    width: 768,
    height: 1024
  },
  {
    name: 'Desktop',
    width: 1024,
    height: 768
  }
].map(function (device) {
  device.on = true;
  return device;
});

var RouteThumbnail = React.createClass({
  LOAD_DELAY: 250,
  mixins: [React.addons.PureRenderMixin],
  getInitialState: function() {
    return { isVisible: false, hasBeenVisible: false };
  },
  handleScroll: function() {
    var rect = this.refs.holder.getDOMNode().getBoundingClientRect();
    var width = window.innerWidth || document.documentElement.clientWidth;
    var height = window.innerHeight || document.documentElement.clientHeight;

    var isVisible = (rect.bottom >= 0 && rect.top <= height &&
                     rect.right >= 0 && rect.left <= width);

    this.setState({ isVisible: isVisible });
  },
  componentWillUpdate: function(nextProps, nextState) {
    if (this.state.isVisible !== nextState.isVisible) {
      window.clearTimeout(this.timeout);
      this.timeout = window.setTimeout(function() {
        this.setState({ hasBeenVisible: nextState.isVisible });
      }.bind(this), this.LOAD_DELAY);
    }
  },
  componentDidMount: function() {
    window.addEventListener('scroll', this.handleScroll);
    window.addEventListener('resize', this.handleScroll);
    this.handleScroll();
  },
  componentWillUnmount: function() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleScroll);
    window.clearTimeout(this.timeout);
  },
  render: function() {
    var style = {
      width: this.props.width + 'px',
      height: this.props.height + 'px'
    };
    var sandbox = this.props.enableJS ? null : "";
    var thumbnail;

    if (this.state.hasBeenVisible) {
      thumbnail = (
        <iframe src={this.props.url} style={style} sandbox={sandbox}/>
      );
    } else {
      thumbnail = (
        <div className="unloaded-thumbnail" style={style}/>
      );
    }

    return (
      <div className="route-thumbnail">
        <h4>{this.props.name} <span className="text-muted">
          {this.props.width}x{this.props.height}
        </span></h4>
        <div ref="holder">
          {thumbnail}
        </div>
      </div>
    );
  }
});

var RouteTest = React.createClass({
  render: function() {
    var props = this.props;

    return (
      <div>
        <h2 className="route">
          Route: <a href={this.props.url} target="_blank">
            {this.props.url}
          </a>
        </h2>
        <div className="actions btn-group">
          <DevRibbon.TenonLink className="btn btn-default btn-sm" url={this.props.url} />
          <DevRibbon.InsightsLink className="btn btn-default btn-sm" url={this.props.url} />
        </div>
        <div className="examples">
          {
            DEVICES.map(function (device, i) {
              return (
                <RouteThumbnail
                 name={device.name}
                 width={device.width}
                 height={device.height}
                 enableJS={props.enableJS}
                 url={props.url}
                 key={i}/>
              );
            })
          }
        </div>
      </div>
    );
  }
});

var ManualTests = React.createClass({
  render: function() {
    function setDevice(device) {
      device.on = !device.on;
      console.log(DEVICES);
    }
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <form className="navbar-form navbar-right">
              <div className="checkbox">
                <label>
                  <input type="checkbox" checked={this.props.enableJS} onChange={this.props.onToggleEnableJS}/> Enable JavaScript in thumbnails
                </label>
              </div>
            </form>
          </div>
        </nav>
        <div className="container-fluid">
          <h1>Manual Tests</h1>
          <p>Below are thumbnails of all the pages on the site, rendered <strong>{
            this.props.enableJS ? "with" : "without"
          }</strong> JavaScript enabled.</p>
          <p>Please verify that they all look decent.</p>
          {this.props.urls.map(function(url) {
            return <RouteTest key={url} url={url} enableJS={this.props.enableJS}/>;
          }, this)}
        </div>
      </div>
    );
  }
});

var qs = querystring.parse(location.search.slice(1));

React.render(
  <ManualTests
   urls={routes.URLS.slice().sort()}
   enableJS={qs.enableJS == 'on'}
   onToggleEnableJS={function() {
     if (qs.enableJS == 'on') {
       delete qs.enableJS;
     } else {
       qs.enableJS = 'on';
     }
     // It'd be nice if we didn't have to reload the page here, but
     // browsers don't like the 'sandbox' attribute of iframes
     // changing dynamically, and destroying/rebuilding the iframes
     // manually in react is a pain, so we'll just trigger a page
     // reload instead.
     location.search = '?' + querystring.stringify(qs);
   }}
   />,
  document.getElementById('app')
);
