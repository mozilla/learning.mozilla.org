var React = require('react');

var ImageTag = React.createClass({
  propTypes: {
    alt: React.PropTypes.string.isRequired,
    src1x: React.PropTypes.string.isRequired,
    src2x: React.PropTypes.string,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    className: React.PropTypes.string
  },

  render: function () {
    return (
        <img src={this.props.src1x} alt={this.props.alt}
            width={this.props.width} height={this.props.height} className={this.props.className}
            srcSet={this.props.src2x ? this.props.src2x + ' 2x' : null} />
    );
  }
});

module.exports = ImageTag;
