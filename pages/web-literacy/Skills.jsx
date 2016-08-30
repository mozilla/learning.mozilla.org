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
    var self = this;
    return Object.keys(skill.topics).map(function(topic) {
      return (
        <div key={topic}><strong>{topic}:</strong> {makeLinksFromWebLitSkills(skill.topics[topic], self.context.intl.locale)}</div>
      );
    });
  },
  generateSkills: function() {
    return skills.map(function(skill) {
      var formatMessage = this.context.intl.formatMessage;
      return (
        <Illustration
          width={150} height={150}
          src1x={skill.imgSrc1x}
          src2x={skill.imgSrc2x}
          key={skill.name}
          alt={"21c-skills-icon-" + skill.name}>
          <h2 id={skill.name.toLowerCase()}>{skill.name}</h2>
          <p>{skill.content}</p>
          <h3>{formatMessage({id:"competencies"})}</h3>
          <div className="competency-content">
            { this.generateCompetencies(skill.competencies) }
          </div>
          <h3>{formatMessage({id:"web_lit_skills"})}</h3>
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
    if (!competencies) {
      return null;
    }
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
    var formatMessage = this.context.intl.formatMessage;

    return (
      <div>
        <HeroUnit>
          <h1>{formatMessage({id:"21st_century_skills"})}</h1>
          <h2>{formatMessage({id:"21c_skills_description"})}</h2>
        </HeroUnit>
        <div className="inner-container activities">
          <section>
            <p>{formatMessage({id:"21c_skills_need"})}</p>
            { this.generateSkills() }
          </section>
          <WhitePaperLink/>
        </div>
      </div>
    );
  }
});
module.exports = Skills21CPage;
