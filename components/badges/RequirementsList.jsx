var React = require('react');
var RequirementRow = require('./RequirementRow.jsx');

var RequirementsList = React.createClass({
  propTypes: {
    criteria    : React.PropTypes.array.isRequired,
    evidence    : React.PropTypes.array,
    className   : React.PropTypes.string,
    icon        : React.PropTypes.string
  },

  getInitialState() {
    return {
      evidenceReceived: []
    };
  },

  render() {
    var className = this.props.className ? 'list-unstyled requirements-list' + this.props.className : 'list-unstyled requirements-list',
        icon = this.props.icon ? this.props.icon : 'fa fa-check',
        criteria = this.props.criteria,
        evidence = this.props.evidence;

    // Are we generating a pure criteria list, or do we need to crosslink the evidence list in?
    if (evidence) {
      let cl = criteria.length,
          el = evidence.length,
          comp = (cl===el) ? false : (el > cl) ? 'more' : 'fewer';

      if (comp) {
        console.warn(`RequirementList instantiated with ${comp} evidence entries than badge criteria`);
      }
    }

    var listItems = criteria.map((item, position) => {
      if (item) {
        let ev = (evidence ? evidence[position] : false);

        return <RequirementRow
                  position={position}
                  key={position + '-' + item}
                  icon={this.state.evidenceReceived[position] ? icon : false}
                  description={item}
                  evidence={ev}
                  onEvidence={this.handleEvidence}
               />;
      }
      return null;
    });

    return <ul className={className}>{ listItems }</ul>;
  },

  handleEvidence(position, evidence) {
    var evidenceReceived = this.state.evidenceReceived;

    evidenceReceived[position] = evidence;
    this.setState({ evidenceReceived }, () => {
      if (evidenceReceived.length === this.props.evidence.length) {
        this.props.onEvidence(this.state.evidenceReceived);
      }
    });
  }
});

module.exports = RequirementsList;
