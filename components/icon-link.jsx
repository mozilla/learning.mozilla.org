var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var ImageTag = require('./imagetag.jsx');

var LinkSwap = React.createClass({
  render: function() {
    // Swap out Link or a simple anchor depending on the props we have.
    if (this.props.linkTo) {
      return (
        <Link to={this.props.linkTo}>
          {this.props.children}
        </Link>
      )
    }
    return (
      <a href={this.props.href}>
        {this.props.children}
      </a>
    )
  }
});

var IconLink = React.createClass({
  render: function() {
    return (
      <div className="icon-link">
        <LinkSwap linkTo={this.props.linkTo} href={this.props.href}>
          <figure>
            <ImageTag className="image" src1x={this.props.imgSrc} src2x={this.props.imgSrc2x}
            alt=""/>
            <figcaption>
              <h3 className="head">{this.props.head}</h3>
              <p className="subhead">{this.props.subhead}</p>
            </figcaption>
          </figure>
        </LinkSwap>
      </div>
    );
  }
});

module.exports = IconLink;
