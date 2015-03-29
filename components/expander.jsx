var React = require('react');

var Expander = React.createClass({
  getInitialState: function() {
    return {
      expanded: false
    };
  },
  blur: function() {
    this.setState({
      expanded: false
    });
  },
  focus: function(e) {
    this.setState({
      expanded: true
    });
  },
  onClick: function(e) {
    if (this.state.expanded) {
      this.getDOMNode().querySelector(".focus-div").blur();
    } else {
      this.getDOMNode().querySelector(".focus-div").focus();
    }
    e.preventDefault();
  },
  render: function() {
    return (
      <div className="expander-container">
        <div className="focus-div" tabIndex="0" onBlur={this.blur} onFocus={this.focus}>
          <div onMouseDown={this.onClick} className="expander-header">
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
