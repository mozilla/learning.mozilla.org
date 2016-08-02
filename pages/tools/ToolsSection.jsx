var React = require('react');
var config = require('../../config/config');

var ToolsColumn = require('./ToolsColumn.jsx');

var ToolsSection = React.createClass({
  contextTypes: {
    intl: React.PropTypes.object
  },
  toolColumns: function() {
    return [
      {
        name: this.context.intl.formatMessage({id: 'x_ray_goggles'}),
        description: this.context.intl.formatMessage({id: 'tools_page_xray_goggles_desc'}),
        link: config.XRAY_GOGGLES_LINK,
        src1x: "/img/pages/tools/xray-goggles.png",
        src2x: "/img/pages/tools/xray-goggles@2x.png",
        activityTitle: this.context.intl.formatMessage({id: 'hack_the_news'}),
        activityLink: "http://mozilla.github.io/webmaker-curriculum/WebLiteracyBasics-I/session02-hackthenews.html"
      },
      {
        name: this.context.intl.formatMessage({id: 'thimble'}),
        description: this.context.intl.formatMessage({id: 'tools_page_thimble_desc'}),
        link: config.THIMBLE,
        src1x: "/img/pages/tools/thimble.png",
        src2x: "/img/pages/tools/thimble@2x.png",
        activityTitle: this.context.intl.formatMessage({id: 'keep_calm_and_carry_on'}),
        activityLink: "https://thimble.mozilla.org/projects/72/remix"
      },
      {
        name: this.context.intl.formatMessage({id: 'webmaker'}),
        description: this.context.intl.formatMessage({id: 'tools_page_webmaker_desc'}),
        link: "https://webmaker.org",
        src1x: "/img/pages/tools/svg/webmaker.svg",
        activityTitle: this.context.intl.formatMessage({id: 'create_a_webmaker_project'}),
        activityLink: "http://mozilla.github.io/webmaker-curriculum/MobileWeb/create-webmaker-project.html"
      }
    ];
  },
  render: function() {
    return (
      <section>
        <div className="row">
          {this.toolColumns().map(function(tool) {
            return <ToolsColumn {...tool} key={tool.name}/>;
          })}
        </div>
      </section>
    )
  }
});

module.exports = ToolsSection;
