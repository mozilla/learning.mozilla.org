var React = require('react');
var GigFoot = require('./GigFoot.jsx');
var portfolioData = require('./portfolio.json');

module.exports = React.createClass({
  getInitialState() {
    return {
      projects: portfolioData
    };
  },
  render() {
    var projects = this.state.projects.map((project, index) => {
      return (
        <div className={`col-md-4${index % 3 === 0 ? ` clear-left` : ``}`}>
          <div className="project-card m-b-3">
            <img className="photo" hidden={!project.Photo} src={project.Photo}/>
            <div className="p-x-2 p-b-2">
              <div className={`city m-b-0 ${project.Photo ? ` has-photo` : ` m-t-2`}`}>{project.City}</div>
              <h3 className="m-y-0"><a className="project-name" href="#STUB">{project.Project}</a></h3>
              <p className="lead-org">Lead Org: <a href="#">{project[`Lead Organization`]}</a></p>
              <p className="summary">{project[`Project Summary`]}</p>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        <div className="text-center m-b-3">
          <h2>Gigabit Project Portfolio</h2>
          <p>Learn more about projects that are transforming education through gigabit technology.</p>
        </div>

        <div className="p-y-3 grey-block">
          <div className="text-center">
            <div className="col-sm-8 col-sm-offset-2 m-b-3">
              <h2 className="m-b-2">Find a Project</h2>

              <input type="text" placeholder="Search for subject, location or technology" className="m-b-2"></input>

              <div className="m-b-2">
                <button>Featured Projects</button>
                <button>Recently Updated</button>
                <button>Recently Added</button>
              </div>
            </div>

            <div className="m-b-3 row">
              {projects}
            </div>
          </div>
        </div>

        <GigFoot></GigFoot>
      </div>
    );
  }
});
