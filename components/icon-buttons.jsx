var React = require('react');

var IconButtons = React.createClass({
  render: function() {
    return (
      <div className="row icon-buttons">
        {
           React.Children.map(this.props.children, function(iconButton){
            return(
              <div className="col-sm-4 col-md-4 col-lg-4">{iconButton}</div>
            )
          })
        }
      </div>
    );
  }
});

module.exports = IconButtons;
