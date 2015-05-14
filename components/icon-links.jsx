var React = require('react');

var IconLinks = React.createClass({
  componentDidMount: function() {
    var numChild = this.props.children.length;
    if (process.env.NODE_ENV !== 'PRODUCTION' && (numChild !== 2 && numChild !== 3) ) {
      console.error("We should only have 2 or 3 icons in a IconLinks. Otherwise please assign different classes to wrap around <IconLink> component.");
    }
  },
  render: function() {
    var links = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
    var classes;
    return (
      <div className="row icon-links">
        {
          links.map(function(link, i){
            // we either have 2 or 3 icons in a IconLinks row
            classes = (links.length === 2 && i === 0) ?
                      "col-sm-4 col-md-4 col-lg-4 col-sm-offset-2 col-md-offset-2 col-lg-offset-2" :
                      "col-sm-4 col-md-4 col-lg-4";
            return(
              <div className={classes} key={i}>{link}</div>
            )
          })
        }
      </div>
    );
  }
});

module.exports = IconLinks;
