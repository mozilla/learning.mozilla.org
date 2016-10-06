var React = require('react');

module.exports = React.createClass({
  getInitialState() {
    return {
      projects: this.props.portfolioData
    };
  },
  doFilter() {
    var query = this.refs.projectFilter.value.toLowerCase();
    var filteredProjects = [];

    this.state.projects.forEach((project) => {
      var matched = false;

      if (
        project.City.toLowerCase().match(query) ||
        project.Project.toLowerCase().match(query) ||
        project.Year.toString().match(query) ||
        project[`Project Summary`].toLowerCase().match(query)) {
        matched = true;
      }

      project.isFiltered = !matched;

      filteredProjects.push(project);
    });

    this.setState({
      projects: filteredProjects
    });
  },
  render() {
    var projects = this.state.projects.filter((project) => { return !project.isFiltered; }).map((project, index) => {
      return (
        <div key={`project-${index}`} className={`col-md-4${index % 3 === 0 ? ` clear-left` : ``}`}>
          <div className="project-card m-b-3">
            <a href={`/gigabit/portfolio/${project.stub}`}><img className="photo" hidden={!project.Photo} src={project.Photo}/></a>
            <div className="p-x-2 p-b-2">
              <div className={`city tag tag-orange m-b-0 ${project.Photo ? ` has-photo` : ` m-t-2`}`}>{project.City}</div>
              <h3 className="m-y-0"><a className="project-name" href={`/gigabit/portfolio/${project.stub}`}>{project.Project}</a></h3>
              <p className="lead-org">Lead Org: <a href="#">{project[`Lead Organization`]}</a></p>
              <p className="summary">{`${project[`Project Summary`].slice(0,200)} [...]`}</p>
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
            <div className="col-md-8 col-md-offset-2 m-b-3">
              <h2 className="m-b-2">Find a Project</h2>
              <input ref="projectFilter" onChange={this.doFilter} type="text" placeholder="Search for subject, location or technology" className="m-b-2"></input>
            </div>

            <div className="m-b-3 row">
              {projects}
            </div>
          </div>
        </div>
      </div>
    );
  }
});
