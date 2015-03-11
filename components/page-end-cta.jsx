var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var PageEndCTA = React.createClass({
  render: function() {
    return (
      <div className="page-end-cta">
        <p>{this.props.description}</p>
        <Link to={this.props.linkTo} className="btn btn-awsm">{this.props.ctaBtnText}
        </Link>
      </div>
    );
  }
});

module.exports = PageEndCTA;
