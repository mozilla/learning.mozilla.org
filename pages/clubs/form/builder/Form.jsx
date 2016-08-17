var React = require('react');

/**

  A moderately complex form builer for React.

  This Form component converts JSON to HTML forms, using a JSON definition
  pass in via this.props.fields. This JSON has the following form:

   {
     fieldname1 : field definition object,
     fieldname2 : field definition object,
     ... : ...,
     ...
   }

  field definition objects:

   {
     type: ["text"|"textarea"|"choiceGroup"|"checkbox"|"checkboxGroup"|ReactComponent],
     label: string data,
     placeholder: string data (optional)
     validator: [instance or array of validator objects],
     metered: boolean (optional),
     controller: controller object (optional),
     colCount: number of columns to span, if ...Group type (optional).
   }

  Each field is built off of the supplied information, with additional
  functionality based on supplying optional definition properties.

  Note that the "type" property can take a React component as value,
  in which case an instance of that component will be created. In
  this case, it is assumed the component has an "onChange" property,
  in line with React's way of handling change events for HTML form
  elements.

  validator objects:

    {
      error: string data to show when field does not validate,
      validate: function(value) yielding true/false (optional)
    }

  If a validator object has no custom validate(value) function, a default
  validator is used that tests whether (value) contains data or not, passing
  validation if it represents some kind of defined content.

  To chain validators, simply use an array of validator objects and the field
  will not be considered valid unless each validator (including the implied
  default if only an error is supplied) passes.

  controller objects:

    {
      name: string matching the fieldname of the controlling field,
      value: value that the field with controller.name needs to match to reveal this field
    }

  controllers are used for things like showing an input textfield when
  someone selects an "Other" value in a dropdown list, radio group, or
  checkbox group.

**/

var validatorPropType = React.PropTypes.shape({
  error: React.PropTypes.string,
  validate: React.PropTypes.func
});

var Form = React.createClass({
  // See the above documentation on what this fairly
  // complex description concretely maps to.
  propTypes: {
    fields: React.PropTypes.objectOf(
      React.PropTypes.shape({
        type: React.PropTypes.oneOfType([
          React.PropTypes.oneOf(['text','textarea','choiceGroup','checkbox','checkboxGroup']),
          React.PropTypes.func
        ]).isRequired,
        label: React.PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.element
        ]),
        placeholder: React.PropTypes.string,
        validator: React.PropTypes.oneOfType([
          validatorPropType,
          React.PropTypes.arrayOf(validatorPropType)
        ]),
        metered: React.PropTypes.boolean,
        controller: React.PropTypes.shape({
          name: React.PropTypes.string,
          value: React.PropTypes.oneOfType([
            React.PropTypes.bool,
            React.PropTypes.number,
            React.PropTypes.string,
            React.PropTypes.array,
            React.PropTypes.object
          ]),
        }),
        colCount: React.PropTypes.number
      })
    ).isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    onProgress: React.PropTypes.func
  },

  // boilerplate
  getInitialState: function() {
    var initial = {};
    var fields = this.props.fields || {};

    this.progressFields = [];
    Object.keys(fields).forEach(name => {
      initial[name] = null;
      if (fields[name].type === "checkboxGroup") {
        initial[name] = [];
      }
      if (fields[name].metered) {
        this.progressFields.push(name);
      }
    });
    initial.valid = false;
    initial.errors = [];
    initial.errorElements = [];
    initial.hasValidated = false;
    return initial;
  },

  // boilerplate
  render: function() {
    let cn = this.props.className;
    let sm = this.props.submitting;
    let className = ("form " + (cn ? cn : '')).trim();

    return (
      <form className={className} hidden={this.props.hidden} disabled={this.props.submitting}>
        { Object.keys(this.props.fields).map(name => this.buildFormField(name, this.props.fields[name])) }
        { this.renderValidationErrors() }
      </form>
    );
  },

  // This is to be used for updating a progress bar...
  getProgress: function() {
    // get the number of required fields that have a value filled in.
    var keys = Object.keys(this.props.fields).filter(key => this.props.fields[key].metered !== false);
    var reduced = keys.reduce((a,b) => a + (this.hasFieldValue(b, this.state[b])? 1 : 0), 0);
    var total = keys.length;

    return reduced/total;
  },

  /**
   * Create the form field JSX definition to be used by React for rendering the form UI.
   * @param {string} name the form field name, based on its key in the this.props.field object
   * @param {fieldDefinition} field the field's associated field definition from this.props.fields
   * @returns {JSX} the UI code necessary to render the form field, as fieldset
   */
  buildFormField: function(name, field) {
    field.name = name;

    var Type = field.type,
        ftype = typeof Type,
        label = field.label,
        formfield = null,
        hasError = this.state.errorElements.indexOf(name) !== -1,
        inputClass = hasError ? 'error' : '';

    var common = {
      key: name + 'field',
      value: this.state[name],
      onChange: e => this.update(field, e),
      placeholder: field.placeholder
    };

    var shouldHide = false, choices = false;

    if (field.controller) {
      var controller = field.controller.name;
      var controlValue = field.controller.value;

      if (this.props.fields[controller].type === "checkboxGroup") {
        shouldHide = this.state[controller].indexOf(controlValue) === -1;
      } else {
        shouldHide = this.state[controller] !== controlValue;
      }
    }

    if (label) {
      label = <label key={name + 'label'} hidden={shouldHide}>{label}</label>;
    } else {
      label = null;
      inputClass += " nolabel";
    }

    if (ftype === "undefined" || Type === "text") {
      formfield = <input className={inputClass} type={Type? Type : "text"} {...common} hidden={shouldHide}/>;
    } else if (Type === "textarea") {
      formfield = <textarea className={inputClass} {...common} hidden={shouldHide}/>;
    } else if (Type === "checkbox") {
      formfield = <div>
        <input className={inputClass} {...common} type={Type} hidden={shouldHide}/>
        { label }
      </div>;
      label = null;
    } else if (Type === "choiceGroup") {
      choices = field.options;
      let colCount = field.colCount || 2;
      let bracket = Math.floor(choices.length/colCount);
      let columns = [];

      for (let c=0; c<colCount; c++) {
        let choiceset = choices.slice(c*bracket, (c+1)*bracket).map(value => {
          return <div key={value}><input className={inputClass} type="radio" name={name} value={value} checked={this.state[name] === value} onChange={common.onChange}/>{value}</div>;
        });

        columns.push(<div key={field.name + 'col' + c} className="column">{choiceset}</div>);
      }

      formfield = <div className={Type} key={common.key}>{columns}</div>;
    } else if (Type === "checkboxGroup") {
      choices = field.options;
      let colCount = field.colCount || 2;
      let bracket = Math.floor(choices.length/colCount);
      let columns = [];

      for (let c=0; c<colCount; c++) {
        let choiceset = choices.slice(c*bracket, (c+1)*bracket).map(value => {
          return <div key={value}><input className={inputClass} type="checkbox" name={name} value={value} checked={this.state[name].indexOf(value)>-1} onChange={common.onChange}/>{value}</div>;
        });

        columns.push(<div key={field.name + 'col' + c} className="column">{choiceset}</div>);
      }

      formfield = <div className={Type} key={common.key}>{columns}</div>;
    }

    if (ftype === "function") {
      formfield = <Type key={field.name+'field'} {...field} {...common} className={inputClass} />;
    }

    return <fieldset key={name + 'set'}>{ [label, formfield] }</fieldset>;
  },

  /**
   * Records an update for a form element. Updates can be any kind of data,
   * as we do not know what is going to come rolling out of an onChange() event.
   * @param {fieldDefinition} field the field definition for a form field
   * @param {event} e the event associated with an onChange from an HTML element
   * @returns {undefined}
   */
  update: function(field, e) {
    var state = {};
    var fieldname = field.name;
    var value = e.target? e.target.value : undefined;

    if (field.type === "checkbox") {
      state[fieldname] = e.target? e.target.checked : false;
    } else if (field.type === "checkboxGroup") {
      var curval = this.state[fieldname];
      var pos = curval.indexOf(value);

      if (pos === -1) {
        curval.push(value);
      } else {
        curval.splice(pos,1);
      }

      state[fieldname] = curval;
    } else {
      state[fieldname] = (value !== undefined) ? value : e;
    }

    this.setStateAsChange(fieldname, state);
  },

  /**
   * Similar to this.setChange, except with a bunch of event
   * handlers tied in due to needing to communicate certain
   * state changes to the parent component.
   * @param {string} fieldname the name of the field that's getting updated
   * @param {varied} newState the new value for this field
   * @returns {undefined}
   */
  setStateAsChange: function(fieldname, newState) {
    this.setState(newState, () => {
      // only revalidate on changes if we already validated before.
      if (this.state.hasValidated) {
        this.checkValidation();
      }
      if (this.props.onChange) {
        this.props.onChange(newState);
      }
      if (this.props.onProgress) {
        this.props.onProgress(this.getProgress());
      }
    });
  },

  /**
   * checkValidation is called by parents to intiate a validation
   * pass that both informs the parent of errors with the form,
   * and causes the form to show its validation result.
   * @returns {boolean} true if no errors occurred, otherwise false.
   */
  checkValidation: function() {
    return this.validates(() => {
      if (this.props.validates) {
        this.props.validates(this.state.valid);
      }
    });
  },

  /**
   * Validates all form fields, records any errors, and then
   * updates the React state to show any validation errors.
   *
   * @param {function} postValidate the function to call after running validation
   * @returns {boolean} true if no errors were found, false otherwise.
   */
  validates: function(postValidate) {
    var state = this.state;
    var errors = [];
    var errorElements = [];
    var fields = this.props.fields || {};

    Object.keys(fields).forEach(name => {
      this.validateField(name, errors, errorElements);
    });

    this.setState({
      hasValidated: true,
      valid: (errors.length === 0),
      errors: errors,
      errorElements: errorElements
    }, () => {
      postValidate();
    });

    return !errors.length;
  },

  /**
   * Validates a field and records whether it has an error, and if
   * so, to which UI element that error would apply. This function
   * records errors in-situ, rather than by return.
   * @param {string} name name of the field to validate
   * @param {array} errors a placeholder array for recording error messages
   * @param {array} errorElements a placeholder array for recording error elements
   * @returns {undefined}
   */
  validateField: function(name, errors, errorElements) {
    var value = this.state[name];
    var validators = this.props.fields[name].validator;

    if (!validators) {
      return;
    }

    if (!validators.forEach) {
      validators = [validators];
    }

    validators.forEach(validator => {
      var err = false;

      if (validator.validate) {
        err = validator.validate(value);
      } else {
        err = !this.hasFieldValue(name, this.state[name]);
      }
      if (err && this.passesControl(name)) {
        errors.push(validator.error);
        if (errorElements.indexOf(name)===-1) {
          errorElements.push(name);
        }
      }
    });
  },

  /**
   * Check whether this field "counts" towards form completion:
   *  - uncontrolled fields always count
   *  - controlled fields only count if their controller has the appropriate value
   *
   * @param {string} name the field name to test
   * @returns {boolean} whether or not this field counts towards form completion
   */
  passesControl: function(name) {
    var field = this.props.fields[name];
    var control = field.controller;

    if (!control) {
      return true;
    }

    var passes = false;

    if (this.props.fields[control.name].type === "checkboxGroup") {
      passes = this.state[control.name].indexOf(control.value) > -1;
    } else {
      passes = this.state[control.name] === control.value;
    }

    return passes;
  },

  /**
   * A field has a value if it's not null, falsey, an empty array, and the
   * field is not optional. In any of these cases, this field doesn't count
   * (and so reduces by adding 0 to the running tally, rather than 1).
   *
   * @param {string} name the field name
   * @param {anything} value the field's associated value
   * @returns {boolean} whether or not this field has an associated meaningful value
   */
  hasFieldValue: function(name, value) {
    if (value === null) {
      return false;
    }
    if (value === false) {
      return false;
    }
    if (value.length === 0) {
      return false;
    }
    return true;
  },

  /**
   * Get the CSS class for error reporting. This is hardcoded atm to "error".
   * @param {string} field the field name for which to determine whether there is an error.
   * @returns {string|boolean} "error" if the field has validation errors, false otherwise.
   */
  getErrorClass: function(field) {
    if (!this.state.errorElements) {
      return false;
    }

    var error = this.state.errorElements.indexOf(field) > -1;

    return error ? "error" : false;
  },

  /**
   * Render any validation errors in their own little error box.
   * @returns {JSX} the error box UI
   */
  renderValidationErrors: function() {
    if (!this.state.errors || this.state.errors.length === 0) {
      return null;
    }

    var label = this.props.validationLabel || "Unfortunately, there are some problems with your form fields:";

    return (
      <div className="alert alert-danger">
        <p>{label}</p>
        <ul>{this.state.errors.map(function(text,i) { return <li key={i}>{text}</li>; })}</ul>
      </div>
    );
  }
});

module.exports = Form;
