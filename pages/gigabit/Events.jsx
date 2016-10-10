var React = require('react');
var GigFoot = require('./GigFoot.jsx');

module.exports = React.createClass({
  render() {
    return (
      <div>
        <div className="clearfix text-center m-b-3">
          <h2>Gigabit Events</h2>
          <p className="col-sm-10 col-sm-offset-1 m-b-3">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>

        <div className="clearfix grey-block">
          <div className="p-t-3 row">
            <div className="col-md-4">
              <div className="project-card m-b-3">
                <a href="https://mozillafestival.org" target="_blank"><img className="photo" src="/img/pages/gigabit/events/mozfest.jpg"/></a>
                <div className="p-x-2 p-b-2">
                  <div className={`city tag tag-orange m-b-0 has-photo`}>October 28-30, 2016</div>
                  <h3 className="m-y-0"><a className="project-name" href="https://mozillafestival.org" target="blank">Mozilla Festival 2016</a></h3>
                  <p className="lead-org">Ravensbourne - 6 Penrose Way, Greenwich Peninsula, London SE10 0EW</p>
                  <p className="summary">The world’s leading event for and by the open Internet movement. Join us to build, debate, and explore the future of our lives online.</p>
                  <div className="middle-button">
                    <a className="secondary-button" href="https://mozillafestival.org" target="_blank">See Event</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="project-card m-b-3">
                <a href="http://sxswedu.com" target="_blank"><img className="photo" src="/img/pages/gigabit/events/sxsw.png"/></a>
                <div className="p-x-2 p-b-2">
                  <div className={`city tag tag-orange m-b-0 has-photo`}>March 6-9, 2017</div>
                  <h3 className="m-y-0"><a className="project-name" href="http://sxswedu.com" target="_blank">SxSWedu</a></h3>
                  <p className="lead-org">Austin Convention Center - 500 E Cesar Chavez St, Austin, TX 78701</p>
                  <p className="summary">Join us for a workshop (TBA) and networking throughout</p>
                  <div className="middle-button">
                    <a className="secondary-button" href="http://sxswedu.com" target="_blank">See Event</a>
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
