var IN_DEVELOPMENT_MODE = (typeof(exports) == 'undefined');

if (!IN_DEVELOPMENT_MODE)
  React = require('react');

// 'Ia' is short for 'Internal <a>', meaning a link to somewhere
// 'internal', i.e. on the same site. Might want to revisit this
// name later if it's really confusing.
var Ia = React.createClass({
  render: function() {
    var href;

    if (!(this.props.href in PAGES)) {
      console.warn("Unknown <Ia> href: " + this.props.href);
    }
    if (IN_DEVELOPMENT_MODE) {
      href = '#' + this.props.href;
    } else {
      href = this.props.href.slice(1);
    }

    return (
      <a href={href} className={this.props.className}>
        {this.props.children}
      </a>
    );
  }
});

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
      <svg className={"corner " + this.props.className} width={width} height={height}>
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
  getInitialState: function() {
    return {
      showCollapsibleContent: false
    };
  },
  handleHamburgerClick: function() {
    this.setState({
      showCollapsibleContent: !this.state.showCollapsibleContent
    });
  },
  render: function() {
    return (
      <div className="sidebar col-md-3">
        <div className="sidebar-header">
          <img src="img/wm-logo.png"/> Mozilla Learning
          <span className="glyphicon glyphicon-menu-hamburger hidden-lg hidden-md"
                onClick={this.handleHamburgerClick}/>
          <TriangleCorner className="hidden-xs hidden-sm" height={40}/>
        </div>
        <div className={this.state.showCollapsibleContent
                        ? ""
                        : "hidden-xs hidden-sm"}>
          <div className="sidebar-login">
            <a href="#">Create an account</a> | <a href="#">Log in</a>
          </div>
          <ul className="sidebar-menu list-unstyled">
            {this.MENU_ENTRIES.map(function(entry, i) {
              return (
                <li key={i}>
                  <a href="#">
                    <strong>{entry.name}</strong>
                    <div className="help-text hidden-xs hidden-sm">{entry.help}</div>
                    <span className="glyphicon glyphicon-menu-right"></span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
});

var HeroUnit = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-md-12 hero-unit" style={{
          backgroundImage: 'url(' + this.props.image + ')'
        }}>
          {this.props.children}
        </div>
      </div>
    );
  }
});

var CaseStudy = React.createClass({
  render: function() {
    var study = this.props.study;

    return (
      <div className="col-sm-4 col-sm-offset-1 case-study">
        <img className="img-scale-to-fit" src={study.img}/>
        <h2>{study.name}</h2>
        <p>{study.description} <a href="#" className="bold-link">Read More</a></p>
      </div>
    );
  }
});

var CaseStudies = React.createClass({
  CASE_STUDIES: [
    {
      name: "Sadia's story",
      img: "img/sadia.jpg",
      description: "This is a story about how a young girl started a Webmaker club at her school in Bangladesh in order to teach other kids how to code."
    },
    {
      name: "Masud's story",
      img: "img/masud.jpg",
      description: "This is a story about how a young man got certification through our program and was able to find a job to support his family."
    }
  ],
  render: function() {
    return (
      <div className="case-studies">
        <blockquote className="primary-quote">
          <div><span className="quote-symbol"/></div>
          Every morning, I wake up wondering what I can change.
        </blockquote>
        <div className="row">
          <CaseStudy study={this.CASE_STUDIES[0]}/>
          <div className="col-sm-1 divider"></div>
          <CaseStudy study={this.CASE_STUDIES[1]}/>
        </div>
        <div className="become-a-mentor">
          <a href="#" className="btn btn-awsm">Become A Mentor</a>
        </div>
      </div>
    );
  }
});

var Values = React.createClass({
  render: function() {
    return (
      <div className="values row">
        <div className="col-sm-4 col-sm-offset-1">
          <img src="img/values.jpg" className="img-circle img-scale-to-fit"/>
        </div>
        <div className="col-sm-6">
           Join our community of educators, parents, techies and makers who want to teach digital skills and web literacy through making. <a href="#" className="bold-link">Learn More</a>
        </div>
      </div>
    );
  }
});

var HiveCities = React.createClass({
  CITIES: [
    {
      name: "Chicago"
    },
    {
      name: "NYC"
    },
    {
      name: "Pittsburgh"
    },
    {
      name: "Toronto"
    },
    {
      name: "Bay Area"
    },
    {
      name: "Chattanooga"
    },
    {
      name: "Denver"
    },
    {
      name: "India"
    },
    {
      name: "Kansas City"
    },
    {
      name: "Mombasa"
    },
    {
      name: "Vancouver"
    },
    {
      name: "More",
      className: "more-link"
    }
  ],
  COLUMNS: 3,
  GRID_COLUMNS_PER_ROW: 12,
  renderColumn: function(key, cities) {
    var colClass = 'col-xs-' + (this.GRID_COLUMNS_PER_ROW / this.COLUMNS);
    return (
      <div className={colClass} key={key}>
        <ul className="list-unstyled">
          {cities.map(function(city, i) {
            return (
              <li key={i}>
                <a href="#" className={city.className}>
                  {city.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
  render: function() {
    var itemsPerColumn = Math.floor(this.CITIES.length / this.COLUMNS);
    var columns = [];

    // TODO: It will be easier to just use _.range() for this.
    for (var i = 0; i < this.COLUMNS; i++) {
      columns.push(this.renderColumn(i, this.CITIES.slice(
        i * itemsPerColumn,
        (i + 1) * itemsPerColumn
      )));
    }

    return <div className="row hive-cities">{columns}</div>;
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
            <div className="col-sm-4">
              <a href="#"><img src="img/hive-logo.png"/></a>

              <p>Join a Hive Learning Network</p>
              <HiveCities/>
            </div>
            <div className="col-sm-4">
              <a href="#"><img src="img/mozilla_wordmark.png"/></a>

              <p>Mozilla radically empowers individuals with skills they need to make the Web.</p>
            </div>
            <div className="col-sm-4">
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
      <div className="page container-fluid">
        <div className="row">
          <Sidebar/>
          <div className="content col-md-9">
            {this.props.children}
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
});

var PAGES = {
  '/': function() {
    return (
      <Page>
        <HeroUnit image="img/hero-unit.jpg">
          <h1>Unlock opportunities for all citizens of the Web.</h1>
          <div><Ia href="/foo/" className="btn btn-awsm">Join Us</Ia></div>
        </HeroUnit>
        <Values/>
        <CaseStudies/>
      </Page>
    );
  },
  '/foo/': function() {
    return (
      <Page>
        <HeroUnit image="http://placekitten.com/g/1024/480">
          <h1>I am foo.</h1>
          <div><Ia href="/" className="btn btn-awsm">Meow</Ia></div>
        </HeroUnit>
        <h2>Content can go here.</h2>
      </Page>
    );
  }
};

function pageNotFound() {
  return <h1>Page not found</h1>;
}

function reactElementForPage(url) {
  var reactElementFactory = PAGES[url] || pageNotFound;
  return reactElementFactory();
}

function startDevelopmentMode() {
  var render = function(url) {
    React.render(
      reactElementForPage(url),
      document.getElementById('page-holder')
    );
  };
  var handleHashChange = function() {
    var url = window.location.hash.slice(1) || '/';
    render(url);
  };

  window.addEventListener('hashchange', handleHashChange);
  handleHashChange();
}

if (IN_DEVELOPMENT_MODE) {
  startDevelopmentMode();
} else {
  exports.PAGES = PAGES;
  exports.reactElementForPage = reactElementForPage;
}
