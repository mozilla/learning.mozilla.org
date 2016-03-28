var React = require('react');
var OutboundLink = require('react-ga').OutboundLink;
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Illustration = require('../../components/illustration.jsx');

var webmaps = require('./webmaplisting.jsx');

var CircleTree = require('react-circletree/es5');
var weblitdataroot = require('./weblitdata');
var weblitdata = weblitdataroot["WEB LITERACY"];
var weblitcontent = require('./weblitcontent');
var activitydata = require('./activitydata');
var categories = require('./categories');
var topicContent = weblitcontent.topics;
var webLitSkillsContent = weblitcontent.webLitSkills;
var makeLinksFromWebLitSkills = require("./MakeLinksFromWebLitSkills.jsx");
var WhitePaperLink = require("./WhitePaperLink.jsx");
var Util = require("../../lib/util");
var convertToRoute = Util.convertToRoute;
var parseRoute = Util.parseRoute;

function makeLinksFrom21CSkills(skills21C) {
  return skills21C.map(function(skill21C, index) {
    return (
      <span key={skill21C} className="comma-separated-links">
        <a href={"/web-literacy/skills/#" + categories[skill21C].toLowerCase()}>
          {categories[skill21C]}
        </a>
      </span>
    );
  });
} 

var Activity = React.createClass({
  render: function() {
    return (
      <Illustration
        width={200} height={200}
        src1x={this.props.src1x}
        src2x={this.props.src2x}
        link={this.props.href}
        externalLink={true}
        alt={this.props.name + "-activity-icon"}>
        <h2><a href={this.props.href}>{this.props.name}</a></h2>
        <div className="meta-container">
          <span className="meta-item"><i className="fa fa-users"></i>{this.props.difficulty}</span>
          <span className="meta-item"><i className="fa fa-clock-o"></i>{this.props.duration}</span>
        </div>
        <p>{this.props.content}</p>
        <div><strong>Web Literacy Skills:</strong> {makeLinksFromWebLitSkills(this.props.webLitSkills)}</div>
        <div><strong>21C Skills:</strong> {makeLinksFrom21CSkills(this.props.skills)}</div>
      </Illustration>
    );
  }
});

var WebLitPage = React.createClass({
  contextTypes: { history: React.PropTypes.object },
  statics: {
    pageTitle: "Web Literacy",
    pageClassName: "web-literacy"
  },
  updateMapNavState: function() {
    var topic = parseRoute(this.props.params.verb);
    var webLitSkill = parseRoute(this.props.params.webLitSkill);
    if (this.state.topic !== topic || this.state.webLitSkill !== webLitSkill) {
      this.setState({
        topic: topic,
        webLitSkill: webLitSkill
      });
    }
  },
  componentDidUpdate: function() {
    this.updateMapNavState();
  },
  componentDidMount: function() {
    this.updateMapNavState();
  },
  getInitialState: function() {
    var filter = {};
    Object.keys(categories).map(function(cat) {
      filter[categories[cat]] = false;
    });
    return {
      topic: "",
      webLitSkill: "",
      filter: filter
    };
  },
  hasWebLitSkillIn: function(webLitSkills) {
    var webLitSkill = this.state.webLitSkill;
    if (webLitSkill && webLitSkills.indexOf(webLitSkill) !== -1) {
      return true;
    }
  },
  hasMatchingWebLitSkillIn: function(webLitSkills) {
    var selectedTopic = this.state.topic;
    if (!selectedTopic || this.state.webLitSkill) {
      return false;
    }
    var topicWebLitSkills = Object.keys(weblitdata[selectedTopic]);
    return webLitSkills.some(function(webLitSkill) {
      return topicWebLitSkills.indexOf(webLitSkill) !== -1;
    });
  },
  hasMatching21CSkillIn: function(skills21C) {
    var state = this.state;
    var hasCategory = this.hasCategory;
    return skills21C.some(function(skill21C) {
      return !state.filter[categories[skill21C]] && hasCategory(skill21C, state.topic, state.webLitSkill);
    });
  },
  hasCategory: function(cat, selectedVerb, selectedWebLitSkill) {
    var cat = categories[cat];

    if (!selectedVerb) {
      return true;
    }

    if (!selectedWebLitSkill) {
      return Object.keys(weblitdata[selectedVerb]).some(function(item) {
        return weblitdata[selectedVerb][item].indexOf(cat) !== -1;
      });
    }

    return weblitdata[selectedVerb][selectedWebLitSkill].indexOf(cat) !== -1;
  },
  renderActivities: function() {
    var activities = [];
    activitydata.forEach(function(activity, index) {
      if ((this.hasWebLitSkillIn(activity.webLitSkills) || this.hasMatchingWebLitSkillIn(activity.webLitSkills)) && this.hasMatching21CSkillIn(activity.skills)) {
        activity.src1x = activity.imgSrc1x;
        activity.src2x = activity.imgSrc2x;
        activities.push(
          <div className="activity-item" key={index}>
            <Activity
              selectedTopic={this.state.topic}
              selectedWebLitSKill={this.state.webLitSkill}
              {...activity}
            />
          </div>
        );
      }
    }.bind(this));

    if (!activities.length) {
      return null;
    }
    return (
      <div>
        <h2>Related {this.state.webLitSkill || this.state.topic} Activities</h2>
        {activities}
      </div>
    );
  },
  renderCheckboxes: function() {
    return Object.keys(categories).map(function(cat) {
      var className = cat;
      var checked = false;
      if (this.hasCategory(cat, this.state.topic, this.state.webLitSkill)) {
        className += " active-skill";
        checked = !this.state.filter[categories[cat]];
      }
      return (
        <li className={className} key={cat}>
          <span className="custom-checkbox-container">
            <input onChange={function() {
              this.skillCheckboxUpdated(categories[cat], !checked);
            }.bind(this)} checked={checked} className="checkbox-input" type="checkbox" id={cat + "-checkbox"}/>
            <label className="checkbox-label" htmlFor={cat + "-checkbox"}>
              <span className="custom-checkbox">
                <i className="fa fa-check"></i>
              </span>
              { categories[cat] }
            </label>
          </span>
        </li>
      );
    }.bind(this));
  },
  renderTopics: function() {
    if (this.state.topic) {
      return null;
    }
    return Object.keys(weblitdata).map(function(topic) {
      return (
        <div key={topic}>
          <Illustration
            width={150} height={150}
            src1x={topicContent[topic].imgSrc1x}
            src2x={topicContent[topic].imgSrc2x}
            alt={"weblit-map-icon-" + topic}>
            <h2>{topic}</h2>
            <p>{topicContent[topic].content}</p>
            <span><strong>Web Literacy Skills:</strong> {makeLinksFromWebLitSkills(Object.keys(weblitdata[topic]))}</span>
          </Illustration>
        </div>
      );
    });
  },
  renderTopic: function() {
    if (!this.state.topic || this.state.webLitSkill) {
      return null;
    }
    return (
      <div className="topic-container">
        <h3>{this.state.topic}</h3>
        <p><img src={topicContent[this.state.topic].imgSrc1x} width={75} height={75}/>{topicContent[this.state.topic].content}</p>
      </div>
    );
  },
  renderWebLitSkill: function() {
    if (!this.state.topic || !this.state.webLitSkill) {
      return null;
    }
    return (
      <div className="web-lit-skill">
        <h3><span className="lighten">{this.state.topic} &rsaquo;</span> {this.state.webLitSkill}</h3>
        <p>{webLitSkillsContent[this.state.webLitSkill].quote}</p>
      </div>
    );
  },
  renderCompetencies: function() {
    if (!this.state.topic || !this.state.webLitSkill) {
      return null;
    }
    return (
      <div className="web-lit-competency">
        <h3>{this.state.webLitSkill} Competencies</h3>
        {
          webLitSkillsContent[this.state.webLitSkill].content.map(function(value, index) {
            return (
              <p className="web-lit-skill-content" key={index}>
                {value}
              </p>
            );
          })
        }
      </div>
    );
  },
  onMapToggle: function(labels) {
    var url = "/web-literacy/";
    var verb =  labels[1];
    var webLitSkill = labels[2];
    if (verb) {
      url += convertToRoute(verb) + "/";
      if (webLitSkill) {
        url += convertToRoute(webLitSkill) + "/";
      }
    }
    this.context.history.push({
      pathname: url
    });
  },
  skillCheckboxUpdated: function(checkbox, checked) {
    var filter = this.state.filter;
    filter[checkbox] = !checked;
    this.setState({ filter: filter });
  },
  render: function() {
    var whitepaperLink = "http://mozilla.github.io/content/web-lit-whitepaper/";

    var filter = this.state.filter;
    return (
      <div>
        <div className="inner-container">
          <section>
            <h1>Web Literacy</h1>
            <p>
              A framework for entry-level web literacy &amp; 21st Century skills. Explore the map
              by selecting what you want to learn more about, to see definitions and activities.
            </p>
          </section>
          <section className="weblit-nav">
            <div className="c21-skills">
              <Link to="/web-literacy/skills/"><h3>21st Century Skills</h3></Link>
              <ul>
                {this.renderCheckboxes()}
              </ul>
            </div>
            <CircleTree data={weblitdataroot} filter={filter} onToggle={this.onMapToggle}/>
            <div className="c21-skills">
              {this.renderTopic()}
              {this.renderWebLitSkill()}
            </div>
          </section>
          <section>
            {this.renderTopics()}
            {this.renderCompetencies()}
            {this.renderActivities()}
          </section>
          <WhitePaperLink/>
        </div>
      </div>
    );
  }
});

module.exports = WebLitPage;
