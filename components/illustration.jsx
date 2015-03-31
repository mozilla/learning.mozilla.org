var React = require('react');
var ImageTag = require('./imagetag.jsx');

var Illustration = React.createClass({  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number
  },
  render: function() {
    return (
      <div className="illustration">
        <div className="image-container">
          <a href={this.props.link}>
            <ImageTag width={this.props.width} height={this.props.height} className={this.props.className} src1x={this.props.src1x} src2x={this.props.src2x}
            alt={this.props.alt}/>
          </a>
        </div>
        <div className="content-container">{this.props.children}</div>
      </div>
    );
  }
});

module.exports = Illustration;
