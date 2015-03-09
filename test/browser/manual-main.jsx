var querystring = require('querystring');
var React = require('react');

var routes = require('../../lib/routes.jsx');

var RouteThumbnail = React.createClass({
  ASPECT_RATIO: 3/4,
  getInitialState: function() {
    return {
      scaledWidth: this.props.width
    };
  },
  getScale: function() {
    return this.state.scaledWidth / this.props.width;
  },
  getScaledHeight: function() {
    return this.getHeight() * this.getScale();
  },
  getHeight: function() {
    return this.props.width * this.ASPECT_RATIO;
  },
  handleResize: function() {
    var selfEl = this.getDOMNode();

    this.setState({
      scaledWidth: selfEl.parentNode.clientWidth
    });
  },
  componentDidMount: function() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },
  render: function() {
    return (
      <div>
        <div style={{
          transform: 'scale(' + this.getScale() + ')',
          transformOrigin: 'top left',
          height: this.getScaledHeight()
        }} ref="iframeHolder">
          <iframe src={this.props.url} sandbox={
            this.props.enableJS ? null : ""
          } style={{
            border: '1px solid black',
            width: this.props.width,
            height: this.getHeight()
          }}></iframe>
        </div>
        <h4>{this.props.name} <span className="text-muted">
          {this.props.width}x{this.getHeight()}
        </span></h4>
      </div>
    );
  }
});

var RouteTest = React.createClass({
  render: function() {
    return (
      <div>
        <h2 className="route">
          <a href={this.props.url} target="_blank">
            {this.props.url}
          </a>
        </h2>
        <div className="row">
          <div className="col-md-4">
            <div>
              <RouteThumbnail
               name="Desktop"
               width={1024}
               enableJS={this.props.enableJS}
               url={this.props.url}/>
            </div>
          </div>
          <div className="col-md-4">
            <div>
              <RouteThumbnail
               name="Tablet"
               width={800}
               enableJS={this.props.enableJS}
               url={this.props.url}/>
            </div>
          </div>
          <div className="col-md-4">
            <div>
              <RouteThumbnail
               name="Mobile"
               width={480}
               enableJS={this.props.enableJS}
               url={this.props.url}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var ManualTests = React.createClass({
  render: function() {
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
