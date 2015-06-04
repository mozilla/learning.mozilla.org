var React = require('react');

var Expander = React.createClass({
  propTypes: {
    id: React.PropTypes.string
  },
  getInitialState: function() {
    return {
      expanded: false
    };
  },
  componentDidMount: function() {
    if (this.props.id) {
      window.addEventListener('hashchange', this.handleHashChange);
      this.handleHashChange();
    }
  },
  componentWillUnmount: function() {
    if (this.props.id) {
      window.removeEventListener('hashchange', this.handleHashChange);
    }
  },
  componentDidUpdate: function(prevProps) {
    if (process.env.NODE_ENV !== 'production') {
      if (prevProps.id !== this.props.id) {
        console.warn('"id" prop is expected to be constant, but changed.');
      }
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
  handleHashChange: function() {
    if (window.location.hash === '#' + this.props.id) {
      this.expand();
      this.refs.header.getDOMNode().focus();
    }
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
      // expand our content.
      this.expand();
    }
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
