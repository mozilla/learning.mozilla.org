var React = require('react');

var IconButtons = React.createClass({
  propTypes: {
    children: React.PropTypes.object.isRequired
  },
  render: function() {
    let nonNullChildren = this.props.children.filter((child) => {
      return child !== null;
    });
    let numColSpan = 12 / nonNullChildren.length; // Bootstrap uses 12-col layout

    return (
      <div className="icon-buttons inner-container">
        <section className="row">
          {
             React.Children.map(nonNullChildren, function(iconButton){
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
