var React = require('react');

var IconButtons = React.createClass({
  render: function() {
    var links = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
    var classes;
    return (
      <div className="row icon-buttons">
        {
          links.map(function(link, i){
            return(
              <div className="col-sm-4 col-md-4 col-lg-4" key={i}>{link}</div>
            )
          })
        }
      </div>
    );
  }
});

module.exports = IconButtons;
