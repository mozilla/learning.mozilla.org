var React = require('react');
var HeroUnit = require('../../components/hero-unit.jsx');
var Illustration = require('../../components/illustration.jsx');
var skills = require('./skillsdata');
var makeLinksFromWebLitSkills = require("./MakeLinksFromWebLitSkills.jsx");
var WhitePaperLink = require("./WhitePaperLink.jsx");

var Skills21CPage = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  statics: {
    pageTitle: '21st Century Skills',
    pageClassName: 'web-literacy-skills-page'
  },
  generateSkillItem: function(skill) {
    var that = this;
    return Object.keys(skill.topics).map(function(topic) {
      return (
        <div key={topic}><strong>{topic}:</strong> {makeLinksFromWebLitSkills(skill.topics[topic], that.context.intl.locale)}</div>
      );
    });
  },
  generateSkills: function() {
    return skills.map(function(skill) {
      return (
        <Illustration
          width={150} height={150}
          src1x={skill.imgSrc1x}
          src2x={skill.imgSrc2x}
          key={skill.name}
          alt={"21c-skills-icon-" + skill.name}>
          <h2 id={skill.name.toLowerCase()}>{skill.name}</h2>
          <p>{skill.content}</p>
          <h3>Competencies</h3>
          <div className="competency-content">
            { this.generateCompetencies(skill.competencies) }
          </div>
          <h3>Web Literacy Skills</h3>
          { this.generateSkillItem(skill) }
        </Illustration>
      );
    }.bind(this));
  },
  generateCompetencyItem: function(competency) {
    return competency.content.map(function(contentItem) {
      return (
        <div className="line-item" key={contentItem}>{contentItem}</div>
      );
    });
  },
  generateCompetencies: function(competencies) {
    if (!competencies) return null;
    return competencies.map(function(competency) {
      if (competency.name) {
        return (
          <div key={competency.name}>
            <h4>{competency.name}</h4>
            { this.generateCompetencyItem(competency) }
          </div>
        );
      }
      return (
        <div className="line-item" key={competency}>{competency}</div>
      );
    }.bind(this));
  },
  render: function() {
    return (
      <div>
        <HeroUnit>
          <h1>21st Century Skills</h1>
          <h2>A broad set of knowledge, skills, habits and traits that are important to succeed in today's world</h2>
        </HeroUnit>
        <div className="inner-container activities">
          <section>
            <p>
              As people learn to read, write, and participate on the web, a cross-cutting set of 21C Skills emerge as skills critical to success in today’s world. They enable individuals to become teachers, advocates, and community leaders to leverage and advance the web as an open and public resource. The following 21C Skills correspond to the specific web literacy skills indicated below:
            </p>
            { this.generateSkills() }
          </section>
          <WhitePaperLink/>
        </div>
      </div>
    );
  }
});
module.exports = Skills21CPage;
