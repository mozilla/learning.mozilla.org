var React = require('react');

var RequirementRow = React.createClass({
  propTypes: {
    position: React.PropTypes.number.isRequired,
    description: React.PropTypes.string.isRequired,
    icon: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.string
    ]),
    data: React.PropTypes.object
  },

  getInitialState: function() {
    let data = this.props.data;

    if (data) {
      return data;
    }

    return {
      evidenceFiles: [],
      renderEvidenceFields: false
    };
  },

  render: function () {
    var icon = null;

    // If icon===false, we don't want an icon at all, not
    // even the default icon. However, if the icon property
    // is omitted, the default icon will be used.
    if (this.props.icon !== false) {
      icon = this.props.icon ? this.props.icon : 'fa fa-check';
    }

    return (
      <li>
        <div className="icon-wrapper">
          <span className={icon}></span>
        </div>
        <div className={"requirement" + (this.state.renderEvidenceFields ? " expanded" : "")}>
          <div className="task-name" dangerouslySetInnerHTML={{ __html: this.props.description }} />
          <div className="evidence">{ this.renderEvidenceOptions()}</div>
        </div>
      </li>
    );
  },

  renderEvidenceOptions: function() {
    if (!this.props.evidence) {
      return null;
    }

    if (!this.state.renderEvidenceFields) {
      return (
        <button className="btn" onClick={() => this.setState({ renderEvidenceFields: true })}>Submit evidence for this task</button>
      );
    }

    var howmany = "a";

    if (this.state.evidenceFiles.length > 0) {
      howmany = "another";
    }

    return (
      <div className="apply-send-qualifications">
        <div className="evidence-title" dangerouslySetInnerHTML={{ __html: this.props.evidence }} />
        <div className="horizontal-form">
          <fieldset>
            <label className="control-label">Document your evidence here:</label>
            <textarea
              rows={10}
              onChange={this.updateEvidenceText}
              value={this.state.evidenceText}
            />
          </fieldset>

          <fieldset>
            <input type="file" className="hidden" ref="optionalFile" onChange={this.handleFiles}/>
            <label className="control-label">Attach one or more file (if needed):</label>
            <button className="btn attach" onClick={this.selectFiles}>Click here to pick {howmany} file</button>
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
          <span className="close fa fa-times" onClick={this.removeAttachment(e.name).bind(this)} title="Remove this attachment"/>
        </span>
      );
    });
  },

  updateEvidenceText: function(evt) {
    this.setState({
      evidenceText: evt.target.value
    }, this.propagateEvidence);
  },

  selectFiles: function() {
    this.refs.optionalFile.click();
  },

  handleFiles: function(evt) {
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

            this.setState({ evidenceFiles }, this.propagateEvidence);
          }
        };
      };

      reader.onload = bootstrap(file);
      reader.readAsDataURL(file);
    };

    Array.from(files).forEach(parse);
  },

  removeAttachment: function(name) {
    return () => {
      var evidenceFiles = this.state.evidenceFiles;
      var pos = -1;

      evidenceFiles.forEach((file, idx) => {
        if (file.name === name) {
          pos = idx;
        }
      });

      if (pos > -1) {
        evidenceFiles.splice(pos, 1);
        this.setState({ evidenceFiles }, this.propagateEvidence);
      }
    };
  },

  propagateEvidence: function() {
    let payload = this.state;

    if (payload.evidenceFiles.length===0 && (!payload.evidenceText || payload.evidenceText.trim()==='')) {
      payload = false;
    }

    this.props.onEvidence(this.props.position, payload);
  }
});

module.exports = RequirementRow;

