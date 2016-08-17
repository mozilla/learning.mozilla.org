var React = require('react');
var Form = require('./Form.jsx');

/**
  A multi-section form, where part of the form is only revealed
  based on values filled in for special controller fields.

  Multi-sectioned forms take an array of form JSON as this.props.field
  input, and build a multi-sectioned UI out of this. The format for
  the array of JSON is:

  [
    baseJSON,
    {
      baseJSON.value1: form fields collection object (see <Form>),
      baseJSON.value2: form fields collection object,
      value3: ...,
      ...
    }
  ]

  Currently this code is only guaranteed to work on a singly-controlled
  multi-sectioned form, but contributions that expand on this are more
  than welcome.

  Form section reveals are triggered by the Form associated with the
  baseJSON setting a value that can be matched against a property
  name in the second (third, fourth, etc) set of form field collection
  objects.

  Right now this code does not mark "some field" in the baseJSON form
  as the field to keep an eye out for: any value from the baseJSON form
  that matches the value used in the subsequent object will trigger a
  section-reveal.

**/
var MultiSectionedForm = React.createClass({
  propTypes: {
    fields: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    onProgress: React.PropTypes.func
  },

  // boilerplate
  getInitialState() {
    // we use the "revealed" list to, at each section of the form,
    // note what the last field's value is. This is definitely
    // suboptimal, but works for now.
    //
    // TODO: assign a special flag to fields so that they can be
    //       clearly identified as the "next section" controller.
    return {
      revealed: []
    };
  },

  // boilerplate
  render() {
    var fields = this.props.fields;

    // the first section of the form is always a regular controller form.
    var initialFields = fields[0];
    var initial = <Form
      ref="initial"
      fields={initialFields}
      onChange={this.onChange(0)}
      onSubmit={this.props.onSubmit}
      submitting={this.props.submitting}
    />;

    // the next section(s) are value-controlled, and so can consist of
    // any number of variations
    var sections = [];

    fields.forEach((fieldsets,id) => {
      if(id===0) {
        return;
      }

      Object.keys(fieldsets).forEach(controlValue => {
        let props = {
          ref: controlValue,
          key: controlValue,
          fields: fieldsets[controlValue],
          onSubmit: this.props.onSubmit,
          onChange: this.onChange(id),
          hidden: this.state.revealed[id-1] !== controlValue,
          validates: this.props.validates,
          submitting: this.props.submitting
        };

        sections.push(<Form {...props}/> );
      });
    });

    return (
      <div className="multi-page" hidden={this.props.hidden}>
        { initial }
        { sections }
      </div>
    );
  },

  /**
   * Generate the event handler for form field updates, keeping
   * a record of which section this field is from.
   * @param {number} id the section for which onChange is triggering
   * @return {function} the onChange event handler for this section of form.
   */
  onChange(id) {
    /**
     * onChange handler for form fields in a multi-section form.
     * @param {anything} update the new field value associated with the onChange event.
     * @returns {undefined}
     */
    return (update) => {
      // See if there's a form associated with the value
      // selected by this field, in the set of next forms.
      var revealed = this.state.revealed;
      var key = Object.keys(update)[0];
      var val = update[key];
      var ref = this.refs[val];

      // If so, record this value so that the associated
      // form can unhide itself in render()
      if (ref) {
        revealed[id] = val;
        this.setState({ revealed });
      }

      // send the onChange on to the parent component for
      // further processing.
      this.props.onChange(update);
    };
  },

  /**
   * checkValidation is called by parents to intiate a validation
   * pass that both informs the parent of errors with the form,
   * and causes the form to show its validation result.
   * @returns {boolean} true if no errors occurred, otherwise false.
   */
  checkValidation: function() {
    var passes = this.refs.initial.checkValidation();
    var fields = this.props.fields;

    fields.forEach((fieldsets,id) => {
      if(id===0) {
        return;
      }

      Object.keys(fieldsets).forEach(controlValue => {
        if (this.state.revealed[id-1] !== controlValue) {
          return;
        }

        let form = this.refs[controlValue];

        passes = passes && form.checkValidation();
      });
    });

    return passes;
  },
});

module.exports = MultiSectionedForm;
