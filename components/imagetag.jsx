var React = require('react');

var ImageTag = React.createClass({
  propTypes: {
    alt: React.PropTypes.string.isRequired,
    src1x: React.PropTypes.string.isRequired,
    src2x: React.PropTypes.string,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
    className: React.PropTypes.string,
    caption: React.PropTypes.object
  },

  render: function () {
    return (
        <figure className={this.props.className}>
          <img alt={this.props.alt}
               width={this.props.width}
               height={this.props.height}
               src={this.props.src1x}
               srcSet={this.props.src2x ? this.props.src2x + ' 2x' : null} />
          { !!this.props.caption ? <figcaption>{ this.props.caption }</figcaption> : null }
        </figure>
    );
  }
});

module.exports = ImageTag;
