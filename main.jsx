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
  MENU_ENTRIES: [
    {
      name: "Teaching Materials",
      help: "Activities and lesson plans to get you started"
    },
    {
      name: "Events",
      help: "Find gatherings near you, or host your own"
    },
    {
      name: "Teach Like Mozilla",
      help: "Learn about our approach to teaching the Web"
    },
    {
      name: "Events",
      help: "Join our global community of local chapters"
    }
  ],
  render: function() {
    return (
      <div className="sidebar col-md-3">
        <div className="sidebar-header">
          <img src="img/wm-logo.png"/> Mozilla Learning
          <TriangleCorner height={40}/>
        </div>
        <div className="sidebar-login">
          <a href="#">Create an account</a> | <a href="#">Log in</a>
        </div>
        <ul className="sidebar-menu list-unstyled">
          {this.MENU_ENTRIES.map(function(entry, i) {
            return (
              <li key={i}>
                <a href="#">
                  <strong>{entry.name}</strong>
                  <div className="help-text hidden-xs">{entry.help}</div>
                  <span className="glyphicon glyphicon-menu-right"></span>
                </a>
              </li>
            );
          })}
        </ul>
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
        <div className="case-studies">
          <blockquote className="primary-quote">
            <div><span className="quote-symbol"/></div>
            Every morning, I wake up wondering what I can change.
          </blockquote>
        </div>
      </div>
    );
  }
});

var Footer = React.createClass({
  render: function() {
    return (
      <footer className="row">
        <div className="sidebar col-md-3">
          <div className="row">
            <div className="col-xs-6">
              <ul className="list-unstyled">
                <li><a href="#">Webmaker</a></li>
                <li><a href="#">Donate</a></li>
                <li><a href="#">Legal</a></li>
                <li><a href="#">Privacy</a></li>
              </ul>
            </div>
            <div className="col-xs-6">
              <ul className="list-unstyled">
                <li><a href="#">Contact</a></li>
                <li><a href="#">Twitter</a></li>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Partners</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="content col-md-9">
          <div className="row logos">
            <div className="col-md-4">
              <a href="#"><img src="img/hive-logo.png"/></a>

              <p>Join a Hive Learning Network</p>
            </div>
            <div className="col-md-4">
              <a href="#"><img src="img/mozilla_wordmark.png"/></a>

              <p>Mozilla radically empowers individuals with skills they need to make the Web.</p>
            </div>
            <div className="col-md-4">
              <a href="#"><img className="maker-party" src="img/maker-party-logo.png"/></a>

              <p>In 2014, nearly 130,000 people in 450 cities around the world helped teach the Web at Maker Parties. Find one near you or start your own.</p>
            </div>
          </div>
        </div>
      </footer>
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
        <Footer />
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
