var React = require('react');
var classnames = require('classnames');

var IconButtons = React.createClass({
  propTypes: {
    children: React.PropTypes.object.isRequired
  },
  render: function() {
    let children = this.props.children.filter(child => !!child);
    let numChildren = children.length;
    // Bootstrap uses 12-col layout.
    // We want icon buttons to fill up the entire row when possible
    // Let's calculate how many columns each button should occupy
    let numColSpan = Math.floor(12 / numChildren);
    // if buttons can't fill up the entire row, add offset to the first button
    // so the group of buttons looks centered in the row
    let colOffset = Math.floor((12 - numColSpan*numChildren) / 2);

    return (
      <div className="icon-buttons inner-container">
        <section className="row">
          {
            React.Children.map(children, function(iconButton,i){
              let classes = classnames(`col-sm-${numColSpan}`, {[`col-sm-offset-${colOffset}`]: i===0 && colOffset !== 0});

              return(
               <div className={classes}>{iconButton}</div>
              );
            })
          }
        </section>
      </div>
    );
  }
});

module.exports = IconButtons;
