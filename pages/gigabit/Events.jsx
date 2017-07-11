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
                <a href="https://docs.google.com/a/mozillafoundation.org/forms/d/e/1FAIpQLSezFg5EH9NrltxZi58Hkoeg1oZyrSHZvb1V0FFyILB91d5OqA/viewform?c=0&w=1" target="_blank"><img className="photo" src="/img/pages/gigabit/events/WINS_logo.png"/></a>
                <div className="p-x-2 p-b-2">
                  <div className={`city tag tag-orange m-b-0 has-photo`}>July 25, 2017</div>
                  <h3 className="m-y-0"><a className="project-name" href="https://docs.google.com/a/mozillafoundation.org/forms/d/e/1FAIpQLSezFg5EH9NrltxZi58Hkoeg1oZyrSHZvb1V0FFyILB91d5OqA/viewform?c=0&w=1" target="_blank">Mozilla/NSF WINS San Francisco Meet-Up</a></h3>
                  <p className="lead-org">Mozilla&#39;s San Francisco Office - 2 Harrison St, San Francisco, CA 94105</p>
                  <p className="summary">Mozilla and the National Science Foundation are partnering to give away $2M in prizes for wireless solutions that help connect the unconnected. Full details at wirelesschallenge.mozilla.org. This meet-up will cover the WINS Challenges, and includes a panel of local community wireless networking experts and an opportunity to network with others interested in the Challenges.</p>
                  <div className="middle-button">
                    <a className="secondary-button" href="https://docs.google.com/a/mozillafoundation.org/forms/d/e/1FAIpQLSezFg5EH9NrltxZi58Hkoeg1oZyrSHZvb1V0FFyILB91d5OqA/viewform?c=0&w=1" target="_blank">See Event</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="project-card m-b-3">
                <a href="https://gigabitcitysummit.com/" target="_blank"><img className="photo" src="/img/pages/gigabit/events/city-summit.jpg"/></a>
                <div className="p-x-2 p-b-2">
                  <div className={`city tag tag-orange m-b-0 has-photo`}>August 1-3, 2017</div>
                  <h3 className="m-y-0"><a className="project-name" href="https://gigabitcitysummit.com/" target="_blank">Gigabit City Summit</a></h3>
                  <p className="lead-org">Plexpod Westport Commons - 300 E 39th St, Kansas City, MO 64111</p>
                  <p className="summary">The 2017 Gigabit City Summit goes beyond the smart city hype to prepare cities to pursue sustainable community change models. Powered by KC Digital Drive, the event explores opportunities for investing in a tech-capable infrastructure and the steps needed to continue to grow and evolve.</p>
                  <div className="middle-button">
                    <a className="secondary-button" href="https://gigabitcitysummit.com/" target="_blank">See Event</a>
                  </div>
                </div>
              </div>
            </div>
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
