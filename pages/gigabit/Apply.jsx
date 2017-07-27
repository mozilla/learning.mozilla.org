var React = require('react');
var GigFoot = require('./GigFoot.jsx');

module.exports = React.createClass({
  render() {
    function buildMatrix(data) {
      var rows = data.map((row) => {
        return (
          <tr>
            <td>{row.type}</td>
            <td>{row.cities}</td>
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
            <dt>Eligible Cities</dt>
            <dd>{item.cities}</dd>
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
                <th>Eligible Cities</th>
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
              <li>Be piloted in the metropolitan region of Austin, Eugene, Chattanooga, Lafayette, or Kansas City</li>
              <li>Focus on education or workforce development</li>
              <li>Leverage next-generation technologies like virtual reality, 4K video, artificial intelligence, and their related curricula</li>
            </ol>
            <p>Participation is open to companies, academic institutions, and non-profit organizations. Funding will not be granted to unaffiliated individuals acting on their own. Before submitting your application, please review the Gigabit Community Fund’s <a href="/gigabit/apply/terms">Terms and Conditions</a>.</p>
          </div>
          <div className="col-sm-6 dl-block">
            <h2>Key Dates</h2>
            <dl>
              <dt>August 1, 2017</dt>
              <dd>Round 3 Applications Due</dd>
              <dt>October 30, 2017 - <br/>February 16, 2018</dt>
              <dd>Round 3 Pilot Period</dd>
              <dt>October 1, 2017</dt>
              <dd>Round 4 Application Window Opens</dd>
              <dt>December 1, 2017</dt>
              <dd>Round 4 Letter of Intent Form Due for All Projects</dd>
              <dt>January 19, 2018</dt>
              <dd>Round 4 Applications Due</dd>
              <dt>March 26, 2018 - <br/>July 13, 2018</dt>
              <dd>Round 4 Pilot Period</dd>
            </dl>
          </div>
        </div>

        <div className="m-b-3 clearfix">
          <h2 className="text-center m-b-3">Type of Support</h2>
          {buildMatrix([
            {
              type: "Local",
              cities: "Austin, Lafayette, and Eugene",
              pilotRequirements: "Local projects are those conceived of and executed in one of the eligible communities. Though the pilot is only occurring in one community, multiple organizations within that community may be involved. A pilot with real-life learners must occur in the Austin, Lafayette, or Eugene metro areas.",
              funding: "$5,000 - $15,000"
            },
            {
              type: "Multi-City",
              cities: "Austin, Chattanooga, Eugene, Lafayette, and Kansas City",
              pilotRequirements: "Cross-City projects have project partners from 2 or more of the Mozilla Gigabit communities. These may, for example, be projects previously piloted in one city that are scaling to a new community or projects that are conceived of in one community and tested in another.  Though partners can be from multiple communities, a pilot with real-life learners must must occur in at least one of the eligible communities.",
              funding: "$10,000 - $30,000"
            }
          ])}
        </div>

        <div className="m-b-3 clearfix">
          <h2 className="text-center m-b-3">How to Apply</h2>
          <div className="col-xs-12">
            <p>We’re here to help make applying for a Gigabit Community Fund grant as easy as possible! We strongly encourage you to get in touch with us via <a href="mailto:gigabit@mozilla.com">email</a> or <a href="https://twitter.com/MozGig" target="_blank">Twitter</a> as you prepare your application. Going to <a href="/gigabit/events">an event</a> hosted in a Mozilla Gigabit city is another great way to get help on your proposal.</p>
          </div>
        </div>

        <div className="m-b-3 clearfix">
          <p className="text-center m-b-3">To submit an application for funding, follow these steps:</p>

          <div className="col-xs-10 col-xs-offset-1">
            <ol className="circled-ol">
              <li><span>Review the Gigabit Community Fund’s <a href="/gigabit/apply/terms">Terms and Conditions</a> and <a href="https://mzl.la/GCF_FAQ">frequently asked questions</a>.</span></li>
              <li><span>Submit a <a href="https://docs.google.com/a/mozillafoundation.org/forms/d/1r4gR7Nq0Rd4XvA0CQCjd86pkWRIXnhQ9BRLTjl0CBQ4/viewform" target="_blank">Letter of Intent form</a>. This Letter of Intent form will help our project staff provide you with valuable proposal feedback ahead of the application deadline.</span></li>
              <li><span>Successful Letter of Intent submissions will receive an invitation to submit a full application from our grant management system, <a href="https://mozilla.fluxx.io">Fluxx</a>.</span></li>
              <li><span>Draft your application based on the guidelines in the <a href="/gigabit/apply/terms">Terms and Conditions</a>. Use <a href="https://docs.google.com/spreadsheets/d/1Yiam58szxLTYVVSluN8zP93LgB2Z3Ulah2ZzqknRB6c/copy">this template</a> for your Project Timeline and <a href="https://docs.google.com/spreadsheets/d/1WxZuMHz7JlcmkcVP4i-DCx7Ulr5NvNq1pSK2MgqOVbQ/copy">this template</a> for your Budget.</span></li>
              <li><span>Check out some sample applications that have received funding, <a href="https://drive.google.com/file/d/0B1Tu07mQk89LRmpfWXlHNmhmQk0/view?usp=sharing" target="_blank">here</a> and <a href="https://drive.google.com/file/d/0B1Tu07mQk89LMGtaY3RYUHRxTWs/view?usp=sharing" target="_blank">here</a>. (Please note that proposal format and questions have been updated.)</span></li>
              <li><span>Successful submissions will receive an email invitation to submit a complete, final application to the Gigabit Community Fund on the Fluxx application system on or before Friday, July 15.</span></li>
            </ol>
          </div>
        </div>

        <GigFoot></GigFoot>
      </div>
    );
  }
});
