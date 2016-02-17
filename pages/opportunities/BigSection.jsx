var React = require('react');
var SubSection = require('./SubSection.jsx');

var BigSection = React.createClass({
  render: function() {
    var subsections = this.props.subSections.map(function(subSection) {
      return (<SubSection {...subSection} key={subSection.header} />);
    });

    return (
      <div className="big-section">
        <section>
          <h2>{this.props.header}</h2>
          <p>{this.props.description}</p>
        </section>
        {subsections}
        <section>
          <div className="horizontal-divider full-width"></div>
        </section>
      </div>
    );
  }
});

module.exports = BigSection;
