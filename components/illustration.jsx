var React = require('react');
var ImageTag = require('./imagetag.jsx');

var Illustration = React.createClass({
  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    src1x: React.PropTypes.string.isRequired,
    src2x: React.PropTypes.string,
    alt: React.PropTypes.string.isRequired,
    link: React.PropTypes.string,
    externalLink: React.PropTypes.bool,
    caption: React.PropTypes.object
  },
  render: function() {
    var classes = this.props.className ? ("illustration " + this.props.className) : "illustration";
    var image = <ImageTag width={this.props.width}
                          height={this.props.height}
                          src1x={this.props.src1x}
                          src2x={this.props.src2x}
                          alt={this.props.alt}
                          caption={this.props.caption}
                          link={this.props.link}
                          externalLink={this.props.externalLink}/>;
    return (
      <div className={classes}>
        <div className="image-container">{image}</div>
        <div className="content-container">{this.props.children}</div>
      </div>
    );
  }
});

module.exports = Illustration;
