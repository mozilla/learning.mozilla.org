var React = require('react');
var RequirementRow = require('./RequirementRow.jsx');

var RequirementsList = React.createClass({
  propTypes: {
    list        : React.PropTypes.array.isRequired,
    className   : React.PropTypes.string,
    icon        : React.PropTypes.string
  },
  render: function () {
    var className = this.props.className ? 'list-unstyled requirements-list' + this.props.className : 'list-unstyled requirements-list',
        icon = this.props.icon ? this.props.icon : 'fa fa-check',
        listItems = this.props.list.map((item, position) => {
          if (item) {
            return <RequirementRow
                      key={position + '-' + item}
                      icon={icon}
                      text={item}
                      addEvidenceFields={this.props.addEvidenceFields}
                      onEvidence={this.props.onEvidence}
                   />;
          }
          return null;
        });

    return <ul className={className}>{ listItems }</ul>;
  }
});

module.exports = RequirementsList;
