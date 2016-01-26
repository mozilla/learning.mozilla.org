var React = require('react');
var OutboundLink = require('react-ga').OutboundLink;

var Illustration = require('../../components/illustration.jsx');

/* Displays an activity kit, with: image, title, difficulty, list of authors, and description
*/
var ActivityKit = React.createClass({
  render: function() {
    var ifExternalLink = !!this.props.link ? (this.props.link.substr(0,4) === "http" || this.props.link.substr(0,2) === "//") : false;
    var title = ifExternalLink ? <OutboundLink to={this.props.link} eventLabel={this.props.link}>{this.props.title}</OutboundLink>
                               : <a href={this.props.link}>{this.props.title}</a>;
    return (
      <div className="activity-kit">
        <Illustration
          height={165} width={225}
          src1x={this.props.src1x}
          src2x={this.props.src2x}
          caption={this.props.caption}
          alt={this.props.title}
          link={this.props.link}
          externalLink={ifExternalLink}>

          <div className="activity-kit-content">
            <h3>{title}</h3>
            <div>
              <span className="span-content label-tag">level</span><span className="span-content">{this.props.level}</span>
            </div>
            <div>
              <span className="span-content label-tag">developed by</span><div className="span-content developed-by">
                {this.props.developedBy}
              </div>
            </div>
            <div className="description">{this.props.description}</div>
          </div>

        </Illustration>
      </div>
    );
  }
});

module.exports = ActivityKit;
