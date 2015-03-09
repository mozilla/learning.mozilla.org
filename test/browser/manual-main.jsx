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
    var rect = selfEl.parentNode.getBoundingClientRect();

    this.setState({
      scaledWidth: rect.width
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
        }}>
          <iframe src={this.props.url} sandbox="" style={{
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
            <RouteThumbnail
             name="Desktop"
             width={1024}
             url={this.props.url}/>
          </div>
          <div className="col-md-4">
            <RouteThumbnail
             name="Tablet"
             width={800}
             url={this.props.url}/>
          </div>
          <div className="col-md-4">
            <RouteThumbnail
             name="Mobile"
             width={480}
             url={this.props.url}/>
          </div>
        </div>
      </div>
    );
  }
});

var ManualTests = React.createClass({
  render: function() {
    return (
      <div className="container">
        <h1>Manual Tests</h1>
        <p>Below are thumbnails of all the pages on the site, rendered without JavaScript enabled.</p>
        <p>Please verify that they all look decent.</p>
        {this.props.urls.map(function(url) {
          return <RouteTest key={url} url={url}/>;
        })}
      </div>
    );
  }
});

React.render(
  <ManualTests urls={routes.URLS.slice().sort()}/>,
  document.getElementById('app')
);
