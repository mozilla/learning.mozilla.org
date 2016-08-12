var React = require('react');
var ga = require('react-ga');
var OutboundLink = ga.OutboundLink;

var ImageDimension = React.PropTypes.oneOfType([
  React.PropTypes.string, // Vector images may contain units
  React.PropTypes.number  // Bitmap images use numeral dimensions
]);

var ImageTag = React.createClass({
  propTypes: {
    width: ImageDimension,
    height: ImageDimension,
    alt: React.PropTypes.string.isRequired,
    src1x: React.PropTypes.string.isRequired,
    src2x: React.PropTypes.string,
    className: React.PropTypes.string,
    link: React.PropTypes.string,
    externalLink: React.PropTypes.bool,
    caption: React.PropTypes.object
  },

  render: function () {
    var image = <img alt={this.props.alt}
                     width={this.props.width}
                     height={this.props.height}
                     src={this.props.src1x}
                     srcSet={this.props.src2x ? this.props.src2x + ' 2x' : null}
                     className={this.props.link ? "image-link" : null} />;

    var content = image;
    if (this.props.link) {
      if (this.props.externalLink) {
        content = <OutboundLink to={this.props.link} eventLabel={this.props.link}>{ image }</OutboundLink>
      } else {
        content = <a href={this.props.link}>{ image }</a>;
      }
    }

    return (
      <figure className={this.props.className}>
        { content }
        { !!this.props.caption ? <figcaption>{ this.props.caption }</figcaption> : null }
      </figure>
    );
  }
});

module.exports = ImageTag;
