var React = require('react');
var locationHash = require('./locations.json');

module.exports = React.createClass({
  render() {
    var data = this.props.data;

    var leadOrg = data.Link ? <a target="_blank" href={data.Link}>{data[`Lead Organization`]}</a> : data[`Lead Organization`];

    var cityTags = data.City.map((city, index) => {
      return (
        <div key={index} className="tag tag-orange">{locationHash[city]}</div>
      );
    });

    if (data.Links) {
      var links = data.Links.map((link) => {
        return (
          <a className="secondary-button m-r-2" href={link.url} target="_blank">{link.label || `Website`}</a>
        );
      });
    }

    return (
      <div>
        <div className="m-b-3 clearfix">
          <div className="col-sm-12 text-center">
            <h2>{data.Project}</h2>
            <p>{data[`Project Summary`]}</p>
          </div>
        </div>

        <div className="meta-block m-b-3 clearfix">
          <div className="hero col-xs-6" style={{backgroundImage: `url(${data.Photo})`}}>
            <div className="tags">
              {cityTags}
              <div className="tag tag-orange">{data.Year}</div>
            </div>
            <img className="w-100" src={data.Photo}/>
          </div>
          <div className="project-metadata p-y-2 col-xs-6 grey-block">
            <dl className="project-metadata-dl">
              <dt>Lead Organization</dt>
              <dd>{leadOrg}</dd>

              <dt hidden={!data[`Other Partner Organizations`]}>Partner Organization</dt>
              <dd>{data[`Other Partner Organizations`]}</dd>
            </dl>
          </div>
        </div>

        <div className="m-b-3 clearfix">
          <div className="col-sm-6">
            <h3>The Gigabit Advantage</h3>
            <p>{data[`Gigabit Advantage`]}</p>
          </div>
          <div className="col-sm-6">
            <h3>Outcomes</h3>
            <p>{data[`Outcomes`]}</p>
          </div>
        </div>

        { data.Links &&
          <div className="m-b-3 text-center">
            <p>Learn more about {data.Project}</p>
            <div className="middle-button">
              {links}
            </div>
          </div>
        }
      </div>
    );
  }
});
