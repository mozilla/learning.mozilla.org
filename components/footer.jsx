var React = require('react');

var HiveCities = React.createClass({
  CITIES: [
    {
      name: "Chicago",
      href: "http://hivechicago.org/"
    },
    {
      name: "NYC",
      href: "http://hivenyc.org/"
    },
    {
      name: "Pittsburgh",
      href: "http://hivepgh.sproutfund.org/"
    },
    {
      name: "Toronto",
      href: "http://hivetoronto.org/"
    },
    {
      name: "Bay Area",
      href: "http://bayareahive.org/"
    },
    {
      name: "Chattanooga",
      href: "https://blog.mozilla.org/gigabit/"
    },
    {
      name: "Denver",
      href: "http://twitter.com/@HiveDenver5280"
    },
    {
      name: "India",
      href: "http://hive.mozillaindia.org/"
    },
    {
      name: "Kansas City",
      href: "http://hivekc.org/"
    },
    {
      name: "Mombasa",
      href: "http://mombasatech.org/"
    },
    {
      name: "Vancouver",
      href: "http://hivevan.org/"
    },
    {
      name: "More",
      href: "https://hivelearningnetworks.org/locations/",
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
                <a href={city.href} className={city.className}>
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
                <li><a href="https://webmaker.org/">Webmaker</a></li>
                <li><a href="https://sendto.mozilla.org/">Donate</a></li>
                <li><a href="">Twitter</a></li>
              </ul>
            </div>
            <div className="col-xs-6">
              <ul className="list-unstyled">
                <li><a href="">Legal</a></li>
                <li><a href="">Privacy</a></li>
                <li><a href="/about">About</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="content col-md-9">
          <div className="row logos">
            <div className="col-sm-4">
              <a href="http://hivelearningnetworks.org/"><img src="/img/hive-logo.svg" alt="Hive logo"/></a>

              <p>Learn more about Hive Learning Networks.</p>
              <HiveCities/>
            </div>
            <div className="col-sm-4">
              <a href="http://mozilla.org/"><img src="/img/mozilla-wordmark.svg" alt="Mozilla wordmark"/></a>

              <p>Mozilla radically empowers individuals with skills they need to make the Web.</p>
            </div>
            <div className="col-sm-4">
              <a href="https://party.webmaker.org/"><img className="maker-party" src="/img/maker-party-logo.png" alt="Maker Party logo"/></a>

              <p>In 2014, nearly 130,000 people in 450 cities around the world helped teach the Web at Maker Parties. Find one near you or start your own.</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
});

module.exports = Footer;
