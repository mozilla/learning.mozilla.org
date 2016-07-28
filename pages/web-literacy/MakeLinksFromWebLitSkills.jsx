var React = require('react');
var weblitcontent = require('./weblitcontent');
var webLitSkillsContent = weblitcontent.webLitSkills;
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var convertToRoute = require("../../lib/util").convertToRoute;

var MakeLinksFromWebLitSkills = function(webLitSkills, locale) {
  return webLitSkills.map(function(webLitSkill, index) {
    return (
      <span className="comma-separated-links" key={webLitSkill}>
        <Link
          to={"/" + locale + "/web-literacy/" + convertToRoute(webLitSkillsContent[webLitSkill].topic) + "/" + convertToRoute(webLitSkill) + "/"}
        >
          {webLitSkill}
        </Link>
      </span>
    );
  });
};

module.exports = MakeLinksFromWebLitSkills;
