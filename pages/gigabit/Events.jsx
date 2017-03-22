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
                <a href="https://gig101workshopkc.eventbrite.com" target="_blank"><img className="photo" src="/img/pages/gigabit/events/gig-101.jpg"/></a>
                <div className="p-x-2 p-b-2">
                  <div className={`city tag tag-orange m-b-0 has-photo`}>April 19, 2017</div>
                  <h3 className="m-y-0"><a className="project-name" href="https://gig101workshopkc.eventbrite.com" target="_blank">Gig 101 Workshop</a></h3>
                  <p className="lead-org">Westport Commons - 300 E. 39th St, Kansas City, MO 64110</p>
                  <p className="summary">Join us for an interactive workshop for educators focused on demystifying high-speed internet! Since Google Fiber launched in Kansas City, we've seen one technology innovation after another taking advantage of this advanced high-speed network. But, what exactly is a 'high-speed internet network'? How does it work? What does 'gigabit' mean? What can you do with it? And, how can you actually use these connections to create new opportunities for your students or your community? Join us at this interactive workshop to learn more.</p>
                  <div className="middle-button">
                    <a className="secondary-button" href="https://gig101workshopkc.eventbrite.com" target="_blank">See Event</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="project-card m-b-3">
                <a href="http://smartcitiesconnect.com/" target="_blank"><img className="photo" src="/img/pages/gigabit/events/austin-tx.jpg"/></a>
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
