var React = require('react/addons');

var AUTOFOCUS_SELECTOR = '[data-autofocus]';

var StepView = React.createClass({
  propTypes: {
    stepId: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    className: React.PropTypes.string,
  },
  componentDidMount: function() {
    this.autofocus();
  },
  componentDidUpdate: function(prevProps, prevState) {
    if (this.props.stepId !== prevProps.stepId) {
      this.autofocus();
    }
  },
  autofocus: function() {
    var els = this.getDOMNode().querySelectorAll(AUTOFOCUS_SELECTOR);
    if (els.length === 0) {
      return;
    }
    if (els.length > 1 && process.env.NODE_ENV !== 'production') {
      console.warn(
        'Expected to find zero or one elements matching ' +
        AUTOFOCUS_SELECTOR + ', but found ' + els.length + '.'
      );
    }
    els[0].focus();
  },
  render: function() {
    return (
      <div className={this.props.className} aria-live="polite">
        {this.props.children}
      </div>
    );
  }
});

module.exports = StepView;
