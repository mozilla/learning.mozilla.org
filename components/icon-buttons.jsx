var React = require('react');

var IconButtons = React.createClass({
  propTypes: {
    children: React.PropTypes.object.isRequired
  },
  render: function() {
    let numColSpan = 12 / this.props.children.length; // Bootstrap uses 12-col layout

    return (
      <div className="icon-buttons inner-container">
        <section className="row">
          {
             React.Children.map(this.props.children, function(iconButton){
               return(
                 <div className={`col-sm-${numColSpan} col-md-${numColSpan} col-lg-${numColSpan}`}>{iconButton}</div>
               );
             })
          }
        </section>
      </div>
    );
  }
});

module.exports = IconButtons;
