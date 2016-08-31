var React = require('react');
var Link = require('react-router').Link;
var ImageTag = require('./imagetag.jsx');
var _ = require('underscore');

var LinkSwap = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  propTypes: {
    link: React.PropTypes.string,
    href: React.PropTypes.string
  },
  render: function() {
    var otherProps = _.extend(_.omit(this.props, "link", "href"), { className: "btn" });

    // Swap out Link or a simple anchor depending on the props we have.
    if (this.props.link) {
      return (
        <Link to={"/" + this.context.intl.locale + this.props.link} {...otherProps}>
          {this.props.children}
        </Link>
      );
    }
    return (
      <a href={this.props.href} {...otherProps}>
        {this.props.children}
      </a>
    );
  }
});

var IconButton = React.createClass({
  propTypes: {
    link: React.PropTypes.string,
    href: React.PropTypes.string,
    imgSrc: React.PropTypes.string.isRequired,
    imgSrc2X: React.PropTypes.string,
    head: React.PropTypes.string.isRequired,
    subhead: React.PropTypes.string,
    onClick: React.PropTypes.func
  },
  render: function() {
    return (
      <div className="icon-button">
        <LinkSwap link={this.props.link} href={this.props.href} onClick={this.props.onClick}>
          <figure>
            <ImageTag className={"image " + this.props.className} src1x={this.props.imgSrc} src2x={this.props.imgSrc2x}
            alt="" height={50} />
            <figcaption>
              <p className="link-text">{this.props.head}</p>
            </figcaption>
          </figure>
        </LinkSwap>
      </div>
    );
  }
});

module.exports = IconButton;
