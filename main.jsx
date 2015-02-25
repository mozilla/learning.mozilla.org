if (typeof(React) == 'undefined')
  React = require('react');

var TriangleCorner = React.createClass({
  render: function() {
    var height = this.props.height;
    var width = Math.floor(height / Math.sqrt(3));
    var points = [
      [0, height].join(','),
      [width, height].join(','),
      [width, 0].join(',')    
    ];

    return (
      <svg className="corner" width={width} height={height}>
        <polygon points={points}/>
      </svg>
    );
  }
});

var Sidebar = React.createClass({
  render: function() {
    return (
      <div className="sidebar col-md-3">
        <div className="sidebar-header">
          <img src="img/wm-logo.png"/> Mozilla Learning
          <TriangleCorner height={40}/>
        </div>
      </div>
    );
  }
});

var HeroUnit = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-md-12 hero-unit">
          <h1>Unlock opportunities for all citizens of the Web.</h1>
          <div><a href="#" className="btn btn-awsm">Join Us</a></div>
        </div>
      </div>
    );
  }
});

var Content = React.createClass({
  render: function() {
    return (
      <div className="content col-md-9">
        <HeroUnit/>
        <div className="values row">
          <div className="col-md-4 col-md-offset-1">
            <img src="img/values.jpg" className="img-circle"/>
          </div>
          <div className="col-md-6">
             Join our community of educators, parents, techies and makers who want to teach digital skills and web literacy through making. <a href="#" className="bold-link">Learn More</a>
          </div>
        </div>
      </div>
    );
  }
});

var Page = React.createClass({
  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <Sidebar />
          <Content />
        </div>
        <footer className="row">
          <div className="sidebar col-md-3">
            LINKS GO HERE
          </div>
          <div className="content col-md-9">
            LOGOS GO HERE
          </div>
        </footer>
      </div>
    );
  }
});

if (typeof(exports) == 'undefined') {
  React.render(
    <Page />,
    document.body
  );
} else {
  exports.Page = Page;
}
