var React = require('react');
var GigFoot = require('./GigFoot.jsx');

module.exports = React.createClass({
  render() {
    function buildMatrix(data) {
      var rows = data.map((row) => {
        return (
          <tr>
            <td>{row.type}</td>
            <td>{row.description}</td>
            <td>{row.pilotRequirements}</td>
            <td>{row.funding}</td>
          </tr>
        );
      });

      var dls = data.map((item) => {
        return (
          <dl className="dl-matrix">
            <dt>Project Type</dt>
            <dd>{item.type}</dd>
            <dt>Description</dt>
            <dd>{item.description}</dd>
            <dt>Pilot Requirements</dt>
            <dd>{item.pilotRequirements}</dd>
            <dt>Recommended Funding Level</dt>
            <dd>{item.funding}</dd>
          </dl>
        );
      });

      return (
        <div>
          <table className="hidden-xs matrix">
            <thead>
              <tr>
                <th>Project Type</th>
                <th>Description</th>
                <th>Pilot Requirements</th>
                <th>Recommended Funding Level</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>

          <div className="visible-xs">
            {dls}
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="text-center m-b-3">
          <h2>Apply for Funding</h2>
          <h3 className="m-b-3">Funding Requirements and Eligibility</h3>
          <p className="col-sm-10 col-sm-offset-1 m-b-3">The Gigabit Community Fund supports pilots of gigabit technologies and associated curricula that show the impact of next-generation networks on learning. All supported projects must:</p>
        </div>

        <div className="m-b-3 clearfix">
          <div className="col-sm-6">
            <ol className="circled-ol">
              <li>Be piloted in the metropolitan region of Austin, Chattanooga, or Kansas City</li>
              <li>Focus on education or workforce development</li>
              <li>Leverage next-generation technologies like ultra high-speed networking</li>
            </ol>
            <p>Participation is open to companies, academic institutions, and non-profit organizations. Funding will not be granted to unaffiliated individuals acting on their own. Before submitting your application, please review the Gigabit Community Fund’s <a href="#">Terms and Conditions</a>.</p>
          </div>
          <div className="col-sm-6 dl-block">
            <h2>Key Dates</h2>
            <dl>
              <dt>January 16, 2017 - <br/>May 5, 2017</dt>
              <dd>Round 2 Pilot Period</dd>
              <dt>June 14, 2017</dt>
              <dd>Optional Intent to Apply Form Due</dd>
              <dt>July 14, 2017</dt>
              <dd>Applications Due</dd>
              <dt>October 16, 2017 - <br/>February 2, 2018</dt>
              <dd>Pilot Period</dd>
            </dl>
          </div>
        </div>

        <div className="m-b-3 clearfix">
          <h2 className="text-center m-b-3">Type of Support</h2>
          {buildMatrix([
            {
              type: "Curriculum Development",
              description: "Create and test lesson plans that help make gigabit technologies more accessible to educators and learners.",
              pilotRequirements: "The curriculum must be piloted in at least one organization in Austin, Kansas City, or Chattanooga.",
              funding: "$5,000"
            },
            {
              type: "Multi-Org",
              description: "Pilot gigabit technologies in multiple organizations in a city, strengthening the local gigabit ecosystem.",
              pilotRequirements: "The project must be piloted in two or more organizations in Austin, Kansas City, or Chattanooga.",
              funding: "$15,000"
            },
            {
              type: "Multi-City",
              description: "Pilot gigabit technologies across communities, helping build a national gigabit ecosystem.",
              pilotRequirements: "The project must be piloted with organizations in at least two gigabit cities. The lead organization must be in Austin, Kansas City, or Chattanooga.",
              funding: "$25,000"
            }
          ])}
        </div>

        <div className="m-b-3 clearfix">
          <h2 className="text-center m-b-3">How to Apply</h2>
          <div className="col-xs-6"></div>
          <div className="col-xs-6">
            <p>We’re here to help make applying for a Gigabit Community Fund grant as easy as possible! We strongly encourage you to get in touch with us via <a href="mailto:gigabit@mozilla.com">email</a> or <a href="https://twitter.com/MozGig" target="_blank">Twitter</a> as you prepare your application. Going to a meetup hosted by <a href="https://twitter.com/hiveatx" target="_blank">Hive ATX</a>, <a href="https://twitter.com/hivekc" target="_blank">Hive KC</a> or <a href="https://twitter.com/hive_cha" target="_blank">Hive CHA</a> is another great way to get help on your proposal.</p>
          </div>
        </div>

        <div className="m-b-3 clearfix">
          <p className="text-center m-b-3">To submit an application for funding, follow these steps:</p>

          <div className="col-xs-10 col-xs-offset-1">
            <ol className="circled-ol">
              <li><span>Review the Gigabit Community Fund’s <a href="#">Terms and Conditions</a>.</span></li>
              <li><span>Submit an optional <a href="https://docs.google.com/a/mozillafoundation.org/forms/d/1r4gR7Nq0Rd4XvA0CQCjd86pkWRIXnhQ9BRLTjl0CBQ4/viewform" target="_blank">Intent to Apply form</a>. Though not required, this Intent to Apply form will help our project staff provide you with valuable proposal feedback ahead of the application deadline.</span></li>
              <li><span>Prepare your application using our <a href="https://drive.google.com/file/d/0B9NqWPTRsfNXNjlKT0tMVlcySlhfZmVlQTBINXVrN0FSVlI0/view" target="_blank">application form</a> and <a href="https://mzl.la/GCF_FAQ" target="_blank">frequently asked questions</a> document </span></li>
              <li><span>Check out some sample applications that have received funding, <a href="https://drive.google.com/file/d/0B1Tu07mQk89LRmpfWXlHNmhmQk0/view?usp=sharing" target="_blank">here</a> and <a href="https://drive.google.com/file/d/0B1Tu07mQk89LMGtaY3RYUHRxTWs/view?usp=sharing" target="_blank">here</a>. (Please note that proposal format and questions have been updated.)</span></li>
              <li><span>Register on our <a href="https://gigabitfund2016.startupcompete.co/" target="_blank">StartupCompete</a> site and submit your application for review.</span></li>
            </ol>
          </div>
        </div>

        <GigFoot></GigFoot>
      </div>
    );
  }
});
