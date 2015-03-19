var React = require('react');

var IconLink = React.createClass({
  render: function() {
    return (
      <div className="col-sm-4 col-md-4 col-lg-4">
        <div className="icon-link">
          <a href={this.props.linkTo}>
            <figure>
              <img src={this.props.imgSrc} alt={this.props.imgAlt} />
              <figcaption>
                <h3 className="head">{this.props.head}</h3>
                <p className="subhead">{this.props.subhead}</p>
              </figcaption>
            </figure>
          </a>
        </div>
      </div>
    );
  }
});

module.exports = IconLink;
