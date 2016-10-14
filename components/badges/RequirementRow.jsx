var React = require('react');

var RequirementRow = React.createClass({
  propTypes: {
    text: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      evidenceFiles: []
    };
  },

  render: function () {
    var icon = this.props.icon ? this.props.icon : 'fa fa-check';

    return (
      <li>
        <div className="icon-wrapper">
          <span className={icon}></span>
        </div>
        <div className="text">
          { this.props.text }
          { this.props.addEvidenceFields ? this.renderApplicationForm() : null }
        </div>
      </li>
    );
  },

  renderApplicationForm: function() {
    var showButton = this.state.evidenceText || this.state.evidenceLink || this.state.evidenceFiles.length > 0;

    if (this.state.applying && this.state.showApplyModal) {
      return (
        <Modal modalTitle="" className="modal-credly folded" hideModal={this.hideApplyModal}>
          <h3 className="centered">Thanks for applying for this badge!</h3>
          <p>
            We will be reviewing your badge application and evidence as soon as possible.
          </p>
          <input type="submit" className="btn center-block" onClick={this.hideApplyModal} value="Back to my badge"/>
        </Modal>
      );
    }

    return (
      <div className="apply-send-qualifications">
        <div className="horizontal-form">
          <fieldset>
            <label className="control-label">Text description (if asked for):</label>
            <textarea
              rows={10}
              onChange={this.updateEvidenceText}
              value={this.state.evidenceText}
            />
          </fieldset>

          <fieldset>
            <label className="control-label">URL (if asked for) for the page or website:</label>
            <input
              type="text"
              placeholder="Write your URL here, including the http:// or https://"
              value={this.state.evidenceLink}
              onChange={this.updateEvidenceLink}
            />
          </fieldset>

          <fieldset>
            <input type="file" className="hidden" ref="optionalFile" onChange={this.handleFiles}/>
            <label className="control-label">Attach one or more file (if asked for):</label>
            <button className="btn attach" onClick={this.selectFiles}>click here to pick one or more files...</button>
            { this.generateAttachmentSelection() }
          </fieldset>
        </div>
      </div>
    );
  },

  generateAttachmentSelection: function() {
    if (this.state.evidenceFiles.length === 0) {
      return null;
    }

    return this.state.evidenceFiles.map(e => {
      return (
        <span className="attached" key={`evidence-${e.name}`}>
          {e.name}
          <span className="fa fa-times" onClick={this.removeAttachment(e.name)}/>
        </span>
      );
    });
  },

  updateEvidenceText: function(evt) {
    this.setState({
      evidenceText: evt.target.value
    }, this.propagateEvidence);
  },

  updateEvidenceLink: function(evt) {
    this.setState({
      evidenceLink: evt.target.value
    }, this.propagateEvidence);
  },

  selectFiles: function() {
    this.refs.optionalFile.click();
  },

  handleFiles: function(evt) {
    var self = this;
    var files = evt.target.files;
    var attachments = [];
    var parse = (file) => {
      var reader = new FileReader();
      var bootstrap = (f) => {
        return (e) => {
          var name = escape(f.name);
          var data = e.target.result;

          if (data) {
            // FIXME: TODO: There is a 20MB limit on file uploads whch
            //              I doubt we'll run into, but _might_ be an issue
            //              eventually, so I'm leaving this comment.
            data = data.substring(data.indexOf('base64,')+'base64,'.length);
            attachments.push({ name: name, file: data });
          }

          if(attachments.length === files.length) {
            var evidenceFiles = this.state.evidenceFiles.concat(attachments);

            self.setState({ evidenceFiles }, this.propagateEvidence);
          }
        };
      };

      reader.onload = bootstrap(file);
      reader.readAsDataURL(file);
    };

    Array.from(files).forEach(parse);
  },

  removeAttachment: function(name) {
    var self = this;

    return function() {
      var evidenceFiles = self.state.evidenceFiles;
      var pos = -1;

      evidenceFiles.forEach((file, idx) => {
        if (file.name === name) {
          pos = idx;
        }
      });

      if (pos > -1) {
        evidenceFiles.splice(pos, 1);
        self.setState({ evidenceFiles }, this.propagateEvidence);
      }
    };
  },

  propagateEvidence: function() {
    this.props.onEvidence(this.state);
  }
});

module.exports = RequirementRow;

