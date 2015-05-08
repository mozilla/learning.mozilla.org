var React = require('react');

var Expander = React.createClass({
  getInitialState: function() {
    return {
      expanded: false
    };
  },
  collapse: function() {
    this.setState({
      expanded: false
    });
  },
  expand: function() {
    this.setState({
      expanded: true
    });
  },
  handleClick: function(e) {
    if (this.state.expanded) {
      this.collapse();
    } else {
      this.expand();
    }
    e.preventDefault();
  },
  render: function() {
    var className = "expand-div";
    if (this.state.expanded) {
      className += " expanded";
    }
    return (
      <div className="expander-container">
        <div className={className} tabIndex="0" onBlur={this.collapse} onFocus={this.expand}>
          <div onClick={this.handleClick} className="expander-header">
            {this.props.head}
            <span className="ion"></span>
          </div>
          <div className="expander-items-container">
            <div className="items-margin">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Expander;
