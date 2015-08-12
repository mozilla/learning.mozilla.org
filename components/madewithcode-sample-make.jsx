var React = require('react');
var ImageTag = require('../components/imagetag.jsx');

var SampleMake = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    remixUrl: React.PropTypes.string.isRequired,
    detailsUrl: React.PropTypes.string.isRequired,
    imgSrc1x: React.PropTypes.string.isRequired,
    imgSrc2x: React.PropTypes.string
  },
  render: function() {
    return (
      <div className="madewithcode-sample-make">
        <div>
          <ImageTag src1x={this.props.imgSrc1x}
                    src2x={this.props.imgSrc2x}
                    alt=""
                    width={350} />
        </div>
        <div className="details-section">
          <h3 className="title"><a href={this.props.remixUrl}>{this.props.title}</a></h3>
          <p className="author">By @mozilla</p>
          <p className="description">{this.props.description}</p>
          <div className="btn-section">
            <a className="makerstrap-btn makerstrap-btn-primary" href={this.props.remixUrl}><i className="fa fa-code-fork"></i>Remix</a>
            <a className="makerstrap-btn makerstrap-btn-info" href={this.props.detailsUrl}>Details</a>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SampleMake;
