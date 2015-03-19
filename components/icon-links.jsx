var React = require('react');

var IconLinks = React.createClass({
  propTypes: {
    links: React.PropTypes.array.isRequired
  },
  render: function() {
    // need to have `key`,
    // see: http://facebook.github.io/react/docs/multiple-components.html#dynamic-children
    var iconlinks = this.props.links.map(function(link, key) {
      return (
        <div className="col-sm-4 col-md-4 col-lg-4 icon-link-container" key={key}>
          <div className="icon-link">
            <a href={link.linkTo}>
              <figure>
                <img src={link.imgSrc} alt={link.imgAlt} />
                <figcaption>
                  <h3 className="head">{link.head}</h3>
                  <p className="subhead">{link.subhead}</p>
                </figcaption>
              </figure>
            </a>
          </div>
        </div>
      );
    });
    return (
      <div className="row icon-links">{iconlinks}</div>
    );
  }
});

module.exports = IconLinks;
