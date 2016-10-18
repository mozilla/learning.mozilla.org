var React = require('react');
var PortfolioList = require('./PortfolioList.jsx');
var Project = require('./Project.jsx');
var GigFoot = require('./GigFoot.jsx');

// This JSON is generated from CSV exported from Google Docs
// Used: http://csvtojson.com/
var portfolioData = require('./portfolio.json');

// Additional metadata for in-app display purposes
portfolioData.forEach((item, index) => {
  item.isFiltered = false;

  // Generate stubs from project names to enable project detail page linking
  // eg: `Gigtank 4K: Scaling from Micro to Macro` -> `gigtank-4k-scaling-from-micro-to-macro`
  item.stub = item.Project.toLowerCase().replace(/\ +/g, `-`).replace(/[^A-Za-z0-9\-]/g, ``);
});

// Alphabetize by project name
portfolioData.sort((a, b) => {
  return a.Project.toLowerCase() > b.Project.toLowerCase() ? 1 : -1;
});

module.exports = React.createClass({
  render() {
    var subView;

    if (this.props.project) {
      // Pluck specific project data from entire portfolio
      var projectData = portfolioData.filter((project) => {
        return project.stub === this.props.project;
      });

      subView = <Project data={projectData[0]}></Project>;
    } else {
      subView = <PortfolioList portfolioData={portfolioData}></PortfolioList>;
    }

    return (
      <div>
        {subView}
        <GigFoot></GigFoot>
      </div>
    );
  }
});
