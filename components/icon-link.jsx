var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

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
      <div className="col-sm-4 col-md-4 col-lg-4">
        <div className="icon-link">
          <LinkSwap linkTo={this.props.linkTo} href={this.props.href}>
            <figure>
              <img src={this.props.imgSrc} alt={this.props.imgAlt} />
              <figcaption>
                <h3 className="head">{this.props.head}</h3>
                <p className="subhead">{this.props.subhead}</p>
              </figcaption>
            </figure>
          </LinkSwap>
        </div>
      </div>
    );
  }
});

module.exports = IconLink;
