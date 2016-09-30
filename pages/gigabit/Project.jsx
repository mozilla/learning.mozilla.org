var React = require('react');

module.exports = React.createClass({
  render() {
    console.log(this.props.data);
    var data = this.props.data;

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
              <div className="tag tag-orange">{data.City}</div>
              <div className="tag tag-orange">{data.Year}</div>
            </div>
            <img className="w-100" src={data.Photo}/>
          </div>
          <div className="project-metadata p-y-2 col-xs-6 grey-block">
            <dl>
              <dt>Lead Organization</dt>
              <dd>{data[`Lead Organization`]}</dd>

              <dt>Partner Organization</dt>
              <dd>{data[`Other Partner Organizations`]}</dd>

              <dt>Project Tags</dt>
              <dd>{data[`Tech Tags`]}</dd>
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

        <div className="m-b-3 text-center">
          <p>Learn more about {data.Project}</p>
        </div>
      </div>
    );
  }
});
