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
                <a href="https://www.eventbrite.com/e/education-innovation-showcase-tickets-30495213003" target="_blank"><img className="photo" src="/img/pages/gigabit/events/austin-tx.jpg"/></a>
                <div className="p-x-2 p-b-2">
                  <div className={`city tag tag-orange m-b-0 has-photo`}>June 26-28, 2017</div>
                  <h3 className="m-y-0"><a className="project-name" href="http://smartcitiesconnect.com/" target="_blank">2017 Smart Cities Connect Conference & Expo</a></h3>
                  <p className="lead-org">Austin Convention Center - 500 E Cesar Chavez St, Austin, TX 78701</p>
                  <p className="summary">The 2017 Smart Cities Connect Conference & Expo, presented by U.S. Ignite, brings together over 200 Cities and their respective leadership to prospect and partner with innovative technology and service providers; linking progressive cities with state-of-the-art solutions and best practices.</p>
                  <div className="middle-button">
                    <a className="secondary-button" href="http://smartcitiesconnect.com/" target="_blank">See Event</a>
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
