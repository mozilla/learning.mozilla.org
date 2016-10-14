var React = require('react');

module.exports = React.createClass({
  render() {
    return (
      <div className="gigabit-footer">
        <div className="clearfix m-b-3">
          <h2 className="text-center m-b-3">National Partners</h2>

          <div className="partner-logos m-b-3 text-center">
            <div className="p-b-3 col-xs-12 col-sm-3 col-sm-offset-3">
              <a href="https://www.nsf.gov" target="_blank"><img width="100px" src="/img/pages/gigabit/nsf.png"/></a>
            </div>
            <div className="col-xs-12 col-sm-3">
              <a href="https://www.us-ignite.org" target="_blank"><img width="200px" src="/img/pages/gigabit/usignite.png"/></a>
            </div>
          </div>
        </div>

        <div className="clearfix">
          <div className="col-sm-4 text-center">
            <a href="mailto:gigabit@mozilla.com"><img src="/img/pages/gigabit/icon-email.svg"/></a>
            <h2>Have a Question?</h2>
            <p>Want to be connected with one of our staff or volunteers? <a href="mailto:gigabit@mozilla.com">Email us</a></p>
          </div>
          <div className="col-sm-4 text-center">
            <a target="_blank" href="https://twitter.com/MozGig"><img src="/img/pages/gigabit/icon-twitter.svg"/></a>
            <h2>Follow Us</h2>
            <p>We're <a href="https://twitter.com/MozGig" target="_blank">@MozGig</a> on Twitter</p>
          </div>
          <div className="col-sm-4 text-center">
            <a href="/gigabit/events"><img src="/img/pages/gigabit/icon-join.svg"/></a>
            <h2>Join Us</h2>
            <p>Check out our gigabit <a href="/gigabit/events">events</a></p>
          </div>
        </div>
      </div>
    );
  }
});
