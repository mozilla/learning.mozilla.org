var React = require('react');
var OutboundLink = require('react-ga').OutboundLink;
var Illustration = require('../../components/illustration.jsx');

var ToolsColumn = React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    link: React.PropTypes.string.isRequired,
    src1x: React.PropTypes.string.isRequired,
    src2x: React.PropTypes.string,
    activityTitle: React.PropTypes.string,
    activityLink: React.PropTypes.string
  },
  render: function() {
    var ifExternalLink = false;
    if(!!this.props.activityLink) {
      ifExternalLink = (this.props.activityLink.substr(0,4) === "http" || this.props.activityLink.substr(0,2) === "//");
    }

    var sampleActivity = null;
    if (this.props.activityTitle && this.props.activityLink) {
      var activityTitle = <a href={this.props.activityLink}>{this.props.activityTitle}</a>;
      if (ifExternalLink) {
        activityTitle = <OutboundLink to={this.props.activityLink} eventLabel={this.props.activityLink}>{this.props.activityTitle}</OutboundLink>;
      }
      sampleActivity = (
        <div className="sample-activity">
          <div className="label-container"><div className="label-tag">Sample Activity</div></div>
          {activityTitle}
        </div>
      );
    }
    return (
      <div className="col-sm-4 col-md-4 col-lg-4 tools-col">
        <Illustration
          link={this.props.link}
          height={150} width={200}
          src1x={this.props.src1x}
          src2x={this.props.src2x}
          alt=""
          className="vertical-layout"
          externalLink={true}
        >
          <h2><OutboundLink to={this.props.link} eventLabel={this.props.link}>{this.props.name}</OutboundLink></h2>
          <p>{this.props.description}</p>
        </Illustration>
        {sampleActivity}
      </div>
    );
  }
});

module.exports = ToolsColumn;
