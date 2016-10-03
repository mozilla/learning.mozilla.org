var React = require('react');
var GigFoot = require('./GigFoot.jsx');

module.exports = React.createClass({
  render() {
    return (
      <div>
        <div className="text-center m-b-3">
          <h2>Apply for Funding</h2>
          <h3 className="m-b-3">Funding Requirements and Eligibility</h3>
          <p>The Gigabit Community Fund supports pilots of gigabit technologies and associated curricula that show the impact of next-generation networks on learning. All supported projects must:</p>
        </div>

        <div className="m-b-3 clearfix">
          <div className="col-xs-6">
            <ol>
              <li>Be piloted in the metropolitan region of Austin, Chattanooga, or Kansas City</li>
              <li>Focus on education or workforce development</li>
              <li>Leverage next-generation technologies like ultra high-speed networking</li>
            </ol>
            <p>Participation is open to companies, academic institutions, and non-profit organizations. Funding will not be granted to unaffiliated individuals acting on their own. Before submitting your application, please review the Gigabit Community Fund’s <a href="#">Terms and Conditions</a>.</p>
          </div>
          <div className="col-xs-6 dl-block">
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
          <h2 className="text-center">Type of Support</h2>

          <table>
            <thead>
              <tr>
                <th>Project Type</th>
                <th>Description</th>
                <th>Pilot Requirements</th>
                <th>Recommended Funding Level</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Curriculum Development </td>
                <td>Create and test lesson plans that help make gigabit technologies more accessible to educators and learners.</td>
                <td>The curriculum must be piloted in at least one organization in Austin, Kansas City, or Chattanooga.</td>
                <td>$5,000</td>
              </tr>
              <tr>
                <td>Multi-Org</td>
                <td>Pilot gigabit technologies in multiple organizations in a city, strengthening the local gigabit ecosystem.</td>
                <td>The project must be piloted in two or more organizations in Austin, Kansas City, or Chattanooga.</td>
                <td>$15,000</td>
              </tr>
              <tr>
                <td>Multi-City</td>
                <td>Pilot gigabit technologies across communities, helping build a national gigabit ecosystem.</td>
                <td>The project must be piloted with organizations in at least two gigabit cities. The lead organization must be in Austin, Kansas City, or Chattanooga.</td>
                <td>$25,000</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="m-b-3 clearfix">
          <h2 className="text-center">How to Apply</h2>
          <div className="col-xs-6"></div>
          <div className="col-xs-6">
            <p>We’re here to help make applying for a Gigabit Community Fund grant as easy as possible! We strongly encourage you to get in touch with us via email or Twitter as you prepare your application. Going to a meetup hosted by Hive ATX, Hive KC or Hive CHA is another great way to get help on your proposal.</p>
          </div>
        </div>

        <div className="m-b-3 clearfix">
          <p className="text-center">To submit an application for funding, follow these steps:</p>

          <ol>
            <li>Review the Gigabit Community Fund’s Terms and Conditions.</li>
            <li>Submit an optional Intent to Apply form. Though not required, this Intent to Apply form will help our project staff provide you with valuable proposal feedback ahead of the application deadline.</li>
            <li>Prepare your application using our application form and frequently asked questions document </li>
            <li>Check out some sample applications that have received funding, here and here. (Please note that proposal format and questions have been updated.)</li>
            <li>Register on our StartupCompete site and submit your application for review.</li>
          </ol>
        </div>

        <GigFoot></GigFoot>
      </div>
    );
  }
});
