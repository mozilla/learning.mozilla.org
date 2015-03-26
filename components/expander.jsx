var React = require('react');

var Expander = React.createClass({
  getInitialState: function() {
    return {
      expanded: false
    };
  },
  collapse: function(e) {
    this.setState({
      expanded: false
    });
  },
  expand: function(e) {
    var initialState = this.state.expanded;
    this.setState({
      expanded: !this.state.expanded
    });
    if (initialState) {
      e.currentTarget.blur();
    }
  },
  render: function() {
    return (
      <div className="expander-container">
        <button onBlur={this.collapse} onClick={this.expand} className="expander-header">
          {this.props.head}
          <span className="ion"></span>
        </button>
        <div className="expander-items-container">
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = Expander;
