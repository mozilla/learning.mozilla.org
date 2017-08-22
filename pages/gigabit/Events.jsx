var React = require('react');
var GigFoot = require('./GigFoot.jsx');

module.exports = React.createClass({
  render() {
    return (
      <div>
        <div className="clearfix text-center m-b-3">
          <h2>Gigabit Events</h2>
          <p className="col-sm-10 col-sm-offset-1 m-b-3">We offer global and local opportunities that facilitate group and in-person collaboration. Join us!</p>
        </div>

        <div className="clearfix grey-block">
          <div className="p-t-3 row">
            <div className="col-md-4">
              <div className="project-card m-b-3">
                <a href="https://mozillafestival.org/" target="_blank"><img className="photo" src="/img/pages/gigabit/events/mozfest-crowd.jpg"/></a>
                <div className="p-x-2 p-b-2">
                  <div className={`city tag tag-orange m-b-0 has-photo`}>October 27-29, 2017</div>
                  <h3 className="m-y-0"><a className="project-name" href="https://mozillafestival.org/" target="_blank">MozFest</a></h3>
                  <p className="lead-org">Ravensbourne College, London</p>
                  <p className="summary">Join the Mozilla Foundation&#39;s annual festival and be part of the global network fighting to keep the web open and free.</p>
                  <div className="middle-button">
                    <a className="secondary-button" href="https://mozillafestival.org/" target="_blank">See Event</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <GigFoot></GigFoot>
      </div>
    );
  }
});
