var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ImageTag = require('./imagetag.jsx');

var LinkSwap = React.createClass({
  render: function() {
    var classes =  "btn btn-awsm";
    // Swap out Link or a simple anchor depending on the props we have.
    if (this.props.linkTo) {
      return (
        <Link to={this.props.linkTo} className={classes}>
          {this.props.children}
        </Link>
      )
    }
    return (
      <a href={this.props.href} className={classes}>
        {this.props.children}
      </a>
    )
  }
});

var IconButton = React.createClass({
  propTypes: {
    linkTo: React.PropTypes.string,
    href: React.PropTypes.string,
    imgSrc: React.PropTypes.string.isRequired,
    imgSrc2X: React.PropTypes.string,
    imgAlt: React.PropTypes.string.isRequired,
    head: React.PropTypes.string.isRequired,
    subhead: React.PropTypes.string
  },
  render: function() {
    return (
      <div className="icon-button">
        <LinkSwap linkTo={this.props.linkTo} href={this.props.href}>
          <figure>
            <ImageTag className="image" src1x={this.props.imgSrc} src2x={this.props.imgSrc2x}
            alt={this.props.imgAlt} height="50" />
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
