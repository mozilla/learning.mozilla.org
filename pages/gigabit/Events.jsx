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
                <a href="https://www.eventbrite.com/e/iot-escape-room-workshop-tickets-42103680241" target="_blank"><img className="photo" src="/img/pages/gigabit/events/escape.png"/></a>
                <div className="p-x-2 p-b-2">
                  <div className="city tag tag-orange m-b-0 has-photo">March 8-9, 2018</div>
                  <h3 className="m-y-0"><a className="project-name" href="https://www.eventbrite.com/e/iot-escape-room-workshop-tickets-42103680241" target="_blank">IoT Escape Room Workshop</a></h3>
                  <p className="lead-org">Chattanooga</p>
                  <p className="summary">As part of its work to champion Internet health and related issues like online privacy and security on connected devices, the Mozilla Foundation is hosting an Internet of Things (IoT) Escape Room workshop at in Chattanooga, Tennessee, from Thursday, March 8, to Friday, March, 9th, 2018.</p>
                  <div className="middle-button">
                    <a className="secondary-button" href="https://www.eventbrite.com/e/iot-escape-room-workshop-tickets-42103680241" target="_blank">See Event</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="project-card m-b-3">
                <a href="https://spring.smartcitiesconnect.org/" target="_blank"><img className="photo" src="/img/pages/gigabit/events/SSCC_home_Logo.svg" style={{padding:`10px 10px 20px 10px`}}/></a>
                <div className="p-x-2 p-b-2">
                  <div className="city tag tag-orange m-b-0 has-photo">March 26-29, 2018</div>
                  <h3 className="m-y-0"><a className="project-name" href="https://spring.smartcitiesconnect.org/" target="_blank">Smart Cities Connect Conference & Expo and US Ignite Application Summit</a></h3>
                  <p className="lead-org">Kansas City</p>
                  <p className="summary">Smart Cities Connect Conference & Expo convenes leading technology and solution providers with city leaders</p>
                  <div className="middle-button">
                    <a className="secondary-button" href="https://spring.smartcitiesconnect.org/" target="_blank">See Event</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="project-card m-b-3">
                <a href="https://gigabitcitysummit.com/" target="_blank"><img className="photo" src="/img/pages/gigabit/events/gcity.png"/></a>
                <div className="p-x-2 p-b-2">
                  <div className="city tag tag-orange m-b-0 has-photo">June 25-28, 2018</div>
                  <h3 className="m-y-0"><a className="project-name" href="https://gigabitcitysummit.com/" target="_blank">Gigabit City Summit</a></h3>
                  <p className="lead-org">Kansas City</p>
                  <p className="summary">The Gigabit City Summit offers a unique, multidisciplinary program for cities in the midst of digital transformation. Bridging the gap between broadband and smart cities, the Gigabit City Summit brings together a community focused on how infrastructure investment translates into real civic impact.</p>
                  <div className="middle-button">
                    <a className="secondary-button" href="https://gigabitcitysummit.com/" target="_blank">See Event</a>
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
