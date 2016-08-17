var React = require('react');
var Form = require('./Form.jsx');
var MultiSectionedForm = require('./MultiSectionedForm.jsx');

/**
 * A moderately complex form builer for React.
 */
var MultiPageForm = React.createClass({
  propTypes: {
    formdata: React.PropTypes.arrayOf(
      React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.object
      ])
    ).isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    onProgress: React.PropTypes.func
  },

  /**
   * Get this component's state upon initialisation
   * @returns {object} this component's initial state
   */
  getInitialState() {
    // Form data is tracked outside of state, as
    // it does not influence the UI of this component
    // in the slightest.
    this.formData = {};
    return {
      step: 0,
      steps: this.props.formdata.length,
      valid: []
    };
  },

  /**
   * Render this component
   * @returns {JSX} this component as HTML UI
   */
  render() {
    var forms = this.props.formdata;
    var last = forms.length - 1;

    var formComponents = forms.map((fields,id) => {
      var Type = (fields.forEach && fields.length) ? MultiSectionedForm : Form;

      var props = {
        fields,
        key: id,
        ref: (id === this.state.step) ? 'current' : null,
        onChange: this.onChange,
        onSubmit: (last===id) ? this.onSubmit : ()=>{},
        className: (id === this.state.step) ? 'highlight' : '',
        hidden: (id !== this.state.step),
        validates: this.validates,
        submitting: this.props.submitting
      };

      return <Type {...props} />;
    });

    return (
      <div className='multi-form'>
        { formComponents }
        { this.renderControls() }
      </div>
    );
  },

  /**
   * Render the back/next buttons for internal form navigation
   * @returns {JSX} the navigation buttons, wrapped in a div for ease of styling
   */
  renderControls() {
    var lastStep = (this.state.step === this.state.steps - 1);
    var backLabel = 'back';
    var nextLabel = lastStep ? 'Submit' : 'Next';

    return (
      <div className='navigation'>
        { this.state.step > 0 ? <button className="back" onClick={this.stepBack}>{backLabel}</button> : null }
        <button onClick={this.stepForward}>{nextLabel}</button>
      </div>
    );
  },

  /**
   * Step back to the previous form
   * @returns {undefined}
   */
  stepBack() {
    this.step(-1);
  },

  /**
   * Step forward to the next form, or submit the
   * full form if this was the last form in the set.
   * @returns {undefined}
   */
  stepForward() {
    var form = this.refs.current;
    var passes = form.checkValidation();

    console.log(` passes validaton? ${passes}`);

    if (!passes) {
      return;
    }

    // just to be sure, do this check, too
    if (!this.state.valid[this.state.step]) {
      this.pendingStepValidation = this.state.step;
      console.log(` adding pendingStepValidation for step ${this.state.step}`);
    }

    console.log(` all good, moving next... `);

    if (this.state.step === this.state.steps - 1) {
      console.log(`submitting`);
      this.onSubmit();
    } else {
      console.log(`step + 1`);
      this.step(1);
    }
  },

  /**
   * Step us back or forward
   * @param {number} direction -1 if stepping back, +1 if stepping forward
   * @returns {undefined}
   */
  step(direction) {
    var step = this.state.step + direction;

    if (step < 0) {
      step = 0;
    }

    if (step >= this.state.steps) {
      step = this.state.steps -1;
    }

    this.setState({ step });
  },

  /**
   * Update our knowledge of form field content so far
   * @param {object} update a {key:value} state update object
   * @returns {undefined}
   */
  onChange(update) {
    Object.assign(this.formData, update);
  },

  /**
   * Communicate the full form's dataset to our parent
   * @returns {undefined}
   */
  onSubmit() {
    this.props.onSubmit(this.formData);
  },

  /**
   * Marks the current step as passing validation or not,
   * which is used to enable/disable the "next" button.
   * @param {boolean} bool the current step's form validity.
   * @returns {undefined}
   */
  validates(bool) {
    var valid = this.state.valid;
    var step = this.pendingStepValidation ? this.pendingStepValidation : this.state.step;

    valid[step] = bool;
    this.setState({ valid });

    this.pendingStepValidation = false;
  }

});

module.exports = MultiPageForm;
