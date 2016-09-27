var React = require('react');
var GigFoot = require('./GigFoot.jsx');

module.exports = React.createClass({
  render() {
    return (
      <div>
        <div className="text-center m-b-3">
          <h2>Gigabit Project Portfolio</h2>
          <p>Learn more about projects that are transforming education through gigabit technology.</p>
        </div>

        <div className="p-y-3 grey-block">
          <div className="text-center">
            <h2>Find a Project</h2>

            <input type="text" className="m-b-2"></input>

            <div className="m-b-3">
              <button>Featured Projects</button>
              <button>Recently Updated</button>
              <button>Recently Added</button>
            </div>

            <div className="m-b-3">
              <p>PROJECTS GO HERE</p>
            </div>

            <div className="middle-button">
              <button className="secondary-button" href="#">See More</button>
            </div>
          </div>
        </div>

        <GigFoot></GigFoot>
      </div>
    );
  }
});
