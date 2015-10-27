var React = require('react');
var ga = require('react-ga');
var OutboundLink = ga.OutboundLink;

var ImageTag = React.createClass({
  propTypes: {
    alt: React.PropTypes.string.isRequired,
    src1x: React.PropTypes.string.isRequired,
    src2x: React.PropTypes.string,
    width: React.PropTypes.number,
    height: React.PropTypes.number,
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
                     srcSet={this.props.src2x ? this.props.src2x + ' 2x' : null} />;

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
