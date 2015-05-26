var React = require('react');
var ImageTag = require('./imagetag.jsx');

var Blockquote = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    imgSrc: React.PropTypes.string.isRequired,
    imgSrc2x: React.PropTypes.string,
    imgWidth: React.PropTypes.number,
    imgHeight: React.PropTypes.number,
    children: React.PropTypes.object.isRequired,
    author: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <blockquote className={this.props.className}>
        {this.props.children}
        <figure>
          <ImageTag src1x={this.props.imgSrc} src2x={this.props.imgSrc2x}
              alt=""
              width={this.props.imgWidth || 148} height={this.props.imgHeight || 148} />
        </figure>
        <small>{this.props.author}</small>
      </blockquote>
    );
  }
});

module.exports = Blockquote;
