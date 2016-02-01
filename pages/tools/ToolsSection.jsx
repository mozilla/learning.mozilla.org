var React = require('react');
var config = require('../../config/config');

var ToolsColumn = require('./ToolsColumn.jsx');

var toolsList = [
  {
    name: "X-Ray Goggles",
    description: "This code inspector lets you view and remix the code of your favorite web pages.",
    link: config.XRAY_GOGGLES_LINK,
    src1x: "/img/pages/tools/xray-goggles.png",
    src2x: "/img/pages/tools/xray-goggles@2x.png",
    activityTitle: "Hack the News",
    activityLink: "http://mozilla.github.io/webmaker-curriculum/WebLiteracyBasics-I/session02-hackthenews.html"
  },
  {
    name: "Thimble",
    description: "This code editor helps you learn HTML and CSS by creating and remixing Web projects.",
    link: config.THIMBLE,
    src1x: "/img/pages/tools/thimble.png",
    src2x: "/img/pages/tools/thimble@2x.png",
    activityTitle: "Keep Calm and Carry On",
    activityLink: "https://thimble.mozilla.org/projects/72/remix"
  },
  {
    name: "Webmaker",
    description: "Webmaker lets you create, discover and share content in your language on your mobile device.",
    link: "https://webmaker.org",
    src1x: "/img/pages/tools/svg/webmaker.svg",
    activityTitle: "Create a Webmaker Project",
    activityLink: "http://mozilla.github.io/webmaker-curriculum/MobileWeb/create-webmaker-project.html"
  }
];

var tools = toolsList.map(function(tool) {
  return <ToolsColumn {...tool} key={tool.name}/>;
});

var ToolsSection = React.createClass({
  render: function() {
    return (
      <section>
        <div className="row">
          {tools}
        </div>
      </section>
    )
  }
});

module.exports = ToolsSection;
