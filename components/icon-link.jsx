var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var IconLink = React.createClass({
  propTypes: {
    info: React.PropTypes.object.isRequired
  },
  render: function() {
    var info = this.props.info;
    return (
      <div className="icon-link">
        <figure>
          <Link to={info.linkTo}>
            <img src={info.imgSrc} alt={info.imgAlt} />
          </Link>
        </figure>
        <h3 className="head">{info.head}</h3>
        <p className="subhead">{info.subhead}</p>
      </div>
    );
  }
});

module.exports = IconLink;
