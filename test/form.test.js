var React = require('react');
var sinon = require('sinon');
var chai = require('chai');
var assert = chai.assert;

describe('Form testing', function() {

  // we want React warnings to cause genuine errors
  before(() => {
    sinon.stub(console, 'error', (warning) => {
      throw new Error(warning);
    });
  });

  after(() => {
    console.error.restore();
  });


  /**
   * Tests for the <Form> component
   */
  describe('<Form> component', function() {
    var Form = require('../pages/clubs/form/builder/Form.jsx');

    it('should create a <Form> element with simple field', function() {
      var fields = {
        test: {
          type: "text"
        }
      };
      var form = <Form fields={fields} onSubmit={()=>{}} />;

      form.should.be.type('object');
    });

    it('should not create a <Form> element without fields', function() {
      var fields = {};

      try {
        <Form fields={fields} onSubmit={()=>{}} />;
      } catch (e) {
        assert.isOk(e, "this should absolutely be an error");
      }
    });
  });

  /**
   * Tests for the <MultiSectionedForm> component
   */
  describe('<MultiSectionedForm> component', function() {
    var MultiSectionedForm = require('../pages/clubs/form/builder/MultiSectionedForm.jsx');

    it('should create a <MultiSectionedForm> element with basic fields', function() {
      var fields = [
        { test: { type: "text" } },
        { testValue: { test2: { type: "text" }} }
      ];
      var form = <MultiSectionedForm fields={fields} onSubmit={()=>{}} />;

      form.should.be.type('object');
    });

    it('should break when trying to create a <MultiSectionedForm> element with an object as fields input', function() {
      var fields = { test: { type: "text" }};

      try {
        <MultiSectionedForm fields={fields} onSubmit={()=>{}} />;
      } catch (e) {
        assert.isOk(e, "this should absolutely be a throw.");
      }
    });
  });

  /**
   * Tests for the <MultiPageForm> component
   */
  describe('<MultiPageForm> component', function() {
    var MultiPageForm = require('../pages/clubs/form/builder/MultiPageForm.jsx');

    var formdata = [
      { test: { type: "text" }},
      { test: { type: "text" }}
    ];

    it('should create a <MultiPageForm> element with basic fields', function() {
      var form = <MultiPageForm formdata={formdata} onSubmit={() => {}} />;

      form.should.be.type('object');
    });

    it('should break when trying to create a <MultiPageForm> element without formdata', function() {
      try {
        <MultiPageForm onSubmit={() => {}} />;
      } catch (e) {
        assert.isOk(e, "this should absolutely be a throw.");
      }
    });

    it('should break when trying to create a <MultiPageForm> element without onSubmit', function() {
      try {
        <MultiPageForm formdata={formdata} />; // and another /> to appease syntax highlighting
      } catch (e) {
        assert.isOk(e, "this should absolutely be a throw.");
      }
    });
  });


});
