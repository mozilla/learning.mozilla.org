var React = require('react');
var weblitcontent = require('./weblitcontent');
var webLitSkillsContent = weblitcontent.webLitSkills;
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var MakeLinksFromWebLitSkills = function(webLitSkills) {
  return webLitSkills.map(function(webLitSkill, index) {
    return (
      <span className="comma-separated-links" key={webLitSkill}>
        <Link
          to={"/web-literacy/" + webLitSkillsContent[webLitSkill].topic + "/" + webLitSkill + "/"}
        >
          {webLitSkill}
        </Link>
      </span>
    );
  });
};

module.exports = MakeLinksFromWebLitSkills;
