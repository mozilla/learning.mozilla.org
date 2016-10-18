var React = require('react');
var locationHash = require('./locations.json');

module.exports = React.createClass({
  getInitialState() {
    return {
      projects: this.props.portfolioData,
      visibleProjects: this.props.portfolioData.length
    };
  },
  doFilter() {
    var query = this.refs.projectFilter.value.toLowerCase();
    var filteredProjects = [];
    var visibleProjects = 0;

    this.state.projects.forEach((project) => {
      var matched = false;

      // Serialize city codes to a string of longform city names for searching
      var longformCities;

      if (project.City.length === 1) {
        longformCities = locationHash[project.City[0]];
      } else {
        longformCities = project.City.reduce((previous, current) => {
          return `${locationHash[previous]} ${locationHash[current]} `;
        });
      }

      if (
        project.City.join(` `).toLowerCase().match(query) ||
        longformCities.toLowerCase().match(query) ||
        project.Project.toLowerCase().match(query) ||
        project.Year.toString().match(query) ||
        project[`Project Summary`].toLowerCase().match(query)
      ) {
        matched = true;
        visibleProjects++;
      }

      project.isFiltered = !matched;

      filteredProjects.push(project);
    });

    this.setState({
      projects: filteredProjects,
      visibleProjects: visibleProjects
    });
  },
  render() {
    var projects = this.state.projects.filter((project) => { return !project.isFiltered; }).map((project, index) => {
      var leadOrg = project.Link ? <a href={project.Link} target="_blank">{project[`Lead Organization`]}</a> : project[`Lead Organization`];

      var cityTags = project.City.map((city, index2) => {
        return (
          <div key={`${project.stub}-tag-${index2}`} className={`city tag tag-orange m-b-0 ${project.Photo ? ` has-photo` : ` m-t-2`}`}>{locationHash[city]}</div>
        );
      });

      return (
        <div key={`project-${index}`} className={`col-md-4${index % 3 === 0 ? ` clear-left` : ``}`}>
          <div className="project-card m-b-3">
            <a href={`/gigabit/portfolio/${project.stub}`}><img className="photo" hidden={!project.Photo} src={project.Photo}/></a>
            <div className="p-x-2 p-b-2">
              <div className="tags">{cityTags}</div>
              <h3 className="m-y-0"><a className="project-name" href={`/gigabit/portfolio/${project.stub}`}>{project.Project}</a></h3>
              <p className="lead-org">Lead Org: {leadOrg}</p>
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

            <h3 hidden={this.state.visibleProjects} className="m-b-3">No results found!</h3>
          </div>
        </div>
      </div>
    );
  }
});
