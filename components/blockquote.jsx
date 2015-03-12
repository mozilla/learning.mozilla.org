var React = require('react');
var ImageTag = require('./imagetag.jsx');

var Blockquote = React.createClass({
  propTypes: {
    className: React.PropTypes.string.isRequired,
    imgSrc: React.PropTypes.string.isRequired,
    imgSrc2x: React.PropTypes.string,
    imgAlt: React.PropTypes.string.isRequired,
    imgWidth: React.PropTypes.number,
    children: React.PropTypes.object.isRequired,
    author: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <blockquote className={this.props.className}>
        <figure>
          <ImageTag src1x={this.props.imgSrc} src2x={this.props.imgSrc2x || this.props.imgSrc}
              alt={this.props.imgAlt} width={this.props.imgWidth || 148} />
        </figure>
        {this.props.children}
        <small>{this.props.author}</small>
      </blockquote>
    );
  }
});

module.exports = Blockquote;
