var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var PageEndCTA = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">
          <div className="page-end-cta">
            <div>
              <img className="divider" src="/img/clubs-line-divider.svg" alt="line divider" />
              <p>{this.props.header}</p>
              <a className="btn btn-awsm" onClick={this.props.onClick}>{this.props.cta}</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = PageEndCTA;
