var React = require('react');

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
              <a href="#"><img src="/img/hive-logo.png"/></a>

              <p>Join a Hive Learning Network</p>
              <HiveCities/>
            </div>
            <div className="col-sm-4">
              <a href="#"><img src="/img/mozilla_wordmark.png"/></a>

              <p>Mozilla radically empowers individuals with skills they need to make the Web.</p>
            </div>
            <div className="col-sm-4">
              <a href="#"><img className="maker-party" src="/img/maker-party-logo.png"/></a>

              <p>In 2014, nearly 130,000 people in 450 cities around the world helped teach the Web at Maker Parties. Find one near you or start your own.</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
});

module.exports = Footer;
