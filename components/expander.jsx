var React = require('react');

var AnchorManagerMixin = require('../mixins/anchor-manager');

var Expander = React.createClass({
  mixins: [AnchorManagerMixin],
  propTypes: {
    head: React.PropTypes.node.isRequired
  },
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
  handleAttractAttentionToAnchor: function() {
    this.expand();
    this.refs.header.getDOMNode().focus();
  },
  handleMouseDown: function(e) {
    if (this.state.expanded) {
      this.collapse();
    } else {
      this.expand();
    }
  },
  handleKeyUp: function(e) {
    if (e.which === 9) {
      // We've just been focused via the keyboard. Toggling the content
      // is annoying to fiddle with via pure keyboard navigation, so just
      // expand our content and attract attention to it.
      this.attractAttentionToAnchor();
    }
  },
  render: function() {
    var className = "expand-div";
    if (this.state.expanded) {
      className += " expanded";
    }
    if (this.state.attractAttentionToAnchor) {
      className += " attract-attention";
    }
    return (
      <div className="expander-container">
        <div className={className}>
          <h4 ref="header" className="expander-header"
           id={this.props.anchorId}
           tabIndex="0" onKeyUp={this.handleKeyUp}
           onMouseDown={this.handleMouseDown}>
            {this.props.head}
            <span className="ion"></span>
          </h4>
          <div className="expander-items-container" onFocus={this.expand}>
            {this.props.anchorId
             ? <a className="expander-permalink"
                href={"#" + this.props.anchorId}
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
