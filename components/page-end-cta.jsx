var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var PageEndCTA = React.createClass({
  propTypes: {
    children: React.PropTypes.object.isRequired,
    linkTo: React.PropTypes.string.isRequired,
    ctaBtnText: React.PropTypes.string.isRequired
  },
  render: function() {
    return (
      <div className="page-end-cta">
        {this.props.children}
        <Link to={this.props.linkTo} className="btn btn-awsm">{this.props.ctaBtnText}
        </Link>
      </div>
    );
  }
});

module.exports = PageEndCTA;
