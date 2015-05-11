var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var AndAction = React.createClass({
  render: function() {
    if (!this.props.cta) {
      return null;
    }
    if (this.props.linkTo) {
      return (
        <Link className="btn btn-awsm" to={this.props.linkTo}>
          {this.props.children}
        </Link>
      );
    }
    return (
      <a className="btn btn-awsm" onClick={this.props.onClick}>
        {this.props.children}
      </a>
    );
  }
});
var PageEndCTA = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">
          <div className="page-end-cta">
            <div>
              <img className="divider" src={this.props.dividerImgSrc} alt="line divider" />
              <p>{this.props.header}</p>
              <AndAction onClick={this.props.onClick} linkTo={this.props.linkTo}>
                {this.props.cta}
              </AndAction>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = PageEndCTA;
