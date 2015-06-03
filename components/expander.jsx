var React = require('react');

var Expander = React.createClass({
  getInitialState: function() {
    return {
      expanded: false
    };
  },
  componentDidMount: function() {
    if (this.props.id && window.location.hash === '#' + this.props.id) {
      this.expand();
      this.refs.header.getDOMNode().focus();
    }
  },
  collapse: function(e) {
    this.setState({
      expanded: false
    });
  },
  expand: function() {
    this.setState({
      expanded: true
    });
  },
  handleMouseDown: function(e) {
    if (this.state.expanded) {
      this.collapse();
    } else {
      this.expand();
    }
  },
  handleKeyUp: function() {
    // We've just been focused via the keyboard. Toggling the content
    // is annoying to fiddle with via pure keyboard navigation, so just
    // expand our content.
    this.expand();
  },
  render: function() {
    var className = "expand-div";
    if (this.state.expanded) {
      className += " expanded";
    }
    return (
      <div className="expander-container">
        <div className={className}>
          <h4 ref="header" className="expander-header" id={this.props.id}
           tabIndex="0" onKeyUp={this.handleKeyUp}
           onMouseDown={this.handleMouseDown}>
            {this.props.head}
            <span className="ion"></span>
          </h4>
          <div className="expander-items-container" onFocus={this.expand}>
            {this.props.id
             ? <a className="expander-permalink"
                href={"#" + this.props.id}
                title="Permalink to this section">&sect;</a>
             : null}
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
